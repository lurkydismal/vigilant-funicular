import { unauthorized } from "next/navigation";

import MainContent from "@/components/profile/MainContent";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import { getSession } from "@/lib/dal/auth";
import { getAllPosts, requestAllPosts } from "@/lib/post";
import { awaitObject } from "@/utils/stdfunc";

export default async function Page() {
    const session = await getSession();
    if (!session) return unauthorized();

    const getInfoFromSession = async (
        session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
    ) => {
        "use cache";

        const user = session.user;

        const _posts = requestAllPosts();
        const _categories = requestAllCategories();

        const posts = getAllPosts(_posts);
        const categories = getAllCategories(_categories);

        return await awaitObject({ user, posts, categories });
    };

    const { user, posts, categories } = await getInfoFromSession(session);

    return <MainContent user={user} posts={posts} tags={categories} isMe />;
}
