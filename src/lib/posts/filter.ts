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
 * Parameter      Type       Meaning
 * q              string     Search title, description and content
 * category       number     Category ID
 * author         string     Match author OR co-author
 * contentWarning boolean    Match posts with/without warning
 * visibility      enum      Match visibility
 * readingTimeMin  number    Minimum reading time
 * readingTimeMax  number    Maximum reading time
 * createdAfter    ISO date  Posts created on or after this date
 * createdBefore   ISO date  Posts created on or before this date
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

export function buildPostRelationalWhere(filters: PostFilters) {
    const conditions = [];

    if (filters.query) {
        const pattern = `%${filters.query.replace(/[\\%_]/g, "\\$&")}%`;

        conditions.push({
            OR: [
                { title: { ilike: pattern } },
                { description: { ilike: pattern } },
                { content: { ilike: pattern } },
            ],
        });
    }

    if (filters.categoryId !== undefined) {
        conditions.push({
            category_id: filters.categoryId,
        });
    }

    if (filters.authorId) {
        conditions.push({
            OR: [{ author_id: filters.authorId }, { co_author_id: filters.authorId }],
        });
    }

    return conditions.length ? { AND: conditions } : {};
}

export function buildPostSqlWhere(filters: PostFilters): SQL | undefined {
    const conditions: SQL[] = [];

    if (filters.query) {
        const pattern = `%${filters.query.replace(/[\\%_]/g, "\\$&")}%`;

        const condition = or(
            ilike(posts.title, pattern),
            ilike(posts.description, pattern),
            ilike(posts.content, pattern),
        );

        if (condition) conditions.push(condition);
    }

    if (filters.categoryId !== undefined) {
        conditions.push(eq(posts.category_id, filters.categoryId));
    }

    if (filters.authorId) {
        const condition = or(
            eq(posts.author_id, filters.authorId),
            eq(posts.co_author_id, filters.authorId),
        );

        if (condition) conditions.push(condition);
    }

    return and(...conditions);
}
