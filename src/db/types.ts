import { categories, posts, users } from "./schema";

export type UsersRow = typeof users.$inferSelect;
export type UsersRowInsert = typeof users.$inferInsert;

export type CategoriesRow = typeof categories.$inferSelect;
export type CategoriesRowInsert = typeof categories.$inferInsert;

export type PostsRow = typeof posts.$inferSelect;
export type PostsRowInsert = typeof posts.$inferInsert;
export type PostsRowWithCategory = Omit<PostsRow, "category_id"> & {
    category: CategoriesRow;
};
