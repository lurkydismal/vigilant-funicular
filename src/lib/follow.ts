"use server";

import log from "@/utils/stdlog";
import { getSessionData } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import { userSelectPublicSchema } from "@/utils/validate/schemas";
import db from "@/db";
import { follows, users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { updateTag } from "next/cache";

export async function follow(user: { username: string }) {
    // parse + validate input; throws on invalid input
    const parsed = userSelectPublicSchema
        .pick({
            username: true,
        })
        .parse(user);

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.debug(`Follow: ${parsed.username} as ${session}`);

    // normalize username (trim + lowercase) to avoid duplicates/casing issues
    const normalizedUsername = parsed.username.trim().toLowerCase();

    try {
        const _followerId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username_normalized, session.username_normalized))
            .limit(1)
            .execute();

        const _followingId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username_normalized, normalizedUsername))
            .limit(1)
            .execute();

        const followerId = normalizeArrayOrValue(await _followerId);
        if (!followerId || !followerId.id) return unauthorized();

        const followingId = normalizeArrayOrValue(await _followingId);
        if (!followingId || !followingId.id) return unauthorized();

        await db
            .insert(follows)
            .values({
                follower_id: followerId.id,
                following_id: followingId.id,
            })
            .execute();

        updateTag("follows");
    } catch (err) {
        // Audit log: capture username and the error message, but do NOT log sensitive data.
        log.error("follow failed", {
            username: session.username,
            error: err instanceof Error ? err.message : String(err),
        });
        // Re-throw to let caller handle the error (keep message generic at higher level)
        throw err;
    }
}

export async function unfollow(user: { username: string }) {
    // parse + validate input; throws on invalid input
    const parsed = userSelectPublicSchema
        .pick({
            username: true,
        })
        .parse(user);

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.debug(`Follow: ${parsed.username} as ${session}`);

    // normalize username (trim + lowercase) to avoid duplicates/casing issues
    const normalizedUsername = parsed.username.trim().toLowerCase();

    try {
        const _followerId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username_normalized, session.username_normalized))
            .limit(1)
            .execute();

        const _followingId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username_normalized, normalizedUsername))
            .limit(1)
            .execute();

        const followerId = normalizeArrayOrValue(await _followerId);
        if (!followerId || !followerId.id) return unauthorized();

        const followingId = normalizeArrayOrValue(await _followingId);
        if (!followingId || !followingId.id) return unauthorized();

        await db
            .delete(follows)
            .where(
                and(
                    eq(follows.follower_id, followerId.id),
                    eq(follows.following_id, followingId.id),
                ),
            )
            .execute();

        updateTag("follows");
    } catch (err) {
        // Audit log: capture username and the error message, but do NOT log sensitive data.
        log.error("follow failed", {
            username: session.username,
            error: err instanceof Error ? err.message : String(err),
        });
        // Re-throw to let caller handle the error (keep message generic at higher level)
        throw err;
    }
}
