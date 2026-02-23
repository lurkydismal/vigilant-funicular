import { Link } from "@/components/Link";
import FollowButton from "@/components/FollowButton";
import log from "@/utils/stdlog";
import { Fragment } from "react";
import {
    Box,
    TypographyVariant,
    Avatar,
    Typography,
    AvatarGroup,
} from "@mui/material";
import { linkSx } from "@/data/styles";
import { UsersRowPublic } from "@/db/types";

/**
 * Styles used for author name links.
 * Keeps the visual behaviour from your original file.
 */
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

function profileHref(author: UsersRowPublic) {
    return `/profile/${encodeURIComponent(author.username_normalized)}`;
}

/**
 * Small wrapper used for rows with left and optional right content.
 *
 * @param left - left-side node (required)
 * @param right - right-side node (optional)
 */
function AuthorRow({
    left,
    right,
}: {
    left: React.ReactNode;
    right?: React.ReactNode;
}) {
    log.trace("AuthorRow render");

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
            {right ?? null}
        </Box>
    );
}

/**
 * Render single avatar + username.
 *
 * @param author - public user record
 * @param variant - MUI Typography variant
 * @param avatarWidth - avatar width in px
 * @param avatarHeight - avatar height in px
 */
function AuthorInfo({
    author,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24,
}: {
    author: UsersRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorInfo render", { username: author?.username });

    const initial =
        author?.username && author.username[0]
            ? author.username[0].toUpperCase()
            : "?";

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
                alt={author.username ?? "author"}
                src={author.avatar_url ?? undefined}
                sx={{ width: avatarWidth, height: avatarHeight }}
            >
                {initial}
            </Avatar>

            <Typography variant={variant}>{author.username}</Typography>
        </Box>
    );
}

/**
 * Render multiple avatars (AvatarGroup) and a comma-separated names list.
 *
 * @param authors - array of public user records
 * @param variant - typography variant
 * @param avatarWidth - avatar width in px
 * @param avatarHeight - avatar height in px
 */
function AuthorsInfo({
    authors,
    variant = "caption",
    avatarWidth = 24,
    avatarHeight = 24,
}: {
    authors: UsersRowPublic[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorsInfo render", { count: authors?.length ?? 0 });

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
                {authors.map((a) => (
                    <Avatar
                        key={a.username}
                        alt={a.username}
                        src={a.avatar_url ?? undefined}
                        sx={{ width: avatarWidth, height: avatarHeight }}
                    >
                        {a.username && a.username[0]
                            ? a.username[0].toUpperCase()
                            : "?"}
                    </Avatar>
                ))}
            </AvatarGroup>

            <Typography variant={variant}>
                {authors.map((a) => a.username).join(", ")}
            </Typography>
        </Box>
    );
}

/**
 * Single author row (avatar + name).
 */
export function Author({
    author,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("Author render", { username: author?.username });

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

/**
 * Multiple authors row (avatars + names).
 */
export function Authors({
    authors,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRowPublic[];
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("Authors render", { count: authors?.length ?? 0 });

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

/**
 * Single author with date on the right.
 * Accepts `date` as Date | string; strings are converted with `new Date(...)`.
 */
export function AuthorWithDate({
    author,
    date,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRowPublic;
    date: Date | string;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorWithDate render", { username: author?.username });
    const d = new Date(date);

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
                    {d.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

/**
 * Single author whose name/avatar link to the author's profile.
 * Profile URL uses encoded username in the path; the profile page should decode the slug.
 */
export function AuthorWithDateAndLink({
    author,
    date,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    author: UsersRowPublic;
    date: Date | string;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorWithDateAndLink render", { username: author?.username });

    const d = new Date(date);

    return (
        <AuthorRow
            left={
                <Link
                    underline="none"
                    href={profileHref(author)}
                    sx={{ display: "inline-flex", alignItems: "center" }}
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
                <Typography variant={variant ?? "caption"}>
                    {d.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

/**
 * Multiple authors with links for each name (and avatars shown in an AvatarGroup).
 * Each author's name links to `/profile/<encoded-username>`.
 */
export function AuthorsWithDateAndLink({
    authors,
    date,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRowPublic[];
    date: Date | string;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorsWithDateAndLink render", { count: authors?.length ?? 0 });

    const d = new Date(date);

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
                    <AvatarGroup max={3}>
                        {authors.map((a) => (
                            <Link
                                key={a.username + "-avatar"}
                                href={profileHref(a)}
                                underline="none"
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                }}
                            >
                                <Avatar
                                    alt={a.username}
                                    src={a.avatar_url ?? undefined}
                                    sx={{
                                        width: avatarWidth,
                                        height: avatarHeight,
                                    }}
                                >
                                    {a.username && a.username[0]
                                        ? a.username[0].toUpperCase()
                                        : "?"}
                                </Avatar>
                            </Link>
                        ))}
                    </AvatarGroup>

                    <Typography variant={variant}>
                        {authors.map((a, i) => (
                            <Fragment key={a.username}>
                                <Link
                                    underline="none"
                                    variant="h4"
                                    href={profileHref(a)}
                                    sx={nameSx}
                                >
                                    {a.username}
                                </Link>
                                {i < authors.length - 1 && ", "}
                            </Fragment>
                        ))}
                    </Typography>
                </Box>
            }
            right={
                <Typography variant={variant ?? "caption"} sx={dateSx}>
                    {d.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

/**
 * Multiple authors + date (no links).
 */
export function AuthorsWithDate({
    authors,
    date,
    variant,
    avatarWidth,
    avatarHeight,
}: {
    authors: UsersRowPublic[];
    date: Date | string;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
}) {
    log.trace("AuthorsWithDate render", { count: authors?.length ?? 0 });

    const d = new Date(date);

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
                    {d.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                </Typography>
            }
        />
    );
}

/**
 * Author row with a Follow button on the right.
 * `uid` passed to FollowButton is the raw username (not URL-encoded).
 */
export function AuthorWithFollow({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
}: {
    author: UsersRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
}) {
    log.trace("AuthorWithFollow render", {
        username: author?.username,
        doesFollow,
    });

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
                    uid={author.username}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                />
            }
        />
    );
}

/**
 * Author row with link to profile and a Follow button.
 * Link targets use encoded username; FollowButton receives the raw username.
 */
export function AuthorWithFollowAndLink({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
}: {
    author: UsersRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
}) {
    log.trace("AuthorWithFollowAndLink render", {
        username: author?.username,
        doesFollow,
    });

    return (
        <AuthorRow
            left={
                <Link underline="none" href={profileHref(author)} sx={nameSx}>
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
                    uid={author.username}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                />
            }
        />
    );
}
