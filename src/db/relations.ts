import { defineRelations } from "drizzle-orm";
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
    users: {
        posts: r.many.posts(),
    },
    categories: {
        posts: r.many.posts(),
    },
    posts: {
        author: r.one.users({
            from: r.posts.authorId,
            to: r.users.id,
            optional: false,
        }),
        coAuthor: r.one.users({
            from: r.posts.coAuthorId,
            to: r.users.id,
            optional: false,
        }),
        category: r.one.categories({
            from: r.posts.categoryId,
            to: r.categories.id,
            optional: false,
        }),
    },
}));
