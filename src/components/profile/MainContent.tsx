"use client";

import { Author, AuthorWithFollow } from "@/components/Author";
import PostsPagination from "@/components/Pagination";
import { Posts } from "@/components/Posts";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { CategoriesRowPublic, PostsRowFull, UsersRowPublic } from "@/db/types";
import { paginate } from "@/utils/stdfunc";
import { Box } from "@mui/material";
import { useState, ChangeEvent, ComponentProps } from "react";

// TODO: Fix avatar src
export default function MainContent({ user, posts, tags, isMe = false }: { user: UsersRowPublic; posts: PostsRowFull[]; tags: CategoriesRowPublic[]; isMe?: boolean; }) {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    // TODO: Implement
    const onChange = (_: ChangeEvent<unknown>, page: number) => {
        console.info("You clicked the pagination. ", page);

        setCurrentPage(page);
    };

    const properties = {
        author: user,
        variant: "h2",
        avatarWidth: 48,
        avatarHeight: 48,
    } satisfies ComponentProps<typeof Author>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isMe ? (
                <Author {...properties} />
            ) : (
                <AuthorWithFollow {...properties} doesFollow={false} needText />
            )}

            <SearchButton />

            <TagsAndSearchMobile tags={tags} />

            <Posts posts={paginate(posts, currentPage, perPage)} />

            <PostsPagination
                total={posts.length}
                perPage={perPage}
                onChange={onChange}
            />
        </Box>
    );
}
