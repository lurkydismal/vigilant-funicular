import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Posts } from '../../Posts';
import { SearchButton } from '../../SearchButton';
import { TagsAndSearchMobile } from '../../Tags';
import { paginate } from '../../stdfunc';
import { postsDataWithIds, tags } from '../../TestData';

export default function MainContent() {
    const perPage = 6;
    // const { id, username } = getCredentials();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    Featured
                </Typography>
            </div>
            <SearchButton></SearchButton>
            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>
            <Posts posts={paginate(postsDataWithIds, 1, perPage)}></Posts>
        </Box>
    );
}
