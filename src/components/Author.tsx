import { Link } from "@/components/Link";
import FollowButton from "@/components/FollowButton";
import log from "@/utils/stdlog";
import { ReactNode } from "react";
import { Fragment } from "react/jsx-runtime";
import { buildDate } from "@/utils/stdvar";
import {
    Box,
    TypographyVariant,
    Avatar,
    Typography,
    AvatarGroup,
} from "@mui/material";
import { linkSx } from "@/data/styles";
import { UsersRow } from "@/db/types";

const nameSx = {
    ...linkSx,
    px: 1,
    py: 0.75,

    "&::after": {
        transformOrigin: "left",
        bottom: 2,
    },

    "&:hover": {
        backgroundColor: "action.hover",
        transform: "translateY(-2px)",
    },

    "&:active": {
        transform: "translateY(0px)",
    },
};

const dateSx = {
    ...linkSx,
    px: 2.5,

    "&::after": {
        ...linkSx["&::after"],
        left: 16,
        right: 16,
        bottom: 2,
    },
};

// Helper: base container for an author row.
function AuthorRow({ left, right }: { left: ReactNode; right?: ReactNode }) {
    log.trace(`Rendering AuthorRow: ${{ left, right }}`);

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                gap: 2,
                justifyContent: "space-between",
                padding: "16px",
            }}
        >
            {left}
            {right && right}
        </Box>
    );
}

// Helper: single author avatar + name.
function AuthorInfo({
    author,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24,
}: {
    author: UsersRow;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(
        `Rendering AuthorInfo: ${{ author, variant, avatarWidth, avatarHeight }}`,
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
            }}
        >
            <Avatar
                alt={author.username}
                // src={author.avatar_url}
                sx={{ width: avatarWidth, height: avatarHeight }}
            >
                {author.username[0].toUpperCase()}
            </Avatar>

            <Typography variant={variant}>{author.username}</Typography>
        </Box>
    );
}

// Helper: multiple authors (AvatarGroup + names).
function AuthorsInfo({
    authors,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24,
}: {
    authors: UsersRow[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(
        `Rendering AuthorsInfo: ${{ authors, variant, avatarWidth, avatarHeight }}`,
    );

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
            }}
        >
            <AvatarGroup max={3}>
                {authors.map((author) => (
                    <Avatar
                        key={author.id}
                        alt={author.username}
                        // src={author.avatar}
                        sx={{ width: avatarWidth, height: avatarHeight }}
                    >
                        {author.username[0].toUpperCase()}
                    </Avatar>
                ))}
            </AvatarGroup>

            <Typography variant={variant}>
                {authors.map((author) => author.username).join(", ")}
            </Typography>
        </Box>
    );
}

// Refactored components using the helpers:

export function Author({
    author,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRow;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering Author component: ${{ author }}`);

    return (
        <AuthorRow
            left={
                <AuthorInfo
                    author={author}
                    variant={variant}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                />
            }
        />
    );
}

export function Authors({
    authors,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRow[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering Authors component: ${{ authors }}`);

    return (
        <AuthorRow
            left={
                <AuthorsInfo
                    authors={authors}
                    variant={variant}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                />
            }
        />
    );
}

export function AuthorWithDate({
    author,
    date = buildDate,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRow;
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering AuthorWithDate: ${{ author, date }}`);

    return (
        <AuthorRow
            left={
                <AuthorInfo
                    author={author}
                    variant={variant}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                />
            }
            right={
                <Typography variant={variant ?? "caption"}>
                    {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

export function AuthorWithDateAndLink({
    author,
    date = buildDate,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRow;
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering AuthorWithDateAndLink: ${{ author, date }}`);

    return (
        <AuthorRow
            left={
                <Link underline="none" href={`/profile/${author.id}`}>
                    <AuthorInfo
                        author={author}
                        variant={variant}
                        avatarWidth={avatarWidth}
                        avatarHeight={avatarHeight}
                    />
                </Link>
            }
            right={
                <Typography variant={variant ?? "caption"}>
                    {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

export function AuthorsWithDateAndLink({
    authors,
    date = buildDate,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRow[];
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering AuthorsWithDateAndLink: ${{ authors, date }}`);

    return (
        <AuthorRow
            left={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                        alignItems: "center",
                    }}
                >
                    {/* Stack avatars, each wrapped in a Link */}
                    <AvatarGroup max={3}>
                        {authors.map((author) => (
                            <Avatar
                                key={author.id}
                                alt={author.username}
                                // src={author.avatar}
                                sx={{
                                    width: avatarWidth,
                                    height: avatarHeight,
                                }}
                            >
                                {author.username[0].toUpperCase()}
                            </Avatar>
                        ))}
                    </AvatarGroup>

                    {/* List names separated by commas, each name wrapped in a Link */}
                    <Typography variant={variant}>
                        {authors.map((author, index) => (
                            <Fragment key={author.id}>
                                <Link
                                    underline="none"
                                    variant="h4"
                                    href={`/profile/${author.id}`}
                                    sx={nameSx}
                                >
                                    {author.username}
                                </Link>

                                {index < authors.length - 1 && ", "}
                            </Fragment>
                        ))}
                    </Typography>
                </Box>
            }
            right={
                <Typography variant={variant ?? "caption"} sx={dateSx}>
                    {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

export function AuthorsWithDate({
    authors,
    date = buildDate,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRow[];
    date?: Date;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace(`Rendering AuthorsWithDate: ${{ authors, date }}`);

    return (
        <AuthorRow
            left={
                <AuthorsInfo
                    authors={authors}
                    variant={variant}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                />
            }
            right={
                <Typography variant={variant ?? "caption"}>
                    {date.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

export function AuthorWithFollow({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
}: {
    author: UsersRow;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
}) {
    log.trace(`Rendering AuthorWithFollow: ${{ author, doesFollow }}`);

    return (
        <AuthorRow
            left={
                <AuthorInfo
                    author={author}
                    variant={variant}
                    avatarWidth={avatarWidth}
                    avatarHeight={avatarHeight}
                />
            }
            right={
                <FollowButton
                    uid={String(author.id)}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                />
            }
        />
    );
}

export function AuthorWithFollowAndLink({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
}: {
    author: UsersRow;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
}) {
    log.trace(`Rendering AuthorWithFollowAndLink: ${{ author, doesFollow }}`);

    return (
        <AuthorRow
            left={
                <Link
                    underline="none"
                    href={`/profile/${author.id}`}
                    sx={nameSx}
                >
                    <AuthorInfo
                        author={author}
                        variant={variant}
                        avatarWidth={avatarWidth}
                        avatarHeight={avatarHeight}
                    />
                </Link>
            }
            right={
                <FollowButton
                    uid={String(author.id)}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                />
            }
        />
    );
}
