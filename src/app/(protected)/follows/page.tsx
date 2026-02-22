import MainContent from "@/components/follows/MainContent";
import db from "@/db";
import { categories, follows, posts, users } from "@/db/schema";
import { CategoriesRow, CategoriesRowPublic } from "@/db/types";
import { getSessionData } from "@/lib/auth";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { and, eq, sql, desc } from "drizzle-orm";

/** Result types */
export type FollowedUserWithLatestPost = {
    user_id: number;
    username: string;
    avatar_url: string | null;
    post_id: number | null;
    post_title: string | null;
    post_description: string | null;
    post_content: string | null;
    post_created_at: Date | null;
    category_id: number | null;
    category_name: string | null;
};

/**
 * Returns one row per user that `userId` follows.
 * Each row contains the user + their latest post (if any) + that post's category.
 */
export async function getFollowedUsersWithLatestPost(
    userId: number
): Promise<FollowedUserWithLatestPost[]> {
    // Subquery: latest created_at per author_id
    const latestPerAuthor = db
        .select({
            author_id: posts.author_id,
            latest_created_at: sql`max(${posts.created_at})`,
        })
        .from(posts)
        .groupBy(posts.author_id)
        .as("latest_per_author");

    const rows = await db
        .select({
            user_id: users.id,
            username: users.username,
            avatar_url: users.avatar_url,
            post_id: posts.id,
            post_title: posts.title,
            post_description: posts.description,
            post_content: posts.content,
            post_created_at: posts.created_at,
            category_id: categories.id,
            category_name: categories.name,
        })
        .from(follows)
        .where(eq(follows.follower_id, userId))
        .innerJoin(users, eq(users.id, follows.following_id))
        // join to subquery that holds (author_id, latest_created_at)
        .leftJoin(latestPerAuthor, eq(latestPerAuthor.author_id, users.id))
        // join posts to pick the row that matches (author_id, created_at = latest_created_at)
        .leftJoin(
            posts,
            and(
                eq(posts.author_id, latestPerAuthor.author_id),
                eq(posts.created_at, latestPerAuthor.latest_created_at)
            )
        )
        .leftJoin(categories, eq(categories.id, posts.category_id))
        .orderBy(users.username)
        .execute();

    // Drizzle returns typed rows; map to the lightweight result type
    return rows.map((r) => ({
        user_id: r.user_id,
        username: r.username,
        avatar_url: r.avatar_url,
        post_id: r.post_id ?? null,
        post_title: r.post_title ?? null,
        post_description: r.post_description ?? null,
        post_content: r.post_content ?? null,
        post_created_at: r.post_created_at ?? null,
        category_id: r.category_id ?? null,
        category_name: r.category_name ?? null,
    }));
}

/**
 * Returns the distinct set (array) of category names used by those latest posts
 * (only includes followed users who have at least one post with non-null category).
 */
export async function getCategoriesOfFollowedUsersLatestPosts(
    userId: number
): Promise<string[]> {
    // same latest-per-author subquery
    const latestPerAuthor = db
        .select({
            author_id: posts.author_id,
            latest_created_at: sql`max(${posts.created_at})`,
        })
        .from(posts)
        .groupBy(posts.author_id)
        .as("latest_per_author");

    const rows = await db
        .select({ name: categories.name })
        .from(follows)
        .where(eq(follows.follower_id, userId))
        // match subquery by followed user id
        .innerJoin(latestPerAuthor, eq(latestPerAuthor.author_id, follows.following_id))
        .innerJoin(
            posts,
            and(
                eq(posts.author_id, latestPerAuthor.author_id),
                eq(posts.created_at, latestPerAuthor.latest_created_at)
            )
        )
        .innerJoin(categories, eq(categories.id, posts.category_id))
        // distinct names: groupBy or use .distinct() if available in your drizzle version
        .groupBy(categories.name)
        .execute();

    return rows.map((r) => r.name);
}

/**
 * Convenience function returning both results in one call.
 */
export async function getFollowedUsersAndCategories(
    userId: number
) {
    const [usersList, categoriesList] = await Promise.all([
        getFollowedUsersWithLatestPost(userId),
        getCategoriesOfFollowedUsersLatestPosts(userId),
    ]);
    return { users: usersList, categories: categoriesList };
}

export default async function Follows() {
    const user = await getSessionData();

    const _userId = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.username, user!.username))
        .limit(1)
        .execute();

    const userId = normalizeArrayOrValue(_userId);
    if (!userId || !userId.id) return false;

    const { users: _users, categories } = await getFollowedUsersAndCategories(userId.id);

    const tags: CategoriesRowPublic[] = categories.map((value) => ({
        name: value,
    }));

    return <MainContent follows={feed} tags={tags} />;
}
