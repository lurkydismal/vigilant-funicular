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
    const handleClick = () => {
        // TODO: Implement
        log.info("Follow: ", uid);
    };

    return needText ? (
        <Button
            size={size ?? "small"}
            onClick={handleClick}
            color={color}
            variant="contained"
            startIcon={icon}
        >
            {text}
        </Button>
    ) : (
        <Tooltip title={text} placement="top" arrow>
            <IconButton
                size={size ?? "medium"}
                onClick={handleClick}
                color={color}
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
