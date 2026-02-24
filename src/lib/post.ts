import db from "@/db";
import { cacheTag } from "next/cache";
import { posts } from "@/db/schema";
import { desc } from 'drizzle-orm';
import { unauthorized } from "next/navigation";
import { getSessionData } from "./auth";

export async function requestAllPosts() {
    "use cache";
    cacheTag("posts", "post");

    const session = await getSessionData();
    if (!session) return unauthorized();

    return (
        db
            .select()
            .from(posts)
            .orderBy(desc(posts.created_at))
            .execute()
    );
}
