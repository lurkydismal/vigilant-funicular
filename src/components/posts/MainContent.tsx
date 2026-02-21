import { Posts } from "@/components/Posts";
import { SearchButton } from "@/components/SearchButton";
import { TagsAndSearchMobile } from "@/components/Tags";
import { CategoriesRowPublic, PostsRowFull } from "@/db/types";
import { paginate } from "@/utils/stdfunc";
import { Box, Typography } from "@mui/material";

export default function MainContent({
    posts,
    tags,
}: {
    posts: PostsRowFull[];
    tags: CategoriesRowPublic[];
}) {
    const perPage = 6;
    // const { id, username } = getCredentials();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    Featured
                </Typography>
            </div>

            <SearchButton />

            <TagsAndSearchMobile tags={tags} />

            <Posts posts={paginate(posts, 1, perPage)} />
        </Box>
    );
}
