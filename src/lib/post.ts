"use server";

import { forbidden, unauthorized } from "next/navigation";
import z from "zod";

import db from "@/db";
import { posts } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import log from "@/utils/stdlog";
import { postFullSchema, postInsertSchema, postNewSchema } from "@/utils/validate/schemas";

import { cacheDbRequest, updateDbCacheTags } from "./cache";
import { createCategories, getCategoryId, requestCategoryId } from "./category";
import { getSession } from "./dal/auth";
import { getUserId, requestUserId } from "./user";

export async function requestAllPosts() {
    "use cache";
    cacheDbRequest(["posts"]);

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
    cacheDbRequest(["posts"]);

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

    const session = await getSession();
    if (!session) return unauthorized();

    log.trace(`Post create: ${JSON.stringify(parsed)} as ${session}`);

    const authorId = session.user.id;

    const coAuthorId = parsed["co-author"]
        ? await getUserId(requestUserId(parsed["co-author"]))
        : undefined;

    let categoryId = await getCategoryId(requestCategoryId(parsed.category));
    if (!categoryId) {
        const _result = await createCategories([parsed.category]);
        const result = normalizeArrayOrValue(_result);

        if (!result) return forbidden();

        categoryId = result.id;
    }

    const post = {
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
    };

    const parsedPost = postInsertSchema.parse(post);

    await db.insert(posts).values(parsedPost).execute();

    updateDbCacheTags(["posts"]);
}
