import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
    user: {
        posts: r.many.posts({
            alias: "author",
        }),
        coAuthoredPosts: r.many.posts({
            alias: "coAuthor",
        }),
    },

    categories: {
        posts: r.many.posts(),
    },

    posts: {
        author: r.one.user({
            alias: "author",
            from: r.posts.author_id,
            to: r.user.id,
            optional: false,
        }),
        coAuthor: r.one.user({
            alias: "coAuthor",
            from: r.posts.co_author_id,
            to: r.user.id,
            optional: false,
        }),
        category: r.one.categories({
            from: r.posts.category_id,
            to: r.categories.id,
            optional: false,
        }),
    },
}));
