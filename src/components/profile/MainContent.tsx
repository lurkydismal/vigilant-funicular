import Box from "@mui/material/Box";
import { Author, AuthorWithFollow } from "@/components/Author";
import PostsPagination from "@/components/Pagination";
import { Posts } from "@/components/Posts";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { postsData, tags, user } from "@/components/TestData";
import { getCredentials, paginate } from "@/utils/stdfunc";
import { useState, ChangeEvent, ComponentProps } from "react";

// TODO: Fix avatar src
export default function MainContent({ id }: { id: number }) {
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
        author: { id, name: username, avatar: username },
        variant: "h2",
        avatarWidth: 48,
        avatarHeight: 48,
    } satisfies ComponentProps<typeof Author>;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {isMeProfile ? (
                <Author {...properties}></Author>
            ) : (
                <AuthorWithFollow
                    {...properties}
                    doesFollow={false}
                ></AuthorWithFollow>
            )}

            <SearchButton></SearchButton>

            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>

            <Posts posts={paginate(postsData, currentPage, perPage)}></Posts>

            <PostsPagination
                total={postsData.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </Box>
    );
}
