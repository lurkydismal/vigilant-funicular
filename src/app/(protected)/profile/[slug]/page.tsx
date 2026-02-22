import MainContent from "@/components/profile/MainContent";
import db from "@/db";
import { categories, posts, users } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import {
    categorySelectPublicSchema,
    postFullSchema,
    userSelectPublicSchema,
} from "@/utils/validate/schemas";
import { desc, eq } from "drizzle-orm";
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

    const parsedUsername = z.string().trim().min(1).parse(decodeURIComponent(slug));

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

    const parsedUser = userSelectPublicSchema.parse(normalizeArrayOrValue(await _user));
    const parsedPosts = postFullSchema.array().parse(await _posts);
    const parsedCategories = categorySelectPublicSchema
        .array()
        .parse(await _categories);

    return (
        <MainContent
            user={parsedUser}
            posts={parsedPosts}
            tags={parsedCategories}
        />
    );
}
