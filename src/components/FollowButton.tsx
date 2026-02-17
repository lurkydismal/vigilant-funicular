import {
    PersonRemove as UnfollowIcon,
    PersonAdd as FollowIcon,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function FollowButton({
    uid,
    doesFollow,
    size,
}: {
    uid: string;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
}) {
    return (
        <IconButton
            size={size ?? "small"}
            onClick={() => {
                console.log("Follow: ", uid);
            }}
            color={doesFollow ? "error" : "success"}
        >
            {doesFollow ? <UnfollowIcon /> : <FollowIcon />}
        </IconButton>
    );
}
