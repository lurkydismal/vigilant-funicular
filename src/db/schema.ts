import {
    varchar,
    serial,
    pgTable,
    text,
    uniqueIndex,
    check,
    integer,
    index,
    primaryKey,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { sql } from "drizzle-orm";

export const users = pgTable(
    "users",
    {
        id: serial().primaryKey(),
        username: varchar({ length: 32 }).unique().notNull(),
        password_hash: text().notNull(),
        avatar_url: varchar({ length: 255 }),
        ...timestamps,
    },
    (t) => [
        check("username_not_blank", sql`length(trim(${t.username})) > 0`),
        check(
            "avatar_url_not_blank",
            sql`${t.avatar_url} IS NULL OR length(trim(${t.avatar_url})) > 0`,
        ),

        uniqueIndex().on(t.username),
    ],
);

export const follows = pgTable(
    "follows",
    {
        follower_id: integer()
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        following_id: integer()
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        created_at: timestamps.created_at,
    },
    (t) => [
        primaryKey({ columns: [t.follower_id, t.following_id] }),

        index().on(t.follower_id),
        index().on(t.following_id),
    ],
);

export const categories = pgTable(
    "categories",
    {
        id: serial().primaryKey(),
        name: varchar({ length: 50 }).unique().notNull(),
        ...timestamps,
    },
    (t) => [
        check("name_not_blank", sql`length(trim(${t.name})) > 0`),

        uniqueIndex().on(t.name),
    ],
);

export const posts = pgTable(
    "posts",
    {
        id: serial().primaryKey(),
        author_id: integer().references(() => users.id, {
            onDelete: "set null",
        }),
        co_author_id: integer().references(() => users.id, {
            onDelete: "set null",
        }),
        category_id: integer().references(() => categories.id, {
            onDelete: "set null",
        }),
        preview_url: varchar({ length: 255 }),
        title: varchar({ length: 50 }).notNull(),
        description: varchar({ length: 200 }),
        content: text().notNull(),
        ...timestamps,
    },
    (t) => [
        check(
            "preview_url_not_blank",
            sql`${t.preview_url} IS NULL OR length(trim(${t.preview_url})) > 0`,
        ),
        check(
            "description_not_blank",
            sql`${t.description} IS NULL OR length(trim(${t.description})) > 0`,
        ),
        check("content_not_blank", sql`length(trim(${t.content})) > 0`),
        check("title_not_blank", sql`length(trim(${t.title})) > 0`),

        index().on(t.author_id),
        index().on(t.co_author_id),
        index().on(t.category_id),

        index().on(t.author_id, t.created_at.desc())
    ],
);
