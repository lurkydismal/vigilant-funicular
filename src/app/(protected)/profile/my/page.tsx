import { unauthorized } from "next/navigation";
import z from "zod";

import MainContent from "@/components/profile/MainContent";
import { getSessionData } from "@/lib/auth";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import { getAllPosts, requestAllPosts } from "@/lib/post";
import { getUser, requestUser } from "@/lib/user";
import { awaitObject } from "@/utils/stdfunc";

export default async function Page() {
    const session = await getSessionData();
    if (!session) return unauthorized();

    const getInfoFromSession = async (
        session: NonNullable<Awaited<ReturnType<typeof getSessionData>>>,
    ) => {
        "use cache";

        const parsedUsername = z.string().trim().min(1).parse(session.username_normalized);

        const _user = requestUser(parsedUsername);
        const _posts = requestAllPosts();
        const _categories = requestAllCategories();

        const user = getUser(_user);
        const posts = getAllPosts(_posts);
        const categories = getAllCategories(_categories);

        return await awaitObject({ user, posts, categories });
    };

    const { user, posts, categories } = await getInfoFromSession(session);

    return <MainContent user={user} posts={posts} tags={categories} isMe />;
}
