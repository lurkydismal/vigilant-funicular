"use client";

import PostsPagination from "@/components/Pagination";
import { PostsWithoutImage } from "@/components/Posts";
import { PostsRow } from "@/db/schema";
import { paginate } from "@/utils/stdfunc";
import { Typography } from "@mui/material";
import { useState, ChangeEvent } from "react";

export default function Latest({ posts }: { posts: PostsRow[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    const onChange = (_: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Latest
            </Typography>

            <PostsWithoutImage
                posts={paginate(posts, currentPage, perPage)}
            ></PostsWithoutImage>

            <PostsPagination
                total={posts.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </div>
    );
}
