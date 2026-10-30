import { forbidden, redirect, unauthorized } from "next/navigation";
import z from "zod";

import MainContent from "@/components/profile/MainContent";
import db from "@/db";
import { cacheDbRequest } from "@/lib/cache";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import { getSession } from "@/lib/dal/auth";
import { requestCheckUserFollowAction } from "@/lib/follow";
import {
    buildPostRelationalWhere,
    FilterSearchParams,
    parsePostFilters,
    PostFilters,
} from "@/lib/posts/filter";
import { getUser, getUserId, requestUser, requestUserId } from "@/lib/user";
import { awaitObject } from "@/utils/stdfunc";

export default async function Page({
    params,
    searchParams,
}: {
    /**
     * Route parameters provided by Next.js App Router.
     *
     * `slug` uniquely identifies which tour configuration
     * should be loaded and rendered.
     */
    params: Promise<{ slug: string }>;
} & FilterSearchParams) {
    const { slug } = await params;

    const session = await getSession();
    if (!session) return unauthorized();

    const filters = parsePostFilters(await searchParams);

    const parsedUsername = z.string().trim().min(1).lowercase().parse(decodeURIComponent(slug));

    if (session.user.name === parsedUsername) redirect("/profile/my");

    const getInfoFromSession = async (
        session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
        parsedUsername: string,
        filters: PostFilters,
    ) => {
        "use cache";
        cacheDbRequest(["user", "categories", "posts", "follows"]);

        const userId = session.user.id;
        const profileId = await getUserId(requestUserId(parsedUsername));

        if (!profileId) return forbidden();
        if (userId === profileId) redirect("/profile/my");

        const _user = requestUser(profileId);
        const _categories = requestAllCategories();
        const doesFollow = requestCheckUserFollowAction(userId, profileId);

        const user = getUser(_user);
        const posts = db.query.posts.findMany({
            where: buildPostRelationalWhere(filters),
            orderBy: {
                created_at: "desc",
            },
            with: {
                author: true,
                coAuthor: true,
                category: true,
            },
        });
        const categories = getAllCategories(_categories);

        return await awaitObject({ user, posts, categories, doesFollow });
    };

    const {
        user: parsedUser,
        posts: parsedPosts,
        categories: parsedCategories,
        doesFollow,
    } = await getInfoFromSession(session, parsedUsername, filters);

    return (
        <MainContent
            user={parsedUser}
            posts={parsedPosts}
            tags={parsedCategories}
            doesFollow={doesFollow}
        />
    );
}
