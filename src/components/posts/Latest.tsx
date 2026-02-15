import Typography from "@mui/material/Typography";
import PostsPagination from "@/components/Pagination";
import { PostsWithoutImage } from "@/components/Posts";
import { postsData } from "@/components/TestData";
import { paginate } from "@/utils/stdfunc";
import { useState, ChangeEvent } from "react";

export default function Latest() {
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
                posts={paginate(postsData, currentPage, perPage)}
            ></PostsWithoutImage>
            <PostsPagination
                total={postsData.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </div>
    );
}
