"use server";

import { eq, desc } from "drizzle-orm";
import { cacheTag } from "next/cache";

import db from "@/db";
import { categories } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { categorySelectPublicSchema } from "@/utils/validate/schemas";

export async function requestCategoryId(categoryName: string) {
    "use cache";

    return db
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.name, categoryName))
        .limit(1)
        .execute();
}

export async function getCategoryId(request: ReturnType<typeof requestCategoryId>) {
    const categoryId = normalizeArrayOrValue(await request);
    if (categoryId && categoryId.id) return categoryId.id;

    return null;
}

export async function requestAllCategories() {
    "use cache";
    cacheTag("categories", "category");

    return db.select().from(categories).orderBy(desc(categories.name)).execute();
}

export async function getAllCategories(request: ReturnType<typeof requestAllCategories>) {
    return categorySelectPublicSchema.array().parse(await request);
}
