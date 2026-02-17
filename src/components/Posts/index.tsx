"use client";

import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Author, AuthorsWithDate } from "@/components/Author";
import MainFallback from "@/components/MainFallback";
import { useRouter } from "next/navigation";

export interface Post {
    authors: Author[];
    content: string;
    createdAt: string;
    description: string;
    id: number;
    tag: string;
    imageUrl?: string;
    title: string;
}

/* Card wrapper — lift + subtle shadow on hover/focus */
const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: 0,
    transition: "transform 240ms ease, box-shadow 240ms ease",
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
    outline: "none",

    // Normal state has subtle outline for contrast on light bg
    "&:hover, &:focus-visible": {
        transform: "translateY(-6px)",
        boxShadow: theme.shadows[6],
    },

    // visible focus ring (keyboard)
    "&:focus-visible": {
        boxShadow: `0 0 0 4px ${theme.palette.action.focus}`,
    },
}));

/* Media wrapper for image scale + overlay */
const MediaWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    overflow: "hidden",
    borderBottom: `1px solid ${theme.palette.divider}`,
    img: {
        display: "block",
        width: "100%",
        height: "auto",
        transition: "transform 400ms ease, filter 300ms ease",
        willChange: "transform",
    },
}));

/* Overlay with arrow that appears on hover */
const MediaOverlay = styled(Box)(({ theme }) => ({
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: theme.spacing(2),
    pointerEvents: "none",
    background: "linear-gradient(90deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.28))",
    color: theme.palette.primary.contrastText,
    opacity: 0,
    transform: "translateY(4px)",
    transition: "opacity 220ms ease, transform 220ms ease",

    // small box behind icon for clearer touch target on mobile
    "& .arrowBox": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: 20,
        background: "rgba(0,0,0,0.28)",
    },

    // when parent is hovered, show overlay — parent hook below sets hover
}));

/* Content area */
const StyledCardContent = styled(CardContent)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    "&:last-child": {
        paddingBottom: theme.spacing(2),
    },
}));

/* Truncated description */
const Truncated = styled(Typography)({
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

export function Posts({ posts }: { posts: Post[] }) {
    const router = useRouter();

    const handleNavigate = (id: number) => {
        router.push(`/post/${id}`);
    };

    // keyboard accessible navigation
    const handleKey = (e: React.KeyboardEvent, id: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNavigate(id);
        }
    };

    return (
        <MainFallback itemsLength={posts.length}>
            <Grid container spacing={2} columns={12}>
                {posts.map((post, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={post.id ?? index}>
                        <StyledCard
                            onClick={() => handleNavigate(post.id)}
                            onKeyDown={(e) => handleKey(e, post.id)}
                            tabIndex={0}
                            role="link"
                            aria-label={`${post.title} — ${post.tag}`}
                            variant="outlined"
                            sx={{
                                // sync overlay + image transform via sx for hover state
                                "&:hover .post-image": { transform: "scale(1.06)" },
                                "&:hover .post-overlay": {
                                    opacity: 1,
                                    transform: "translateY(0)",
                                },
                            }}
                        >
                            <MediaWrapper>
                                <CardMedia
                                    className="post-image"
                                    component="img"
                                    alt={post.title}
                                    image={
                                        post.imageUrl ??
                                        `https://picsum.photos/800/450?random=${post.id ?? index}`
                                    }
                                    sx={{
                                        aspectRatio: "16/9",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                    loading="lazy"
                                />

                                <MediaOverlay className="post-overlay">
                                    <Box className="arrowBox" aria-hidden>
                                        <NavigateNextRoundedIcon />
                                    </Box>
                                </MediaOverlay>
                            </MediaWrapper>

                            <StyledCardContent>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {post.tag}
                                </Typography>

                                <Typography variant="h6">{post.title}</Typography>

                                <Truncated
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {post.description}
                                </Truncated>
                            </StyledCardContent>

                            <AuthorsWithDate authors={post.authors} />
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </MainFallback>
    );
}

const TitleTypography = styled(Typography)(({ theme }) => ({
    "&:hover": { cursor: "pointer" },
    position: "relative",
    textDecoration: "none",
    "& .arrow": {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        visibility: "hidden",
    },
    "&:hover .arrow": {
        opacity: 0.7,
        visibility: "visible",
    },
    "&:focus-visible": {
        borderRadius: "8px",
        outline: "3px solid",
        outlineColor: "hsla(210, 98%, 48%, 0.5)",
        outlineOffset: "3px",
    },
    "&::before": {
        backgroundColor: (theme.vars || theme).palette.text.primary,
        bottom: 0,
        content: '""',
        height: "1px",
        left: 0,
        opacity: 0.3,
        position: "absolute",
        transition: "width 0.3s ease, opacity 0.3s ease",
        width: 0,
    },
    "&:hover::before": {
        width: "100%",
    },
}));

export function PostsWithoutImage({ posts }: { posts: Post[] }) {
    const router = useRouter();

    const handleNavigate = (id: number) => {
        router.push(`/post/${id}`);
    };

    // keyboard accessible navigation
    const handleKey = (e: React.KeyboardEvent, id: number) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNavigate(id);
        }
    };

    return (
        <MainFallback itemsLength={posts.length}>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {posts.map((post, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                height: "100%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                gutterBottom
                                variant="caption"
                                component="div"
                            >
                                {post.tag}
                            </Typography>

                            <TitleTypography
                                onClick={() => handleNavigate(post.id)}
                                onKeyDown={(e) => handleKey(e, post.id)}
                                gutterBottom
                                tabIndex={0}
                                variant="h6"
                            >
                                {post.title}

                                <NavigateNextRoundedIcon
                                    className="arrow"
                                    sx={{ fontSize: "1rem" }}
                                />
                            </TitleTypography>

                            <Truncated
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                            >
                                {post.description}
                            </Truncated>

                            <AuthorsWithDate authors={post.authors} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </MainFallback>
    );
}
