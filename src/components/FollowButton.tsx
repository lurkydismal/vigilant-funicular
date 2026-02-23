import { follow } from "@/lib/follow";
import log from "@/utils/stdlog";
import {
    PersonRemove as UnfollowIcon,
    PersonAdd as FollowIcon,
} from "@mui/icons-material";
import {
    ButtonProps,
    IconButton,
    SxProps,
    Theme,
    Tooltip,
} from "@mui/material";

import { Button } from "@mui/material";
import { useTransition } from "react";

type Props = ButtonProps & {
    uid: string;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
    needText?: boolean;
    sx?: SxProps<Theme>;
};

function FollowBase({ uid, doesFollow, size, needText = false }: Props) {
    const text = doesFollow ? "Unfollow" : "Follow";
    const color = doesFollow ? "error" : "success";
    const icon = doesFollow ? <UnfollowIcon /> : <FollowIcon />;
    const [pending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            await follow(uid);
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
            <IconButton
                size={size ?? "medium"}
                onClick={handleClick}
                color={color}
                loading={pending}
            >
                {icon}
            </IconButton>
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
