import { redirect } from "next/navigation";

import { afterLoginRoute } from "@/data/routes";
import { getSession } from "@/lib/dal/auth";

/**
 * Root page handler that redirects users to default route.
 */
export default async function Page() {
    const user = await getSession();

    if (!user) {
        redirect("/landing");
    }

    redirect(afterLoginRoute);
}
