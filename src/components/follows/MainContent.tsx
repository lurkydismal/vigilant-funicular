import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PostsPagination from "@/components/Pagination";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { follows, tags } from "@/components/TestData";
import { paginate } from "@/utils/stdfunc";
import { Follows } from "./Follows";
import { useState, ChangeEvent } from "react";

export default function MainContent() {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 12;

    const onChange = (_: ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <>
                <Typography variant="h2" gutterBottom>
                    Follows
                </Typography>
            </>

            <SearchButton></SearchButton>

            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>

            <Follows
                follows={paginate(follows, currentPage, perPage)}
            ></Follows>

            <PostsPagination
                total={follows.length}
                perPage={perPage}
                onChange={onChange}
            ></PostsPagination>
        </Box>
    );
}
