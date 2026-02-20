import { tags } from "@/data/posts";
import MainFallback from "@/components/MainFallback";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import db from "@/db";
import { postWithCategory } from "@/utils/validate/schemas";

export default async function Posts() {
    const _posts = await db.query.posts.findMany({
        orderBy: {
            created_at: "desc",
        },

        with: {
            category: true,
        },
    });

    const parsed = postWithCategory.array().parse(_posts);

    return (
        <MainFallback itemsLength={parsed.length}>
            <MainContent posts={parsed} tags={tags} />

            <Latest posts={parsed} />
        </MainFallback>
    );
}
