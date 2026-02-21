import MainContent from "@/components/follows/MainContent";
import db from "@/db";
import { categories, follows, posts, users } from "@/db/schema";
import { eq, desc, sql } from 'drizzle-orm';

export default async function Follows() {
    const userId = db.select({ users.id }).from(users).where(eq(users.username, "ASD")).limit(1).execute();

    const latestPost = db
        .select()
        .from(posts)
        .where(eq(posts.author_id, users.id))
        .orderBy(desc(posts.created_at))
        .limit(1).as("latest_post");

    const postCategories = db
        .select({
            post_id: posts.id,
            categories: sql`coalesce(json_agg(${categories}.*), '[]')`.as("categories"),
        })
        .from(posts)
        .leftJoin(categories, eq(categories.id, posts.category_id))
        .groupBy(posts.id)
        .as("post_categories");

    const feed = db
        .select({
            user: users,
            post: latestPost,
            categories: postCategories.categories,
        })
        .from(follows)
        .innerJoin(users, eq(users.id, follows.following_id))
        // THIS is the trick
        .leftJoinLateral(
            latestPost,
            sql`true`
        )
        .leftJoin(
            postCategories,
            eq(postCategories.post_id, latestPost.id)
        )
        .where(eq(follows.follower_id, userId));

    return <MainContent follows={ } tags={ } />;
}
