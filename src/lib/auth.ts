import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN ?? "15m";
const COOKIE_NAME = process.env.COOKIE_NAME ?? "session";
const COOKIE_SECURE = (process.env.COOKIE_SECURE ?? "true") === "true";

// minimal payload type
export type JwtPayload = { sub: number; username: string };

export async function hashPassword(password: string) {
    return argon2.hash(password);
}

export async function verifyPassword(hash: string, password: string) {
    try {
        return await argon2.verify(hash, password);
    } catch {
        return false;
    }
}

export function signJwt(payload: JwtPayload) {
    // FIX: TLS
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function verifyJwt(token: string): string | jwt.JwtPayload {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return ""
    }
}

/**
 * Create Set-Cookie header value for the access token (httpOnly).
 * Use this header in the NextResponse or API response.
 */
export function cookieForToken(token: string) {
    return serialize(COOKIE_NAME, token, {
        httpOnly: true,
        secure: COOKIE_SECURE,
        path: "/",
        sameSite: "lax",
        maxAge: Math.floor(parseExpireToSeconds(JWT_EXPIRES_IN)),
    });
}

/** Clear cookie header */
export function clearAuthCookie() {
    return serialize(COOKIE_NAME, "", {
        httpOnly: true,
        secure: COOKIE_SECURE,
        path: "/",
        sameSite: "lax",
        expires: new Date(0),
    });
}

/** Extract token from cookies in a NextRequest */
export function getTokenFromRequest(req: NextRequest): string | null {
    const cookie = req.cookies.get(COOKIE_NAME)?.value ?? null;
    return cookie;
}

/** Helper: parse strings like "15m", "7d" into seconds (simple) */
function parseExpireToSeconds(s: string) {
    const m = s.match(/^(\d+)([smhd])$/);
    if (!m) return 0;
    const v = Number(m[1]);
    switch (m[2]) {
        case "s": return v;
        case "m": return v * 60;
        case "h": return v * 3600;
        case "d": return v * 3600 * 24;
        default: return v;
    }
}
