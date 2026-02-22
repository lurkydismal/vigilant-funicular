import MainFallback from "@/components/MainFallback";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import db from "@/db";
import { categories, posts, follows, users } from "@/db/schema";
import { getSessionData } from "@/lib/auth";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { categorySelectSchema, postFullSchema } from "@/utils/validate/schemas";
import { desc, eq } from "drizzle-orm";
import { unauthorized } from "next/navigation";

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

    const user = await getSessionData();
    const _userId = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, user!.username))
        .limit(1)
        .execute();
    const userId = normalizeArrayOrValue(_userId);
    if (!userId || !userId.id) return unauthorized();

    const _followingIds = await db
        .select({ id: follows.following_id })
        .from(follows)
        .where(eq(follows.follower_id, userId.id))
        .execute();

    const _featuredPosts = db.query.posts.findMany({
        where: {
            author_id: userId.id,
            co_author_id: userId.id,
        },

        orderBy: {
            created_at: "desc",
        },

        with: {
            author: true,
            coAuthor: true,
            category: true,
        },
    });

    const _categories = db
        .select()
        .from(categories)
        .orderBy(desc(categories.name))
        .execute();

    const parsedPosts = postFullSchema.array().parse(await _posts);
    const parsedFeaturedPosts = postFullSchema
        .array()
        .parse(await _featuredPosts);
    const parsedCategories = categorySelectSchema
        .array()
        .parse(await _categories);

    return (
        <MainFallback itemsLength={parsedPosts.length}>
            {parsedFeaturedPosts.length && (
                <MainContent
                    posts={parsedFeaturedPosts}
                    tags={parsedCategories}
                />
            )}

            <Latest posts={parsedPosts} />
        </MainFallback>
    );
}
