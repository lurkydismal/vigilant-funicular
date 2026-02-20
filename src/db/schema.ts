import { varchar, serial, pgTable, text, uniqueIndex, check, integer, index, primaryKey } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial().primaryKey(),
    username: varchar({ length: 32 }).unique().notNull(),
    passwordHash: text().notNull(),
    avatarUrl: varchar({ length: 255 }),
    ...timestamps,
}, (t) => [
    check("username_not_blank", sql`length(trim(${t.username})) > 0`),
    check("avatar_url_not_blank", sql`${t.avatarUrl} IS NULL OR length(trim(${t.avatarUrl})) > 0`),

    uniqueIndex().on(t.username),
]);

export const follows = pgTable('follows', {
    followerId: integer().notNull().references(() => users.id, { onDelete: "cascade" }),
    followingId: integer().notNull().references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamps.created_at,
}, (t) => [
    primaryKey({ columns: [t.followerId, t.followingId] }),

    index().on(t.followerId),
    index().on(t.followingId),
]);

export type UsersRow = typeof users.$inferSelect;
export type UsersRowInsert = typeof users.$inferInsert;

export const categories = pgTable("categories", {
    id: serial().primaryKey(),
    name: varchar({ length: 50 }).unique().notNull(),
    ...timestamps,
}, (t) => [
    check("name_not_blank", sql`length(trim(${t.name})) > 0`),

    uniqueIndex().on(t.name),
]);

export type CategoryRow = typeof categories.$inferSelect;
export type CategoryRowInsert = typeof categories.$inferInsert;

export const posts = pgTable("posts", {
    id: serial().primaryKey(),
    authorId: integer().references(() => users.id, { onDelete: "set null" }),
    coAuthorId: integer().references(() => users.id, { onDelete: "set null" }),
    categoryId: integer().references(() => categories.id, { onDelete: "set null" }),
    description: varchar({ length: 200 }),
    content: text().notNull(),
    ...timestamps,
}, (t) => [
    check("description_not_blank", sql`${t.description} IS NULL OR length(trim(${t.description})) > 0`),
    check("content_not_blank", sql`length(trim(${t.content})) > 0`),

    index().on(t.authorId),
    index().on(t.coAuthorId),
    index().on(t.categoryId),
]);

export type PostsRow = typeof posts.$inferSelect;
export type PostsRowInsert = typeof posts.$inferInsert;
