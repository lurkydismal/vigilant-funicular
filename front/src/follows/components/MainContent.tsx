import * as React from 'react';
import Box from '@mui/material/Box';
import PostsPagination from '../../shared/Pagination';
import Typography from '@mui/material/Typography';
import { Follows as FollowsElement } from './Follows';
import { SearchButton } from '../../shared/SearchButton';
import { TagsAndSearchMobile } from '../../shared/Tags';
import { follows, tags } from '../../shared/TestData';
import { paginate } from '../../stdfunc';

export default function Follows() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 12;

    // TODO: Implement
    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
        console.info('You clicked the pagination. ', page);

        setCurrentPage(page);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    Follows
                </Typography>
            </div>
            <SearchButton></SearchButton>
            <TagsAndSearchMobile tags={tags}></TagsAndSearchMobile>
            <FollowsElement follows={paginate(follows, currentPage, perPage)}></FollowsElement>
            <PostsPagination total={follows.length} perPage={perPage} onChange={onChange}></PostsPagination>
        </Box>
    );
}
