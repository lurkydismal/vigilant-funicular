import { buildYear, githubUrl } from "@/utils/stdvar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function CopyrightAligned() {
    return (
        <Typography
            align="center"
            variant="body2"
            sx={{
                color: "text.secondary",
            }}
        >
            {"Copyright © "}
            <Link color="inherit" href={githubUrl}>
                LurkyDismal
            </Link>
            {` ${buildYear}.`}
        </Typography>
    );
}

export function Copyright({ ...props }) {
    return (
        <Typography
            {...props}
            variant="body2"
            sx={{
                color: "text.secondary",
            }}
        >
            {"Copyright © "}
            <Link color="inherit" href={githubUrl}>
                LurkyDismal
            </Link>
            {` ${buildYear}.`}
        </Typography>
    );
}
