import MainContent from "@/components/profile/MainContent";
import db from "@/db";
import { categories, follows, posts, users } from "@/db/schema";
import { getSessionData } from "@/lib/auth";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import {
    categorySelectPublicSchema,
    postFullSchema,
    userSelectPublicSchema,
} from "@/utils/validate/schemas";
import { desc, eq, and } from "drizzle-orm";
import { redirect, unauthorized } from "next/navigation";
import z from "zod";

async function doesUserFollow(
    followerId: number,
    followingId: number,
): Promise<boolean> {
    const followRecord = await db
        .select()
        .from(follows)
        .where(
            and(
                eq(follows.follower_id, followerId),
                eq(follows.following_id, followingId),
            ),
        )
        .limit(1);

    return followRecord.length > 0;
}

export default async function Page({
    params,
}: {
    /**
     * Route parameters provided by Next.js App Router.
     *
     * `slug` uniquely identifies which tour configuration
     * should be loaded and rendered.
     */
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const session = await getSessionData();
    if (!session) return unauthorized();

    const getInfoFromSession = async (
        session: Awaited<ReturnType<typeof getSessionData>>,
    ) => {
        "use cache";

        const parsedUsername = z
            .string()
            .trim()
            .min(1)
            .lowercase()
            .parse(decodeURIComponent(slug));

        if (session!.username_normalized === parsedUsername)
            redirect("/profile/my");

        const _userId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username, session!.username))
            .limit(1)
            .execute();

        const _profileId = db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username, parsedUsername))
            .limit(1)
            .execute();

        const userId = normalizeArrayOrValue(await _userId);
        if (!userId || !userId.id) return unauthorized();

        const profileId = normalizeArrayOrValue(await _profileId);
        if (!profileId || !profileId.id) return unauthorized();

        if (userId.id === profileId.id) redirect("/profile/my");

        const _user = db
            .select()
            .from(users)
            .where(eq(users.username, parsedUsername))
            .limit(1)
            .execute();
        const _posts = db
            .select()
            .from(posts)
            .orderBy(desc(posts.created_at))
            .execute();
        const _categories = db
            .select()
            .from(categories)
            .orderBy(desc(categories.name))
            .execute();

        const _doesFollow = doesUserFollow(userId.id, profileId.id);
        const parsedDoesFollow = z.boolean().parse(await _doesFollow);

        const parsedUser = userSelectPublicSchema.parse(
            normalizeArrayOrValue(await _user),
        );
        const parsedPosts = postFullSchema.array().parse(await _posts);
        const parsedCategories = categorySelectPublicSchema
            .array()
            .parse(await _categories);

        return { parsedUser, parsedPosts, parsedCategories, parsedDoesFollow };
    };

    const { parsedUser, parsedPosts, parsedCategories, parsedDoesFollow } =
        await getInfoFromSession(session);

    return (
        <MainContent
            user={parsedUser}
            posts={parsedPosts}
            tags={parsedCategories}
            doesFollow={parsedDoesFollow}
        />
    );
}
