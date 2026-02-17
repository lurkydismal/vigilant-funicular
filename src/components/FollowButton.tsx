import {
    PersonRemove as UnfollowIcon,
    PersonAdd as FollowIcon,
} from "@mui/icons-material";
import { ButtonProps, IconButton, SxProps, Theme } from "@mui/material";

import { Button } from "@mui/material";

type Props = ButtonProps & {
    uid: string;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
    text?: boolean;
    sx?: SxProps<Theme>;
};

function FollowBase({
    uid,
    doesFollow,
    size,
    text = false,
}: Props) {
    const color = doesFollow ? "error" : "success";
    const icon = doesFollow ? <UnfollowIcon /> : <FollowIcon />;
    const handleClick = () => {
        console.log("Follow: ", uid);
    };

    return text ? (
        <Button
            size={size ?? "small"}
            onClick={handleClick}
            color={color}
            variant="contained"
            startIcon={icon}
        >
            {doesFollow ? "Unfollow" : "Follow"}
        </Button>
    ) : (
        <IconButton
            size={size ?? "medium"}
            onClick={handleClick}
            color={color}
        >
            {icon}
        </IconButton>
    );
}

export function FollowButtonWithText(props: Omit<Props, "text">) {
    return <FollowBase {...props} text />;
}

export function FollowButton(props: Props) {
    return <FollowBase {...props} />;
}

export default FollowButton;
