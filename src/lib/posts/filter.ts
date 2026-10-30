import "server-only";
import { and, eq, ilike, or, type SQL } from "drizzle-orm";

import { posts } from "@/db/schema";

export type PostSearchParams = Record<string, string | string[] | undefined>;

export interface PostFilters {
    query?: string;
    categoryId?: number;
    authorId?: string;
}

/**
 * Extract a single string from a URL search parameter.
 * For repeated parameters, use the first value.
 */
function getParam(value: string | string[] | undefined): string | undefined {
    const result = Array.isArray(value) ? value[0] : value;
    return result?.trim() || undefined;
}

/**
 * Convert URL search parameters into normalized post filters.
 */
export function parsePostFilters(params: PostSearchParams): PostFilters {
    const category = getParam(params.category);
    const categoryId = category ? Number(category) : undefined;

    return {
        query: getParam(params.q)?.slice(0, 120),
        categoryId:
            categoryId !== undefined && Number.isSafeInteger(categoryId) && categoryId > 0
                ? categoryId
                : undefined,
        authorId: getParam(params.author),
    };
}

/**
 * Build a reusable Drizzle WHERE condition.
 */
export function buildPostWhere(filters: PostFilters): SQL | undefined {
    const conditions: SQL[] = [];

    // Search
    if (filters.query) {
        const query = filters.query.replace(/[\\%_]/g, "\\$&");
        const pattern = `%${query}%`;

        const searchCondition = or(
            ilike(posts.title, pattern),
            ilike(posts.description, pattern),
            ilike(posts.content, pattern),
        );

        if (searchCondition) conditions.push(searchCondition);
    }

    // Category
    if (filters.categoryId) {
        conditions.push(eq(posts.category_id, filters.categoryId));
    }

    // Author or co-author
    if (filters.authorId) {
        const authorCondition = or(
            eq(posts.author_id, filters.authorId),
            eq(posts.co_author_id, filters.authorId),
        );

        if (authorCondition) conditions.push(authorCondition);
    }

    return and(...conditions);
}
