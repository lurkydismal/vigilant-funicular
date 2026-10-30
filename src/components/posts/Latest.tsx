"use client";

import { Box, Typography } from "@mui/material";
import { useState, ChangeEvent } from "react";

import PostsPagination from "@/components/Pagination";
import { PostsWithoutImage } from "@/components/Posts";
import { PostsRowFull } from "@/db/types";
import { paginate } from "@/utils/stdfunc";

export default function Latest({ posts }: { posts: PostsRowFull[] }) {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    const onChange = (_: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box
            sx={{
                display: "flex",
                minHeight: 0, // important when used inside flex column with overflow
                flexGrow: 1,
                flexDirection: "column",
            }}
        >
            <Typography variant="h2" gutterBottom sx={{ mx: 1 }}>
                Latest
            </Typography>

            <PostsWithoutImage posts={paginate(posts, currentPage, perPage)} />

            <Box sx={{ my: "auto" }} />

            <PostsPagination total={posts.length} perPage={perPage} onChange={onChange} />
        </Box>
    );
}
