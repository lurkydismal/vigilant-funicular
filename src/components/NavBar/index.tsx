import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { alpha, styled } from "@mui/material/styles";
import { useState } from "react";
import NextLink from "@/components/Link";
import DesktopNav from "./DesktopNav";
import { items } from "@/data/navbat";
import MobileNav from "./MobileNav";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: "center",
    backdropFilter: "blur(24px)",
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    boxShadow: (theme.vars || theme).shadows[1],
    border: "1px solid",
    display: "flex",
    flexShrink: 0,
    justifyContent: "space-between",
    padding: "8px 12px",
}));

export default function NavBar() {
    return (
        <AppBar
            enableColorOnDark
            position="fixed"
            sx={{
                backgroundImage: "none",
                bgcolor: "transparent",
                boxShadow: 0,
                mt: "calc(var(--template-frame-height, 0px) + 28px)",
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <DesktopNav items={items} containerSx={{ display: "flex", alignItems: "center" }} />

                    <MobileNav items={items} />
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
