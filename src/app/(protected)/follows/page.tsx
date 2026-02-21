import MainContent from "@/components/follows/MainContent";
import db from "@/db";
import { categories, follows, posts, users } from "@/db/schema";
import { CategoriesRow, CategoriesRowPublic } from "@/db/types";
import { eq, desc, sql } from 'drizzle-orm';

export default async function Follows() {
    const userId = db.select({ users.id }).from(users).where(eq(users.username, "ASD")).limit(1).execute();

    const latestPost = db
        .select()
        .from(posts)
        .where(eq(posts.author_id, users.id))
        .orderBy(desc(posts.created_at))
        .limit(1)
        .as("latest_post");

    const postCategories = db
        .select({
            post_id: posts.id,
            categories: sql<CategoriesRow[]>`
            coalesce(json_agg(${categories}), '[]'::json)
        `.as("categories"),
        })
        .from(posts)
        .leftJoin(categories, eq(categories.id, posts.category_id))
        .groupBy(posts.id)
        .as("post_categories");

    const feed = await db
        .select({
            user: users,
            post: latestPost,
            categories: postCategories.categories,
        })
        .from(follows)
        .innerJoin(users, eq(users.id, follows.following_id))
        .leftJoinLateral(latestPost, sql`true`)
        .leftJoin(
            postCategories,
            eq(postCategories.post_id, latestPost.id)
        )
        .where(eq(follows.follower_id, userId));

    const tagsMap = new Map<number, CategoriesRow>();

    for (const row of feed) {
        if (!row.categories) continue;

        for (const c of row.categories as CategoriesRow[]) {
            tagsMap.set(c.id, c);
        }
    }

    const tags = Array.from(tagsMap.values());

    return <MainContent follows={feed} tags={tags} />;
}
