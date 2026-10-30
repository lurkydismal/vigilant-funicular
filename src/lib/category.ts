"use server";

import { eq, desc, inArray } from "drizzle-orm";

import db from "@/db";
import { categories } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { categorySelectPublicSchema } from "@/utils/validate/schemas";

import { cacheDbRequest, updateDbCacheTags } from "./cache";

export async function requestCategoryId(categoryName: string) {
    "use cache";
    cacheDbRequest(["categories"]);

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
    cacheDbRequest(["categories"]);

    return db.select().from(categories).orderBy(desc(categories.name)).execute();
}

export async function getAllCategories(request: ReturnType<typeof requestAllCategories>) {
    return categorySelectPublicSchema.array().parse(await request);
}

/**
 * Creates categories if they don't already exist.
 * Returns all matching categories, including existing ones.
 */
export async function createCategories(categoryNames: string[]) {
    const names = [
        ...new Set(categoryNames.map((name) => name.trim()).filter((name) => name.length > 0)),
    ];

    if (names.length === 0) return [];

    const inserted = await db
        .insert(categories)
        .values(names.map((name) => ({ name })))
        .onConflictDoNothing({ target: categories.name })
        .returning({ id: categories.id });

    if (inserted.length > 0) {
        updateDbCacheTags(["categories"]);
    }

    const result = await db
        .select()
        .from(categories)
        .where(inArray(categories.name, names))
        .orderBy(desc(categories.name))
        .execute();

    return categorySelectPublicSchema.array().parse(result);
}
