import { unauthorized } from "next/navigation";

import { getSessionData } from "@/lib/auth";

export default async function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getSessionData();

    if (!user) {
        unauthorized();
    }

    return children;
}
