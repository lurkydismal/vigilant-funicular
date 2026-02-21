import MainContent from "@/components/post/MainContent";
import db from "@/db";
import { postFullSchema } from "@/utils/validate/schemas";
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

    const id = z.number().parse(slug);

    const _posts = await db.query.posts.findFirst({
        where: {
            id,
        },
        with: {
            author: true,
            coAuthor: true,
            category: true,
        },
    });

    const parsed = postFullSchema.parse(_posts);

    return <MainContent post={parsed} />;
}
