import MainContent from "@/components/profile/MainContent";
import db from "@/db";
import { categories, follows, posts, users } from "@/db/schema";
import { getSessionData } from "@/lib/auth";
import { requestAllCategories } from "@/lib/category";
import { requestCheckUserFollow } from "@/lib/follow";
import { requestAllPosts } from "@/lib/post";
import { getUserId, requestUser, requestUserId } from "@/lib/user";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { logVar } from "@/utils/stdlog";
import {
    categorySelectPublicSchema,
    postFullSchema,
    userSelectPublicSchema,
} from "@/utils/validate/schemas";
import { desc, eq, and } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect, unauthorized } from "next/navigation";
import z from "zod";

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

    const parsedUsername = z
        .string()
        .trim()
        .min(1)
        .lowercase()
        .parse(decodeURIComponent(slug));

    if (session!.username_normalized === parsedUsername)
        redirect("/profile/my");

    const getInfoFromSession = async (
        session: Awaited<ReturnType<typeof getSessionData>>,
        parsedUsername: string,
    ) => {
        "use cache";
        cacheTag("follows");

        const userId = await getUserId(requestUserId(session!.username_normalized));
        const profileId = await getUserId(requestUserId(parsedUsername));

        if (!userId || !profileId) return unauthorized();
        if (userId === profileId) redirect("/profile/my");

        const _user = requestUser(userId);
        const _posts = requestAllPosts();
        const _categories = requestAllCategories();

        const doesFollow = requestCheckUserFollow(userId, profileId);

        const parsedUser = userSelectPublicSchema.parse(
            normalizeArrayOrValue(await _user),
        );
        const parsedPosts = postFullSchema.array().parse(await _posts);
        const parsedCategories = categorySelectPublicSchema
            .array()
            .parse(await _categories);

        return { parsedUser, parsedPosts, parsedCategories, doesFollow: await doesFollow };
    };

    const { parsedUser, parsedPosts, parsedCategories, doesFollow } =
        await getInfoFromSession(session, parsedUsername);

    return (
        <MainContent
            user={parsedUser}
            posts={parsedPosts}
            tags={parsedCategories}
            doesFollow={doesFollow}
        />
    );
}
