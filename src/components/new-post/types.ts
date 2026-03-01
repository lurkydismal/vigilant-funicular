"use client";

import { linkSx } from "@/data/styles";
import { Grid, styled } from "@mui/material";
import { ReactElement } from "react";

export const stepSx = {
    ...linkSx,

    px: 1,
    py: 0.75,
    userSelect: 'none',

    border: "1px solid",
    borderColor: "divider",

    borderRadius: 1,
    boxShadow:
        "0 0 24px 12px hsla(210, 100%, 25%, 0.8)",
    paddingLeft: 1,
    paddingRight: 1,
    paddingBottom: 1,

    "&::after": {
        transformOrigin: "left",
        bottom: 2,
    },

    "&:hover": {
        backgroundColor: "action.hover",
        transform: "translateY(-2px)",
    },

    "&:active": {
        transform: "translateY(0px)",
    },
};

export interface Step {
    title: string;
    item: ReactElement;
}

export type MoveNext = () => void;

export const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));
