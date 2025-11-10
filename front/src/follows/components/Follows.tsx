import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import Typography from '@mui/material/Typography';
import { Author } from '../../Author';
import { Post, validatePosts } from '../../Posts';
import { styled } from '@mui/material/styles';

export interface Follow {
    author: Author;
    post: Post;
};

const StyledTypography = styled(Typography)({
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
    '&:hover': { cursor: 'pointer' },
    position: 'relative',
    textDecoration: 'none',
    '& .arrow': {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        visibility: 'hidden',
    },
    '&:hover .arrow': {
        opacity: 0.7,
        visibility: 'visible',
    },
    '&:focus-visible': {
        borderRadius: '8px',
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
    },
    '&::before': {
        backgroundColor: (theme.vars || theme).palette.text.primary,
        bottom: 0,
        content: '""',
        height: '1px',
        left: 0,
        opacity: 0.3,
        position: 'absolute',
        transition: 'width 0.3s ease, opacity 0.3s ease',
        width: 0,
    },
    '&:hover::before': {
        width: '100%',
    },
}));

export function Follows({ follows }: { follows: Follow[] }) {
    validatePosts(follows.map(follow => follow.post));

    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
            {follows.map((follow, index) => (
                <Grid key={follow.post.id ?? index} size={{ xs: 12, sm: 6 }}>
                    <Box
                        sx={{
                            // TODO: Decide
                            borderRadius: 1,
                            boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
                            outline: '6px solid',
                            outlineColor: 'hsla(220, 20%, 42%, 0.1)',
                            paddingLeft: 2,
                            paddingRight: 2,

                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            height: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Author authors={[follow.author]} variant='h6' />
                        <TitleTypography
                            className={focusedCardIndex === index ? 'Mui-focused' : ''}
                            gutterBottom
                            onBlur={handleBlur}
                            onFocus={() => handleFocus(index)}
                            tabIndex={0}
                            variant="h6"
                        >
                            {follow.post.title}
                            <NavigateNextRoundedIcon
                                className="arrow"
                                sx={{ fontSize: '1rem' }}
                            />
                        </TitleTypography>
                        <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                            {follow.post.description}
                        </StyledTypography>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
}
