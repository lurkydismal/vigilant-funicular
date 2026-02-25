"use client";

import { follow, unfollow } from "@/lib/follow";
import {
    PersonRemove as UnfollowIcon,
    PersonAdd as FollowIcon,
} from "@mui/icons-material";
import {
    Box,
    ButtonProps,
    IconButton,
    SxProps,
    Theme,
    Tooltip,
} from "@mui/material";

import { Button } from "@mui/material";
import { useState, useTransition } from "react";

type Props = ButtonProps & {
    uid: string;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
    needText?: boolean;
    sx?: SxProps<Theme>;
};

function FollowBase({ uid, doesFollow, size, needText = false }: Props) {
    const [_doesFollow, setDoesFollow] = useState(doesFollow);

    const text = _doesFollow ? "Unfollow" : "Follow";
    const color = _doesFollow ? "error" : "success";
    const icon = _doesFollow ? <UnfollowIcon /> : <FollowIcon />;
    const [pending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            if (_doesFollow) {
                await unfollow(uid);
            } else {
                await follow(uid);
            }

            setDoesFollow(!_doesFollow);
        });
    };

    return needText ? (
        <Button
            size={size ?? "small"}
            onClick={handleClick}
            color={color}
            variant="contained"
            startIcon={icon}
            loading={pending}
        >
            {text}
        </Button>
    ) : (
        <Tooltip title={text} placement="top" arrow>
            <Box>
                <IconButton
                    size={size ?? "medium"}
                    onClick={handleClick}
                    color={color}
                    loading={pending}
                >
                    {icon}
                </IconButton>
            </Box>
        </Tooltip>
    );
}

export function FollowButtonWithText(props: Omit<Props, "needText">) {
    return <FollowBase {...props} needText />;
}

export function FollowButton(props: Props) {
    return <FollowBase {...props} />;
}

export default FollowButton;
