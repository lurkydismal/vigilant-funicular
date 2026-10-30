import { sql } from "drizzle-orm";
import {
    varchar,
    serial,
    text,
    check,
    smallint,
    integer,
    index,
    primaryKey,
    boolean,
    pgEnum,
    timestamp,
    snakeCase,
} from "drizzle-orm/pg-core";

import { metadataColumns, timestampsColumns } from "./helpers";

const table = snakeCase.table;

export const follows = table(
    "follows",
    {
        follower_id: text()
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        following_id: text()
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        created_at: timestampsColumns.created_at,
    },
    (t) => [
        primaryKey({ columns: [t.follower_id, t.following_id] }),

        check("follower_cannot_follow_themselves", sql`follower_id != following_id`),

        index().on(t.follower_id),
        index().on(t.following_id),
    ],
);

export const categories = table(
    "categories",
    {
        id: serial().primaryKey(),
        name: varchar({ length: 50 }).unique().notNull(),
        ...timestampsColumns,
    },
    (t) => [check("name_not_blank", sql`length(trim(${t.name})) > 0`)],
);

export const postVisibilityEnum = pgEnum("post_visibility", ["public", "unlisted", "private"]);

export const posts = table(
    "posts",
    {
        id: serial().primaryKey(),
        co_author_id: text().references(() => user.id, {
            onDelete: "set null",
        }),
        category_id: integer().references(() => categories.id, {
            onDelete: "set null",
        }),
        title: varchar({ length: 50 }).notNull(),
        description: varchar({ length: 100 }),
        content: text().notNull(),
        content_warning: boolean().default(false).notNull(),
        visibility: postVisibilityEnum().default("public").notNull(),
        // scheduled_at: timestamp({ precision: 0, withTimezone: true }).defaultNow().notNull(),
        reading_time: smallint().notNull(),
        ...metadataColumns,
    },
    (t) => [
        check("title_longer_than_10", sql`length(trim(${t.title})) > 10`),
        check(
            "description_longer_than_10",
            sql`${t.description} IS NULL OR length(trim(${t.description})) > 10`,
        ),
        check("content_longer_than_100", sql`length(trim(${t.content})) > 100`),
        // check("scheduled_at_not_in_past", sql`${t.scheduled_at} >= NOW()`),
        check("reading_time_not_blank", sql`${t.reading_time} > 0`),

        index().on(t.author_id),
        index().on(t.co_author_id),
        index().on(t.category_id),

        index().on(t.author_id, t.created_at.desc()),
    ],
);

// * NOTE: Better Auth
export const user = table("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = table(
    "session",
    {
        id: text("id").primaryKey(),
        expiresAt: timestamp("expires_at").notNull(),
        token: text("token").notNull().unique(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = table(
    "account",
    {
        id: text("id").primaryKey(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at"),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = table(
    "verification",
    {
        id: text("id").primaryKey(),
        identifier: text("identifier").notNull(),
        value: text("value").notNull(),
        expiresAt: timestamp("expires_at").notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at")
            .defaultNow()
            .$onUpdate(() => /* @__PURE__ */ new Date())
            .notNull(),
    },
    (table) => [index("verification_identifier_idx").on(table.identifier)],
);
