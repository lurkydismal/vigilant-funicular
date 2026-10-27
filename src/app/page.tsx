import { permanentRedirect } from "next/navigation";

import { getSessionData } from "@/lib/auth";

export default async function Page() {
    const user = await getSessionData();

    if (!user) {
        permanentRedirect("/landing");
    }

    permanentRedirect("/posts");
}
