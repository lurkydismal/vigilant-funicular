import { getSessionOrUnauthorized } from "@/lib/dal/auth";

/**
 * Renders the protected route template wrapper.
 */
export default async function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await getSessionOrUnauthorized();

    return children;
}
