import * as React from 'react';
import Box from '@mui/material/Box';
import PostsPagination from '../../shared/Pagination';
import Typography from '@mui/material/Typography';
import { Follows } from './Follows';
import { SearchButton } from '../../shared/SearchButton';
import { TagsAndSearchMobile } from '../../shared/Tags';
import { follows, tags } from '../../shared/TestData';
import { paginate } from '../../stdfunc';

export default function MainContent() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 12;

    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
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
            <Follows follows={paginate(follows, currentPage, perPage)}></Follows>
            <PostsPagination total={follows.length} perPage={perPage} onChange={onChange}></PostsPagination>
        </Box>
    );
}
