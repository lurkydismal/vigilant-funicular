"use server";

import { desc } from "drizzle-orm";
import { cacheTag, revalidateTag } from "next/cache";
import { forbidden, unauthorized } from "next/navigation";
import z from "zod";

import db from "@/db";
import { posts } from "@/db/schema";
import log from "@/utils/stdlog";
import { postFullSchema, postInsertSchema, postNewSchema } from "@/utils/validate/schemas";

import { getSessionData } from "./auth";
import { getCategoryId, requestCategoryId } from "./category";
import { getUserId, requestUserId } from "./user";

export async function requestAllPosts() {
    "use cache";
    cacheTag("posts", "post");

    // return db.select().from(posts).orderBy(desc(posts.created_at)).execute();
    return db.query.posts.findMany({
        with: {
            author: true,
            coAuthor: true,
            category: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
}

export async function getAllPosts(request: ReturnType<typeof requestAllPosts>) {
    return postFullSchema.array().parse(await request);
}

type PostsFindFirstConfig = Parameters<typeof db.query.posts.findFirst>[0];

export async function requestPostFull(where?: Omit<PostsFindFirstConfig, "with" | "orderBy">) {
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

type FormValues = z.infer<typeof postNewSchema>;

export async function createPost(fv: FormValues) {
    // parse + validate input; throws on invalid input
    const parsed = postNewSchema.parse(fv);
    log.debug(`Post create: ${JSON.stringify(parsed)}`);

    const session = await getSessionData();
    if (!session) return unauthorized();

    log.trace(`Post create: ${JSON.stringify(parsed)} as ${session}`);

    const authorId = await getUserId(requestUserId(session.username_normalized));
    if (!authorId) return unauthorized();

    const coAuthorId = parsed["co-author"]
        ? await getUserId(requestUserId(parsed["co-author"]))
        : undefined;

    const categoryId = await getCategoryId(requestCategoryId(session.username_normalized));
    if (!authorId) return forbidden();

    await db
        .insert(posts)
        .values({
            author_id: authorId,
            co_author_id: coAuthorId,
            category_id: categoryId,
            title: parsed.title,
            description: parsed.description,
            content: parsed.content,
            content_warning: parsed["content-warning"],
            visibility: parsed.visibility,
            // scheduled_at: undefined,
            reading_time: parsed["reading-time"],
        })
        .execute();

    revalidateTag("posts", "max");
}
