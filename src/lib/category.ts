import db from "@/db";
import { categories } from "@/db/schema";
import { desc } from 'drizzle-orm';
import { cacheTag } from "next/cache";
import { unauthorized } from "next/navigation";
import { getSessionData } from "./auth";

export async function requestAllCategories() {
    "use cache";
    cacheTag("categories", "category");

    const session = await getSessionData();
    if (!session) return unauthorized();

    return (
        db
            .select()
            .from(categories)
            .orderBy(desc(categories.name))
            .execute()
    );
}
