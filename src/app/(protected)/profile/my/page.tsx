import { unauthorized } from "next/navigation";
import { Suspense } from "react";

import Loading from "@/app/loading";
import MainContent from "@/components/profile/MainContent";
import db from "@/db";
import { cacheDbRequest } from "@/lib/cache";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import { getSession } from "@/lib/dal/auth";
import {
    buildPostRelationalWhere,
    FilterSearchParams,
    parsePostFilters,
    PostFilters,
} from "@/lib/posts/filter";
import { awaitObject } from "@/utils/stdfunc";

async function Profile({ searchParams }: FilterSearchParams) {
    const session = await getSession();
    if (!session) return unauthorized();

    const filters = parsePostFilters(await searchParams);

    const getInfoFromSession = async (
        session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
        filters: PostFilters,
    ) => {
        "use cache";
        cacheDbRequest(["user", "categories", "posts"]);

        const _user = session.user;
        const user = { ...session.user, image: session.user.image ?? null };

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
        const _categories = requestAllCategories();

        const categories = getAllCategories(_categories);

        return await awaitObject({ user, posts, categories });
    };

    const { user, posts, categories } = await getInfoFromSession(session, filters);

    return <MainContent user={user} posts={posts} tags={categories} isMe />;
}

export default async function Page({ searchParams }: FilterSearchParams) {
    // TODO: improve
    return (
        <Suspense fallback={<Loading />}>
            <Profile searchParams={searchParams} />
        </Suspense>
    );
}
