import { categories, posts, user } from "./schema";

export type UserRow = typeof user.$inferSelect;
export type UserRowInsert = typeof user.$inferInsert;
export type UserRowPublic = Omit<
    UserRow,
    "id" | "createdAt" | "updatedAt" | "email" | "emailVerified"
>;

export type CategoriesRow = typeof categories.$inferSelect;
export type CategoriesRowInsert = typeof categories.$inferInsert;
export type CategoriesRowPublic = Omit<CategoriesRow, "id" | "created_at" | "updated_at">;

export type PostsRow = typeof posts.$inferSelect;
export type PostsRowInsert = typeof posts.$inferInsert;
export type PostsRowFull = Omit<PostsRow, "author_id" | "co_author_id" | "category_id"> & {
    author: UserRowPublic | null;
    coAuthor: UserRowPublic | null;
    category: CategoriesRowPublic | null;
};
