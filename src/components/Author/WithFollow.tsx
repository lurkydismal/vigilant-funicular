import { TypographyVariant } from "@mui/material";

import FollowButton from "@/components/FollowButton";
import { Link } from "@/components/Link";
import { UserRowPublic } from "@/db/types";
import log from "@/utils/stdlog";

import { AuthorInfo, AuthorRow, nameSx, profileHref } from "./base";

/**
 * Author row with a Follow button on the right.
 * `uid` passed to FollowButton is the raw name (not URL-encoded).
 */
export function AuthorWithFollow({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
    followCallback,
    unfollowCallback,
}: {
    author: UserRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
    followCallback?: (name: string) => void;
    unfollowCallback?: (name: string) => void;
}) {
    log.trace("AuthorWithFollow render", {
        name: author?.name,
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
                    uid={author.name}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                    followCallback={followCallback}
                    unfollowCallback={unfollowCallback}
                />
            }
        />
    );
}

/**
 * Author row with link to profile and a Follow button.
 * Link targets use encoded name; FollowButton receives the raw name.
 */
export function AuthorWithFollowAndLink({
    author,
    variant,
    avatarWidth,
    avatarHeight,
    doesFollow,
    needText,
    followCallback,
    unfollowCallback,
}: {
    author: UserRowPublic;
    variant?: TypographyVariant;
    avatarWidth?: number;
    avatarHeight?: number;
    doesFollow: boolean;
    needText?: boolean;
    followCallback?: (name: string) => void;
    unfollowCallback?: (name: string) => void;
}) {
    log.trace("AuthorWithFollowAndLink render", {
        name: author?.name,
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
                    uid={author.name}
                    doesFollow={doesFollow}
                    size="large"
                    needText={needText}
                    followCallback={followCallback}
                    unfollowCallback={unfollowCallback}
                />
            }
        />
    );
}
