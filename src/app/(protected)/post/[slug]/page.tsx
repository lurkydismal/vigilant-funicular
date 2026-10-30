import { unauthorized } from "next/navigation";
import { Suspense } from "react";
import z from "zod";

import Loading from "@/app/loading";
import MainContent from "@/components/post/MainContent";
import { getSession } from "@/lib/dal/auth";
import { getPostFull, requestPostFull } from "@/lib/post";

type ParamsType = {
    /**
     * Route parameters provided by Next.js App Router.
     *
     * `slug` uniquely identifies which tour configuration
     * should be loaded and rendered.
     */
    params: Promise<{ slug: string }>;
};

async function Post({ params }: ParamsType) {
    const { slug } = await params;

    const session = await getSession();
    if (!session) return unauthorized();

    const id = z.coerce.number().parse(slug);

    const posts = await getPostFull(requestPostFull({ id }));

    return <MainContent post={posts} />;
}

export default async function Page({ params }: ParamsType) {
    // TODO: improve
    return (
        <Suspense fallback={<Loading />}>
            <Post params={params} />
        </Suspense>
    );
}
