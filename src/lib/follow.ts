import "server-only";
import { eq, and, inArray } from "drizzle-orm";
import { forbidden, unauthorized } from "next/navigation";

import db from "@/db";
import { follows, user } from "@/db/schema";
import { getSession } from "@/lib/dal/auth";
import log from "@/utils/stdlog";
import { userSelectPublicSchema } from "@/utils/validate/schemas";

import { cacheDbRequest, updateDbCacheTags } from "./cache";

async function manageFollow(name: string, action: "insert" | "remove") {
    // parse + validate input; throws on invalid input
    const parsedUser = userSelectPublicSchema
        .pick({
            name: true,
        })
        .parse({ name });

    const session = await getSession();
    if (!session) return unauthorized();

    log.trace(`Follow: ${parsedUser.name} as ${session}`);

    const userName = parsedUser.name;

    try {
        const _users = await db
            .select({
                id: user.id,
                name: user.name,
            })
            .from(user)
            .where(inArray(user.name, [session.user.name, userName]));

        const userMap = new Map(_users.map((u) => [u.name, u.id]));

        const followerId = userMap.get(session.user.name);
        const followingId = userMap.get(userName);

        if (!followerId) return unauthorized();
        if (!followingId) return forbidden();
        if (followerId === followingId) return forbidden();

        const actionHandlers = {
            insert: async () => {
                await db
                    .insert(follows)
                    .values({
                        follower_id: followerId,
                        following_id: followingId,
                    })
                    .onConflictDoNothing()
                    .execute();
            },
            remove: async () => {
                await db
                    .delete(follows)
                    .where(
                        and(
                            eq(follows.follower_id, followerId),
                            eq(follows.following_id, followingId),
                        ),
                    )
                    .execute();
            },
        };

        await actionHandlers[action]();

        updateDbCacheTags(["follows"]);
    } catch (err) {
        // Audit log: capture name and the error message, but do NOT log sensitive data.
        log.error(`follow ${action} failed`, {
            name: session.user.name,
            error: err instanceof Error ? err.message : String(err),
        });
        // Re-throw to let caller handle the error (keep message generic at higher level)
        throw err;
    }
}

export async function followAction(name: string) {
    manageFollow(name, "insert");
}

export async function unfollowAction(name: string) {
    manageFollow(name, "remove");
}

export async function requestCheckUserFollowAction(
    followerId: string,
    followingId: string,
): Promise<boolean> {
    "use cache";
    cacheDbRequest(["follows"]);

    const followRecord = await db
        .select()
        .from(follows)
        .where(and(eq(follows.follower_id, followerId), eq(follows.following_id, followingId)))
        .limit(1);

    return followRecord.length > 0;
}
