"use client";

import React from "react";
import { buildYear, githubUrl } from "@/utils/stdvar";
import { styled, TypographyProps, Theme, Typography, SxProps } from "@mui/material";
import { Link } from "./Link";

const GitHubLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    transition: "color 120ms ease, text-decoration-color 120ms ease",
    textDecoration: "none",
    "&:hover": {
        color: theme.palette.primary.main,
        textDecoration: "underline",
    },
}));

type Props = TypographyProps & {
    href?: string;
    openInNewTab?: boolean;
    label?: React.ReactNode;
    centered?: boolean;
    sx?: SxProps<Theme>;
};

function CopyrightBase({
    href = githubUrl,
    openInNewTab = true,
    label = "LurkyDismal",
    centered = false,
    sx,
    ...typographyProps
}: Props) {
    const target = openInNewTab ? "_blank" : undefined;
    const rel = openInNewTab ? "noopener noreferrer" : undefined;

    // ensure the component's color is applied but allow callers to override/extend via sx
    const mergedSx: SxProps<Theme> =
        typeof sx === "function"
            ? (theme) => ({ color: theme.palette.text.secondary, ...sx(theme) })
            : { color: "text.secondary", ...(sx ?? {}) };

    return (
        <Typography
            variant="body2"
            align={centered ? "center" : typographyProps.align}
            sx={mergedSx}
            {...typographyProps}
        >
            {"Copyright © "}
            <GitHubLink href={href} target={target} rel={rel} underline="none">
                {label}
            </GitHubLink>
            {` ${buildYear}.`}
        </Typography>
    );
}

export function CopyrightAligned(props: Omit<Props, "centered">) {
    return <CopyrightBase {...props} centered />;
}

export function Copyright(props: Props) {
    return <CopyrightBase {...props} />;
}
