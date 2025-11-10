import * as React from 'react';
import PostsPagination from '../../Pagination';
import Typography from '@mui/material/Typography';
import { PostsWithoutImage } from '../../Posts';
import { paginate } from '../../stdfunc';
import { postsData } from '../../TestData';

export default function Latest() {
    const [currentPage, setCurrentPage] = React.useState(1);
    const perPage = 12;

    // TODO: Implement
    const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
        console.info('You clicked the pagination. ', page);

        setCurrentPage(page);
    };

    return (
        <div>
            <Typography variant="h2" gutterBottom>
                Latest
            </Typography>
            <PostsWithoutImage posts={paginate(postsData, currentPage, perPage)}></PostsWithoutImage>
            <PostsPagination total={postsData.length} perPage={perPage} onChange={onChange}></PostsPagination>
        </div>
    );
}
