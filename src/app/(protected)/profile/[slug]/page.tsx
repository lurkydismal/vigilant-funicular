import MainContent from "@/components/profile/MainContent";
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

    const parsed = z.string().nonempty().parse(slug);

    return <MainContent id={parsed} />;
}
