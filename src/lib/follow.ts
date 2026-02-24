"use server";

import log from "@/utils/stdlog";
import { getSessionData } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import { userSelectPublicSchema } from "@/utils/validate/schemas";
import db from "@/db";
import { follows } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { cacheTag, revalidateTag } from "next/cache";
import { getUserId, requestUserId } from "./user";

export async function follow(username: string) {
    // parse + validate input; throws on invalid input
    const parsed = userSelectPublicSchema
        .pick({
            username: true,
        })
        .parse({ username });

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.trace(`Follow: ${parsed.username} as ${session}`);

    // normalize username (trim + lowercase) to avoid duplicates/casing issues
    const normalizedUsername = parsed.username.trim().toLowerCase();

    try {
        const followerId = await getUserId(
            requestUserId(session.username_normalized),
        );
        const followingId = await getUserId(requestUserId(normalizedUsername));

        if (!followerId || !followingId) return unauthorized();

        await db
            .insert(follows)
            .values({
                follower_id: followerId,
                following_id: followingId,
            })
            .execute();

        revalidateTag("follows", "max");
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

export async function unfollow(username: string) {
    // parse + validate input; throws on invalid input
    const parsed = userSelectPublicSchema
        .pick({
            username: true,
        })
        .parse({ username });

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.trace(`Follow: ${parsed.username} as ${session}`);

    // normalize username (trim + lowercase) to avoid duplicates/casing issues
    const normalizedUsername = parsed.username.trim().toLowerCase();

    try {
        const followerId = await getUserId(
            requestUserId(session.username_normalized),
        );
        const followingId = await getUserId(requestUserId(normalizedUsername));

        if (!followerId || !followingId) return unauthorized();

        await db
            .delete(follows)
            .where(
                and(
                    eq(follows.follower_id, followerId),
                    eq(follows.following_id, followingId),
                ),
            )
            .execute();

        revalidateTag("follows", "max");
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

export async function requestCheckUserFollow(
    followerId: number,
    followingId: number,
): Promise<boolean> {
    "use cache";
    cacheTag("follows", "follow");

    const followRecord = await db
        .select()
        .from(follows)
        .where(
            and(
                eq(follows.follower_id, followerId),
                eq(follows.following_id, followingId),
            ),
        )
        .limit(1);

    return followRecord.length > 0;
}
