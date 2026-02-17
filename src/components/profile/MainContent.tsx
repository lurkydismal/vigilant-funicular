"use client";

import { Author, AuthorWithFollow } from "@/components/Author";
import PostsPagination from "@/components/Pagination";
import { Posts } from "@/components/Posts";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { postsData, tags, user } from "@/data/profile";
import { paginate } from "@/utils/stdfunc";
import { Box } from "@mui/material";
import { useState, ChangeEvent, ComponentProps } from "react";

// TODO: Fix avatar src
export default function MainContent({ id }: { id?: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
    const username: string = user.username;
    const isMeProfile = !id;

    // Router parameter
    // if (!id) {
    //     const { id: temp1, username: temp2 } = getCredentials();
    //
    //     id = temp1;
    //     username = temp2;
    // }

    // TODO: Implement
    const onChange = (_: ChangeEvent<unknown>, page: number) => {
        console.info("You clicked the pagination. ", page);

        setCurrentPage(page);
    };

    const properties = {
        author: {
            uid: id ?? "f3c57824-70d2-464b-9832-e479b9d5042e",
            name: username,
            avatar: username,
        },
        variant: "h2",
        avatarWidth: 48,
        avatarHeight: 48,
    } satisfies ComponentProps<typeof Author>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isMeProfile ? (
                <Author {...properties} />
            ) : (
                <AuthorWithFollow {...properties} doesFollow={false} />
            )}

            <SearchButton />

            <TagsAndSearchMobile tags={tags} />

            <Posts posts={paginate(postsData, currentPage, perPage)} />

            <PostsPagination
                total={postsData.length}
                perPage={perPage}
                onChange={onChange}
            />
        </Box>
    );
}
