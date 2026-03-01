"use client";

import { linkSx } from "@/data/styles";
import { Grid, styled } from "@mui/material";
import { ReactElement } from "react";

export const stepSx = {
    ...linkSx,

    px: 1,
    py: 0.75,
    userSelect: 'none',

    border: "2px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",

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
