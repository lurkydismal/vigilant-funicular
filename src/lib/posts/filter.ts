import "server-only";
import { and, eq, gte, ilike, lte, or, type SQL } from "drizzle-orm";

import { posts, postVisibilityEnum } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";

export type PostSearchParams = Record<string, string | string[] | undefined>;

type PostVisibility = (typeof postVisibilityEnum.enumValues)[number];

export interface PostFilters {
    query?: string;
    categoryId?: number;
    authorId?: string;
    contentWarning?: boolean;
    visibility?: PostVisibility;
    readingTimeMin?: number;
    readingTimeMax?: number;
    createdAfter?: Date;
    createdBefore?: Date;
}

const visibilityValues = new Set<string>(postVisibilityEnum.enumValues);

export type FilterSearchParams = { searchParams: Promise<PostSearchParams> };

/**
 * Extract a single string from a URL search parameter.
 * For repeated parameters, use the first value.
 */
function getParam(value: string | string[] | undefined): string | undefined {
    return normalizeArrayOrValue(value)?.trim() || undefined;
}

// TODO: Comment
function parseInteger(value: string | undefined, min: number, max: number): number | undefined {
    if (!value || !/^\d+$/.test(value)) return undefined;

    const result = Number(value);

    return Number.isSafeInteger(result) && result >= min && result <= max ? result : undefined;
}

function parseBoolean(value: string | undefined): boolean | undefined {
    if (value === "true") return true;
    if (value === "false") return false;

    return undefined;
}

function parseDate(value: string | undefined): Date | undefined {
    if (!value) return undefined;

    const result = new Date(value);

    return Number.isNaN(result.getTime()) ? undefined : result;
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
    const visibility = getParam(params.visibility);

    return {
        query: getParam(params.q)?.slice(0, 120),

        categoryId: parseInteger(getParam(params.category), 1, 2147483647),

        authorId: getParam(params.author),

        contentWarning: parseBoolean(getParam(params.contentWarning)),

        visibility:
            visibility && visibilityValues.has(visibility)
                ? (visibility as PostVisibility)
                : undefined,

        readingTimeMin: parseInteger(getParam(params.readingTimeMin), 1, 32767),

        readingTimeMax: parseInteger(getParam(params.readingTimeMax), 1, 32767),

        createdAfter: parseDate(getParam(params.createdAfter)),

        createdBefore: parseDate(getParam(params.createdBefore)),
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

    // Match either the original author or the co-author.
    if (filters.authorId) {
        conditions.push({
            OR: [{ author_id: filters.authorId }, { co_author_id: filters.authorId }],
        });
    }

    if (filters.contentWarning !== undefined) {
        conditions.push({
            content_warning: filters.contentWarning,
        });
    }

    if (filters.visibility !== undefined) {
        conditions.push({
            visibility: filters.visibility,
        });
    }

    if (filters.readingTimeMin !== undefined || filters.readingTimeMax !== undefined) {
        conditions.push({
            reading_time: {
                ...(filters.readingTimeMin !== undefined && {
                    gte: filters.readingTimeMin,
                }),
                ...(filters.readingTimeMax !== undefined && {
                    lte: filters.readingTimeMax,
                }),
            },
        });
    }

    if (filters.createdAfter !== undefined || filters.createdBefore !== undefined) {
        conditions.push({
            created_at: {
                ...(filters.createdAfter !== undefined && {
                    gte: filters.createdAfter,
                }),
                ...(filters.createdBefore !== undefined && {
                    lte: filters.createdBefore,
                }),
            },
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

    // Match either the original author or the co-author.
    if (filters.authorId) {
        const condition = or(
            eq(posts.author_id, filters.authorId),
            eq(posts.co_author_id, filters.authorId),
        );

        if (condition) conditions.push(condition);
    }

    if (filters.contentWarning !== undefined) {
        conditions.push(eq(posts.content_warning, filters.contentWarning));
    }

    if (filters.visibility !== undefined) {
        conditions.push(eq(posts.visibility, filters.visibility));
    }

    if (filters.readingTimeMin !== undefined) {
        conditions.push(gte(posts.reading_time, filters.readingTimeMin));
    }

    if (filters.readingTimeMax !== undefined) {
        conditions.push(lte(posts.reading_time, filters.readingTimeMax));
    }

    if (filters.createdAfter !== undefined) {
        conditions.push(gte(posts.created_at, filters.createdAfter));
    }

    if (filters.createdBefore !== undefined) {
        conditions.push(lte(posts.created_at, filters.createdBefore));
    }

    return and(...conditions);
}
