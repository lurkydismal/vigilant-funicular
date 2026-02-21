import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, signJwt, verifyPassword } from "./auth";

export async function registerUser(params: {
    username: string;
    password: string;
    avatar_url?: string | null;
}) {
    const username = params.username.trim();
    const password = params.password;

    if (!username || username.length > 32) throw new Error("invalid username");
    if (!password || password.length < 8) throw new Error("password too short");

    // check existing
    const existing = await db.select().from(users).where(eq(users.username, username));
    if (existing.length) throw new Error("username_taken");

    const password_hash = await hashPassword(password);

    const [created] = await db
        .insert(users)
        .values({
            username,
            password_hash,
            avatar_url: params.avatar_url ?? null,
        })
        .returning();

    return created; // contains id, username, avatar_url, created_at, ...
}

export async function loginUser(params: { username: string; password: string }) {
    const username = params.username.trim();
    const [user] = await db.select().from(users).where(eq(users.username, username));

    if (!user) throw new Error("invalid_credentials");

    const ok = await verifyPassword(user.password_hash, params.password);
    if (!ok) throw new Error("invalid_credentials");

    // payload minimal
    const token = signJwt({ sub: user.id, username: user.username });
    return { user, token };
}

/** Get user object from verified JWT payload (or null) */
export async function getUserFromPayload(payload: { sub: number } | null) {
    if (!payload) return null;
    const [u] = await db.select().from(users).where(eq(users.id, payload.sub));
    return u ?? null;
}
