import { Posts } from "@/components/Posts";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { postsData, tags } from "@/data/posts";
import { paginate } from "@/utils/stdfunc";
import { Box, Typography } from "@mui/material";

export default function MainContent() {
    const perPage = 6;
    // const { id, username } = getCredentials();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    Featured
                </Typography>
            </div>

            <SearchButton></SearchButton>

            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>

            <Posts posts={paginate(postsData, 1, perPage)}></Posts>
        </Box>
    );
}
