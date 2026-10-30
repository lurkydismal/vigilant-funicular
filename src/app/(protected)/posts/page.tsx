import { Box } from "@mui/material";
import { desc, eq, inArray, or, aliasedTable, and } from "drizzle-orm";
import { unauthorized } from "next/navigation";
import { Suspense } from "react";

import Loading from "@/app/loading";
import MainFallback from "@/components/MainFallback";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import db from "@/db";
import { categories, posts, follows, user } from "@/db/schema";
import { cacheDbRequest } from "@/lib/cache";
import { getSession } from "@/lib/dal/auth";
import {
    parsePostFilters,
    buildPostRelationalWhere,
    PostFilters,
    buildPostSqlWhere,
    FilterSearchParams,
} from "@/lib/posts/filter";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { categorySelectSchema, postFullSchema } from "@/utils/validate/schemas";

async function Posts({ searchParams }: FilterSearchParams) {
    const session = await getSession();
    if (!session) return unauthorized();

    const filters = parsePostFilters(await searchParams);

    const getInfoFromSession = async (
        session: NonNullable<Awaited<ReturnType<typeof getSession>>>,
        filters: PostFilters,
    ) => {
        "use cache";
        cacheDbRequest(["user", "posts", "categories"]);

        const _posts = db.query.posts.findMany({
            where: buildPostRelationalWhere(filters),
            orderBy: {
                created_at: "desc",
            },
            with: {
                author: true,
                coAuthor: true,
                category: true,
            },
        });

        const _userId = await db
            .select({ id: user.id })
            .from(user)
            .where(eq(user.name, session.user.name))
            .limit(1)
            .execute();
        const userId = normalizeArrayOrValue(_userId);
        if (!userId || !userId.id) return unauthorized();

        const _followingIds = await db
            .select({ id: follows.following_id })
            .from(follows)
            .where(eq(follows.follower_id, userId.id))
            .execute();

        const followingIds = (_followingIds || []).map((r) => r.id).filter(Boolean);

        const authors = aliasedTable(user, "authors");
        const coAuthors = aliasedTable(user, "co_authors");

        const _featuredPosts = followingIds.length
            ? await db
                  .select({
                      id: posts.id,
                      title: posts.title,
                      description: posts.description,
                      content: posts.content,
                      created_at: posts.created_at,
                      updated_at: posts.updated_at,

                      author: {
                          id: authors.id,
                          name: authors.name,
                          image: authors.image,
                      },
                      coAuthor: {
                          id: coAuthors.id,
                          name: coAuthors.name,
                          image: coAuthors.image,
                      },
                      category: {
                          id: categories.id,
                          name: categories.name,
                      },
                  })
                  .from(posts)
                  .leftJoin(authors, eq(authors.id, posts.author_id)) // join author
                  .leftJoin(coAuthors, eq(coAuthors.id, posts.co_author_id)) // join coAuthor
                  .leftJoin(categories, eq(categories.id, posts.category_id)) // join category
                  .where(
                      and(
                          or(
                              inArray(posts.author_id, followingIds),
                              inArray(posts.co_author_id, followingIds),
                          ),
                          buildPostSqlWhere(filters),
                      ),
                  )
                  .orderBy(desc(posts.created_at))
                  .execute()
            : [];

        const _categories = db.select().from(categories).orderBy(desc(categories.name)).execute();

        const parsedPosts = postFullSchema.array().parse(await _posts);
        const parsedFeaturedPosts = postFullSchema.array().parse(_featuredPosts);
        const parsedCategories = categorySelectSchema.array().parse(await _categories);

        return { parsedPosts, parsedFeaturedPosts, parsedCategories };
    };

    const { parsedPosts, parsedFeaturedPosts, parsedCategories } = await getInfoFromSession(
        session,
        filters,
    );

    return (
        <MainFallback itemsLength={parsedPosts.length}>
            {parsedCategories.length > 0 && (
                <>
                    <SearchButton />

                    <TagsAndSearchMobile tags={parsedCategories} />
                </>
            )}

            {parsedFeaturedPosts.length > 0 && (
                <>
                    <Box sx={{ my: 1 }} />

                    <MainContent posts={parsedFeaturedPosts} />
                </>
            )}

            <Box sx={{ my: 1 }} />

            <Latest posts={parsedPosts} />
        </MainFallback>
    );
}

export default async function Page({ searchParams }: FilterSearchParams) {
    // TODO: improve
    return (
        <Suspense fallback={<Loading />}>
            <Posts searchParams={searchParams} />
        </Suspense>
    );
}
