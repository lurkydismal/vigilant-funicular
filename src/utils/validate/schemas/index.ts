import { Dayjs } from "dayjs";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-orm/zod";
import z from "zod";

import { categories, follows, posts, user } from "@/db/schema";
import { DbTarget, TABLES } from "@/lib/types";
import dayjs from "@/utils/dayjs";

export const emptyToNull = <T extends z.ZodType>(schema: T) =>
    z.preprocess((val) => (val === "" ? null : val), schema.nullable());

export const dateInputSchema = z
    .union([z.string(), z.date(), z.custom<Dayjs>((v) => dayjs.isDayjs(v))])
    .superRefine((v, ctx) => {
        if (!dayjs(v).isValid()) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid date",
            });
        }
    })
    .transform((v) => dayjs(v))
    .describe("Date input (string, Date, or Dayjs)");

export const normalizedString = z.preprocess(
    (value) => (value == null ? value : String(value).trim()),
    z.string(),
);

export const userSelectSchema = createSelectSchema(user);
export const userInsertSchema = createInsertSchema(user);
export const userUpdateSchema = createUpdateSchema(user);
export const userSelectPublicSchema = userSelectSchema
    .omit({
        id: true,
        createdAt: true,
        updatedAt: true,
    })
    .extend({
        name: z.string().trim().min(1),
    });

export const followSelectSchema = createSelectSchema(follows);
export const followInsertSchema = createInsertSchema(follows);
export const followUpdateSchema = createUpdateSchema(follows);
export const followSelectPublicSchema = followSelectSchema.omit({
    created_at: true,
});

export const categorySelectSchema = createSelectSchema(categories);
export const categoryInsertSchema = createInsertSchema(categories);
export const categoryUpdateSchema = createUpdateSchema(categories);
export const categorySelectPublicSchema = categorySelectSchema
    .pick({ name: true })
    .extend({ name: z.string().trim().min(1) });

export const postSelectSchema = createSelectSchema(posts);
export const postInsertSchema = createInsertSchema(posts);
export const postUpdateSchema = createUpdateSchema(posts);
export const postFullSchema = postSelectSchema
    .extend({
        author: userSelectPublicSchema,
        coAuthor: userSelectPublicSchema.nullable(),
        category: categorySelectSchema.nullable(),
    })
    .omit({
        author_id: true,
        co_author_id: true,
        category_id: true,
    });

export const postVisibilitySchema = postInsertSchema.shape.visibility;

export const postNewSchema = z.object({
    // Write form
    title: z.string().min(10, "Title too short").max(50, "Title too long"),
    description: z
        .string()
        .min(10, "Description too short")
        .max(100, "Description too long")
        .optional(),
    content: z.string().min(100, "Content too short"),
    "reading-time": z.number().int().min(1),

    // Settings form
    visibility: postVisibilitySchema,
    "content-warning": z.boolean().optional(),
    category: z.string().nonempty(),
    publish: z.enum(["now", "scheduled"]),
    "co-author": z.string().optional(),
    "attribution-note": z.string().optional(),
});

export const registerUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
});
export const loginUserSchema = z.object({
    email: z.email(),
    password: z.string(),
    remember: z.boolean().optional(),
});

export const DbTargetSchema = z.enum(Object.keys(TABLES) as [DbTarget, ...DbTarget[]]);
