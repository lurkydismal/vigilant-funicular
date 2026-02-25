import db from "@/db";
import { cacheTag } from "next/cache";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { postFullSchema } from "@/utils/validate/schemas";

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
