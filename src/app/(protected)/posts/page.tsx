import MainFallback from "@/components/MainFallback";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import db from "@/db";
import { categories } from "@/db/schema";
import { categorySelectSchema, postFullSchema } from "@/utils/validate/schemas";
import { desc } from "drizzle-orm";

export default async function Posts() {
    const _posts = db.query.posts.findMany({
        orderBy: {
            created_at: "desc",
        },

        with: {
            author: true,
            coAuthor: true,
            category: true,
        },
    });

    const _categories = db.select().from(categories).orderBy(desc(categories.name)).execute();

    const parsedPosts = postFullSchema.array().parse(await _posts);
    const parsedCategories = categorySelectSchema.array().parse(await _categories);

    return (
        <MainFallback itemsLength={parsedPosts.length}>
            <MainContent posts={parsedPosts} tags={parsedCategories} />

            <Latest posts={parsedPosts} />
        </MainFallback>
    );
}
