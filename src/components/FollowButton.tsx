import {
    PersonRemove as UnfollowIcon,
    PersonAdd as FollowIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Follow({
    uid,
    doesFollow,
    size,
}: {
    uid: string;
    doesFollow: boolean;
    size?: "small" | "medium" | "large";
}) {
    return (
        <Button
            size={size ?? "small"}
            onClick={() => {
                console.log("Follow: ", uid);
            }}
            color={doesFollow ? "error" : "success"}
            variant="contained"
            startIcon={doesFollow ? <UnfollowIcon /> : <FollowIcon />}
        >
            {doesFollow ? "Unfollow" : "Follow"}
        </Button>
    );
}
