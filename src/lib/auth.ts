"use server";

import type { StringValue } from "ms";
import argon2 from "argon2";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { UsersRowPublic } from "@/db/types";
import { getEnv } from "@/utils/stdfunc";
import { userSelectPublicSchema } from "@/utils/validate/schemas";
import z from "zod";
import ms from "ms";

const JWT_SECRET = getEnv("JWT_SECRET");
const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN') as StringValue; // e.g. "15m" or "7d"
const COOKIE_NAME = getEnv('COOKIE_NAME');
const COOKIE_SECURE = getEnv('COOKIE_SECURE') === "true";

async function hashPassword(password: string) {
    return await argon2.hash(password);
}

function signJwt(payload: Partial<UsersRowPublic> | { username: string }) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function verifyJwt(token: string): Promise<null | JwtPayload> {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

        if (typeof payload === "string") throw new Error("TODO: WRITE JWT PAYLOAD VERIFY");

        return payload;
    } catch {
        return null;
    }
}

/**
 * Accept a cookie store returned from `await cookies()`:
 * use a local, safe type so we don't import internal Next types.
 */
type CookieStore = Awaited<ReturnType<typeof cookies>>;

export async function cookieForToken(cookieStore: CookieStore, token: string, remember: boolean) {
    const maxAge = Math.floor(ms(remember ? "100d" : JWT_EXPIRES_IN));

    cookieStore.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: "strict",
        path: "/",
        maxAge,
    });
}

/** Clear cookie header */
export async function clearAuthCookie(cookieStore: CookieStore) {
    return cookieStore.set({
        name: COOKIE_NAME,
        value: "",
        httpOnly: true,
        secure: COOKIE_SECURE,
        sameSite: "strict",
        path: "/",
        expires: new Date(0),
    });
}

/** Register: hash password, insert into DB, issue JWT, set cookie */
export async function register(user: { username: string; password: string; avatar_url?: string; }) {
    const parsed = userSelectPublicSchema.extend({
        password: z.string().trim().min(1),
    }).parse(user);

    const hash = await hashPassword(parsed.password);

    const inserted = await db.insert(users).values({
        username: parsed.username,
        password_hash: hash,
        avatar_url: parsed.avatar_url ?? null,
    }).returning({
        username: users.username,
        avatar_url: users.avatar_url,
    }).execute();

    // Normalize
    const created = Array.isArray(inserted) ? inserted[0] : inserted;

    // Create minimal payload for token
    const payload = {
        username: created.username,
        avatar_url: parsed.avatar_url ?? null,
    };

    const token = signJwt(payload);

    const cookieStore = await cookies();
    cookieForToken(cookieStore, token, false);

    // Return safe public user object (for immediate response)
    const publicUser: UsersRowPublic = {
        username: created.username,
        avatar_url: created.avatar_url ?? null,
    };

    return publicUser;
}

async function verifyPassword(user: { username: string; password: string; }) {
    const parsed = userSelectPublicSchema.omit({
        avatar_url: true,
    }).extend({
        password: z.string().trim().min(1),
    }).parse(user);

    const selected = (
        await db
            .select({ hash: users.password_hash })
            .from(users)
            .where(eq(users.username, parsed.username))
            .limit(1)
            .execute()
    );

    // Normalize
    const hash = (Array.isArray(selected) ? selected[0] : selected).hash;

    try {
        return await argon2.verify(hash, parsed.password);
    } catch {
        return false;
    }
}

export async function login(credentials: {
    username: string;
    password: string;
    remember?: boolean;
}): Promise<UsersRowPublic> {
    // parse -> validate
    const parsed = userSelectPublicSchema
        .omit({ avatar_url: true }) // only need username for auth
        .extend({
            password: z.string().trim().min(1),
            remember: z.boolean().optional(),
        })
        .parse(credentials);

    // verify password
    const ok = await verifyPassword({ username: parsed.username, password: parsed.password });
    if (!ok) throw new Error("Invalid credentials");

    // fetch public user from DB
    const selected = await db
        .select({
            username: users.username,
            avatar_url: users.avatar_url,
        })
        .from(users)
        .where(eq(users.username, parsed.username))
        .limit(1)
        .execute();

    const found = Array.isArray(selected) ? selected[0] : selected;
    if (!found || !found.username) throw new Error("Invalid credentials");

    // prepare payload and token
    const payload = {
        username: found.username,
        avatar_url: found.avatar_url ?? null,
    };

    const token = signJwt(payload);

    // set cookie
    const cookieStore = await cookies();
    await cookieForToken(cookieStore, token, Boolean(parsed.remember));

    // return safe public user
    const publicUser: UsersRowPublic = {
        username: found.username,
        avatar_url: found.avatar_url ?? null,
    };

    return publicUser;
}

/** getSessionData: read cookie, verify token, return payload or null */
export async function getSessionData(): Promise<null | UsersRowPublic> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) throw new Error("No token");

    const payload = await verifyJwt(token);
    if (!payload || typeof payload === "string") return null;

    const parsed: UsersRowPublic = userSelectPublicSchema.parse(payload);

    return parsed;
}
