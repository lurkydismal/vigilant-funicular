import db from "@/db";
import { categories, posts, users } from "@/db/schema";
import {
    categorySelectPublicSchema,
    postFullSchema,
    userSelectPublicSchema,
} from "@/utils/validate/schemas";
import { desc, eq } from "drizzle-orm";
import MainContent from "@/components/profile/MainContent";
import z from "zod";
import { getSessionData } from "@/lib/auth";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { unauthorized } from "next/navigation";

export default async function Page() {
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
            .parse(session!.username);

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

        const __user = normalizeArrayOrValue(await _user);
        const parsedUser = userSelectPublicSchema.parse(__user);
        const parsedPosts = postFullSchema.array().parse(await _posts);
        const parsedCategories = categorySelectPublicSchema
            .array()
            .parse(await _categories);

        return { parsedUser, parsedPosts, parsedCategories };
    };

    const { parsedUser, parsedPosts, parsedCategories } =
        await getInfoFromSession(session);

    return (
        <MainContent
            user={parsedUser}
            posts={parsedPosts}
            tags={parsedCategories}
            isMe
        />
    );
}
