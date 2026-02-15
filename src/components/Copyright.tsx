import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export const githubUrl = process.env.GITHUB_LINK ?? "#";

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
            {` ${new Date().getFullYear()}.`}
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
            {` ${new Date().getFullYear()}.`}
        </Typography>
    );
}
