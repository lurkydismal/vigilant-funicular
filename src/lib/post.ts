"use server";

import db from "@/db";
import { cacheTag, revalidateTag } from "next/cache";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { postFullSchema, postInsertSchema } from "@/utils/validate/schemas";
import log from "@/utils/stdlog";
import { getSessionData } from "./auth";
import { unauthorized } from "next/navigation";
import { getUserId, requestUserId } from "./user";

export async function requestAllPosts() {
    "use cache";
    cacheTag("posts", "post");

    return db.select().from(posts).orderBy(desc(posts.created_at)).execute();
}

export async function getAllPosts(request: ReturnType<typeof requestAllPosts>) {
    return postFullSchema.array().parse(await request);
}

type PostsFindFirstConfig = Parameters<typeof db.query.posts.findFirst>[0];

export async function requestPostFull(
    where?: Omit<PostsFindFirstConfig, "with" | "orderBy">,
) {
    "use cache";
    cacheTag("posts", "post");

    return db.query.posts.findFirst({
        orderBy: {
            created_at: "desc",
        },
        where,
        with: {
            author: true,
            coAuthor: true,
            category: true,
        },
    });
}

export async function getPostFull(request: ReturnType<typeof requestPostFull>) {
    return postFullSchema.parse(await request);
}

export async function createPost(fd: FormData) {
    // parse + validate input; throws on invalid input
    const parsed = postInsertSchema.parse(fd);

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.trace(`Post create: ${Object.fromEntries(fd.entries())} as ${session}`);

    try {
        const authorId = await getUserId(
            requestUserId(session.username_normalized),
        );

        if (!authorId) return unauthorized();

        await db
            .insert(posts)
            .values({
                author_id: undefined,
                co_author_id: undefined,
                category_id: undefined,
                title: "TEST",
                description: undefined,
                content: "TEST",
                content_warning: undefined,
                visibility: undefined,
                scheduled_at: undefined,
                reading_time: 123,
            })
            .execute();

        revalidateTag("posts", "max");
    } catch (err) {
        // Audit log: capture username and the error message, but do NOT log sensitive data.
        log.error("post failed", {
            username: session.username,
            error: err instanceof Error ? err.message : String(err),
        });
        // Re-throw to let caller handle the error (keep message generic at higher level)
        throw err;
    }
}
