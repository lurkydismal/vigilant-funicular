import MainContent from "@/components/post/MainContent";

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

    return (
        <MainContent id={slug} />
    );
}
