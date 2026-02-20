import { tags } from "@/data/posts";
import { desc } from "drizzle-orm";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import db from "@/db";
import { posts } from "@/db/schema";
import { postSelectSchema } from "@/utils/validate/schemas";

export default async function Posts() {
    const postsData = await db
        .select()
        .from(posts)
        .orderBy(desc(posts.created_at))
        .execute();

    const parsed = postSelectSchema.parse(postsData);

    return (
        <>
            <MainContent posts={parsed} tags={tags} />

            <Latest posts={parsed} />
        </>
    );
}
