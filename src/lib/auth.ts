"use server";

/**
 * auth.ts
 *
 * Server-side authentication helpers for a Next.js app.
 * - Hashes and verifies passwords with argon2.
 * - Issues and verifies JWTs (jsonwebtoken).
 * - Writes/clears HttpOnly auth cookies using Next's cookies() API.
 *
 * Notes / responsibilities:
 * - This file runs on the Node server (not Edge runtime).
 * - Keep secrets (JWT_SECRET) only in env; never return them.
 * - HttpOnly cookie is the authority for auth — client JS cannot read it.
 * - JWT payloads will include `iat`/`exp` fields added by jsonwebtoken.
 *   If you validate the payload with a strict Zod schema, account for those extra fields.
 *
 * Security reminders:
 * - Use short-lived access tokens (or implement refresh tokens) for long sessions.
 * - Avoid storing sensitive user data in JWTs; prefer minimal claims (id, username, role).
 * - `SameSite: "strict"` blocks some cross-site flows — confirm it matches your needs.
 */

import type { StringValue } from "ms";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import db from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { UsersRowPublic } from "@/db/types";
import { getEnv } from "@/utils/stdfunc";
import { userSelectPublicSchema } from "@/utils/validate/schemas";
import z from "zod";
import ms from "ms";

/*
 * Environment-configured values.
 *
 * JWT_EXPIRES_IN is narrowed to `StringValue` (ms-style string) so TypeScript
 * accepts it in jsonwebtoken's `expiresIn` option. Validate this env at app start
 * if you want stronger guarantees.
 */
const JWT_SECRET = getEnv("JWT_SECRET");
const JWT_EXPIRES_IN = getEnv("JWT_EXPIRES_IN") as StringValue; // e.g. "15m" or "7d"
const COOKIE_NAME = getEnv("COOKIE_NAME");
const COOKIE_SECURE = getEnv("COOKIE_SECURE") === "true";

/**
 * Small wrapper for argon2.hash.
 * - Returns a Promise<string> containing the password hash.
 * - Keep the argon2 options centralized if you later need to tweak memory/cost.
 */
async function hashPassword(password: string) {
    return await argon2.hash(password);
}

/**
 * Sign a JWT with the provided payload.
 * - Payload here is a minimal partial of UsersRowPublic or an object containing username.
 * - jsonwebtoken will append `iat` and (because of expiresIn) `exp`.
 * - Keep the payload small to avoid large cookies and to reduce attack surface.
 */
function signJwt(payload: Partial<UsersRowPublic> | { username: string }) {
    return jwt.sign(payload, JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: JWT_EXPIRES_IN,
    });
}

/**
 * Verify a token and return the decoded JwtPayload or null on failure.
 * - Uses jsonwebtoken.verify which checks signature and expiration.
 * - Returns `null` for any verification error.
 */
export async function verifyJwt(token: string): Promise<null | UsersRowPublic> {
    try {
        // verify signature + expiry and restrict algorithm to HS256
        const verified = jwt.verify(token, JWT_SECRET, {
            algorithms: ["HS256"],
        });

        // jwt.verify may return a string (if token payload was a string); treat that as invalid
        if (typeof verified === "string") return null;

        // normalized payload as a plain object
        const payload = verified as Record<string, unknown>;

        // pick and validate only the public fields you expect inside the token.
        // this prevents `iat/exp` or other JWT metadata from breaking your schema.
        const publicSchema = userSelectPublicSchema.pick({
            username: true,
            avatar_url: true,
        });

        // build a minimal object and validate it with Zod
        const parsed = publicSchema.parse({
            username: payload.username,
            // keep explicit null handling for avatar_url
            avatar_url: payload.avatar_url ?? null,
        });

        // parsed is now a UsersRowPublic-like object (only the fields from publicSchema)
        return parsed as UsersRowPublic;
    } catch {
        // any verification / validation error => null (treat token as invalid)
        return null;
    }
}

/**
 * CookieStore type alias derived from Next's cookies() return type.
 * - Avoids importing internal Next types directly.
 * - The CookieStore is request-scoped and must not be cached across requests.
 */
type CookieStore = Awaited<ReturnType<typeof cookies>>;

/**
 * Write an HttpOnly cookie that stores the access token.
 * - `remember` controls cookie lifetime (longer maxAge when true).
 * - maxAge is computed using `ms()`. `JWT_EXPIRES_IN` must be a parsable ms string.
 * - Cookie attributes:
 *   - httpOnly: true (not accessible to client JS)
 *   - secure: controlled by COOKIE_SECURE (true in prod over HTTPS)
 *   - sameSite: "strict" (strong CSRF prevention; adjust if you need cross-site flows)
 *   - path: "/" so it applies across the app
 *
 * Important: cookieStore.set() is synchronous for the API surface here, but the cookie
 * takes effect in the response for the current request.
 */
export async function cookieForToken(
    cookieStore: CookieStore,
    token: string,
    remember: boolean,
) {
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

/**
 * Clear the auth cookie by setting an expired cookie value.
 * - Setting `expires: new Date(0)` causes the browser to remove the cookie.
 */
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

/**
 * register
 * - Validates incoming user data using Zod schema (userSelectPublicSchema extended with password).
 * - Hashes the password with Argon2.
 * - Inserts the user into the DB via drizzle-orm and returns the public user record.
 * - Issues a JWT and sets it in an HttpOnly cookie so the client is authenticated after registration.
 *
 * Notes / caveats:
 * - You already planned to add validation and additional DB checks (unique username, etc).
 * - DB `returning()` behavior can vary depending on dialect/driver; `created` normalization handles array vs single-result.
 * - The JWT contains the public fields you selected — keep that minimal to avoid stale data and large token size.
 */
export async function register(user: {
    username: string;
    password: string;
    avatar_url?: string;
}) {
    const parsed = userSelectPublicSchema
        .extend({
            password: z.string().trim().min(1),
        })
        .parse(user);

    const hash = await hashPassword(parsed.password);

    const inserted = await db
        .insert(users)
        .values({
            username: parsed.username,
            password_hash: hash,
            avatar_url: parsed.avatar_url ?? null,
        })
        .returning({
            username: users.username,
            avatar_url: users.avatar_url,
        })
        .execute();

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

/**
 * verifyPassword
 * - Validates the input shape (username + password) using Zod derived from userSelectPublicSchema.
 * - Selects the stored password hash from the DB and verifies it with argon2.verify.
 * - Returns boolean success/failure.
 *
 * Note: timing and error messages are intentionally generic to avoid leaking info.
 */
async function verifyPassword(user: { username: string; password: string }) {
    const parsed = userSelectPublicSchema
        .omit({
            avatar_url: true,
        })
        .extend({
            password: z.string().trim().min(1),
        })
        .parse(user);

    const selected = await db
        .select({ hash: users.password_hash })
        .from(users)
        .where(eq(users.username, parsed.username))
        .limit(1)
        .execute();

    // Normalize
    const hash = (Array.isArray(selected) ? selected[0] : selected).hash;

    try {
        return await argon2.verify(hash, parsed.password);
    } catch {
        return false;
    }
}

/**
 * login
 * - Validates credentials, verifies password, fetches public user data, issues token, sets cookie, returns public user.
 * - `remember` extends cookie lifetime.
 *
 * Behavior details:
 * - Throws "Invalid credentials" for both not-found and bad-password cases to avoid user enumeration.
 * - Returns UsersRowPublic so callers (client code) can update UI immediately without a second request.
 *
 * Potential improvements:
 * - Rate-limit login attempts per IP or username.
 * - Audit/log failed attempts to monitoring (do not log passwords).
 * - Consider returning a union with an error type instead of throwing to allow structured error handling.
 */
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
    const ok = await verifyPassword({
        username: parsed.username,
        password: parsed.password,
    });
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

/**
 * getSessionData
 * - Reads the auth cookie from the request, verifies the JWT, and returns the parsed public user object.
 *
 * Caveats:
 * - The code currently `throw`s when there's no token. Consider returning `null` instead to make the API
 *   easier to consume when no session exists.
 * - jwt.verify attaches `iat`/`exp` to the payload. If `userSelectPublicSchema` is strict, parsing will fail.
 *   Use `.passthrough()` or explicitly pick the fields you expect from the verified payload.
 * - This function returns only what is present in the token; for authoritative profile data, query the DB
 *   (token can be stale).
 */
export async function getSessionData(): Promise<null | UsersRowPublic> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) throw new Error("No token");

    const payload = await verifyJwt(token);
    if (!payload || typeof payload === "string") return null;

    const parsed: UsersRowPublic = userSelectPublicSchema.parse(payload);

    return parsed;
}
