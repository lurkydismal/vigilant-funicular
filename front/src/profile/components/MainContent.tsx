import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import PostsPagination from '../../Pagination';
import Typography from '@mui/material/Typography';
import { Posts } from '../../Posts';
import { SearchButton } from '../../SearchButton';
import { TagsAndSearchMobile } from '../../Tags';
import { getCredentials, paginate } from '../../stdfunc';
import { postsDataWithIds, tags } from '../../TestData';

// TODO: Fix avatar src
export default function MainContent() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 6;
    const { id, username } = getCredentials();

    // TODO: Implement
    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
        console.info('You clicked the pagination. ', page);

        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 2,
                    justifyContent: 'space-between',
                    padding: '16px',
                }}
            >
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
                >
                    <Avatar
                        alt={username}
                        key={id}
                        src={username}
                    />
                    <Typography variant="h2" gutterBottom>
                        {username}
                    </Typography>
                </Box>
            </Box>
            <SearchButton></SearchButton>
            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>
            <Posts posts={paginate(postsDataWithIds, currentPage, perPage)}></Posts>
            <PostsPagination total={postsDataWithIds.length} perPage={perPage} onChange={onChange}></PostsPagination>
        </Box >
    );
}
