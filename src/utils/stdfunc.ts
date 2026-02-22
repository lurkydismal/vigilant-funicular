/**
 * Utility functions for server and client use.
 */

import { PostsRowFull } from "@/db/types";

/**
 * Get an environment variable or return a default if missing.
 *
 * @param key - Environment variable name
 * @param defaultValue - Optional default value to use if the env var is missing
 * @returns Value of the environment variable, or the default if provided
 * @throws Error if the variable is missing and no default is provided
 */
export function getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key];

    if (value !== undefined) {
        return value;
    }

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    console.error(`Environment variable "${key}" is not set`);
    throw new Error(`Missing environment variable: ${key}`);
}

/**
 * Parse a string into boolean.
 * Accepts "true", "1", "yes" (case-sensitive) as true. Everything else is false.
 */
export function parseBool(value: string): boolean {
    return value === "true" || value === "1" || value === "yes";
}

/**
 * Encode each segment of a URL/path safely.
 * Filters out empty segments to avoid "//" and encodes each segment.
 */
export function encodePath(path: string): string {
    return path.split("/").filter(Boolean).map(encodeURIComponent).join("/");
}

/**
 * Sanitize a filename to be filesystem-safe.
 * - Replaces spaces with underscores
 * - Replaces non-alphanumeric characters with underscores
 * - Removes leading dots
 * - Truncates to 100 characters
 * - Converts to lowercase
 *
 * @param raw - Input to sanitize
 * @returns Sanitized string or null if invalid/empty
 */
export function sanitizeFilename(raw: unknown): string | null {
    if (typeof raw !== "string") return null;

    const s = raw
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9_\-\.]/g, "_")
        .replace(/^\.+/, "")
        .slice(0, 100)
        .toLowerCase();

    return s || null;
}

/**
 * Convert a string to camelCase.
 * - Trims and lowercases
 * - Removes special characters except spaces
 * - Converts words after spaces to uppercase
 */
export function toCamelCase(header: string): string {
    return header
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 ]+/g, "")
        .replace(/\s+([a-z0-9])/g, (_, c) => c.toUpperCase());
}

/**
 * Type guard to check if an input is a plain object (Record<string, any>).
 *
 * @param input - The value to check
 * @returns True if input is a plain object
 */
export function isRecord(input: unknown): input is Record<string, any> {
    if (typeof input !== "object" || input === null) return false;

    const proto = Object.getPrototypeOf(input);
    return proto === Object.prototype || proto === null;
}

/**
 * Type guard for Blob objects.
 *
 * @param v - Value to check
 * @returns True if v is a Blob instance
 */
export function isBlob(v: unknown): v is Blob {
    return v instanceof Blob;
}

/**
 * Extract a value from FormData, Record, or return raw value.
 *
 * @template T - Expected type
 * @param input - FormData, Record, or raw value
 * @param key - Key to extract if input is FormData or Record
 * @returns Extracted value or undefined
 */
export function extractFromFormData<T = unknown>(
    input: FormData | Record<string, any> | unknown,
    key: string,
): T | undefined {
    if (input instanceof FormData) {
        const value = input.get(key);
        return value === null ? undefined : (value as T);
    }

    if (isRecord(input)) {
        if (!key) return undefined;
        return input[key] as T | undefined;
    }

    return input as T | undefined;
}

/**
 * Delay execution for a specified number of milliseconds.
 * - Validates input to avoid invalid or excessive delays.
 */
export function delay(milliseconds: number): Promise<void> {
    const ms = Number(milliseconds);

    // Validate delay to avoid unbounded timers from untrusted input
    if (!Number.isFinite(ms) || ms < 0) {
        throw new Error(`Invalid delay value: ${milliseconds}`);
    }

    // Enforce an upper bound to prevent resource exhaustion
    const MAX_DELAY_MS = 60_000; // 1 minute
    if (ms > MAX_DELAY_MS) {
        throw new Error(
            `Delay value ${milliseconds} exceeds maximum allowed of ${MAX_DELAY_MS} ms`,
        );
    }

    return new Promise((resolve) => setTimeout(resolve, Math.floor(ms)));
}

/**
 * Paginate an array of items.
 *
 * @template T - Array element type
 * @param items - Array of items to paginate
 * @param currentPage - 1-based page number
 * @param perPage - Number of items per page
 * @returns Slice of items for the current page
 */
export function paginate<T>(
    items: T[],
    currentPage: number,
    perPage: number,
): T[] {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
}

/**
 * Concatenate post authors and co-author (if any).
 *
 * @param post - Post object
 * @returns Array of authors (primary + co-author)
 */
export function concatenateAuthors(post: PostsRowFull) {
    return [
        post.author ?? { username: "Unknown", avatar_url: null },
        ...(post.coAuthor ? [post.coAuthor] : []),
    ];
}

/**
 * @template T - [TODO:type]
 * @param item - [TODO:description]
 * @returns [TODO:return]
 */
export function normalizeArrayOrValue<T>(item: T | T[]): T {
    return Array.isArray(item) ? item[0] : item;
}
