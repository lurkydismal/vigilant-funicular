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
import NextLink from "../Link";
import DesktopNav from "./DesktopNav";
import { items } from "@/data/navbat";

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
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

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

                    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
                        <IconButton
                            aria-label="Menu button"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Drawer
                            anchor="top"
                            onClose={toggleDrawer(false)}
                            open={open}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: "var(--template-frame-height, 0px)",
                                    },
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    p: 1,
                                    backgroundColor: "background.default",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>

                                {items.map((value, index) => {
                                    return value.position === "left" ? (
                                        <MenuItem
                                            key={`${value.href}-${index}`}
                                            href={value.href}
                                            component={NextLink}
                                        >
                                            {value.name}
                                        </MenuItem>
                                    ) : null;
                                })}

                                <Divider sx={{ my: 3 }} />

                                <MenuItem sx={{ gap: 1 }}>
                                    {items.map((value, index) => {
                                        return value.position === "right" ? (
                                            <Button
                                                key={`${value.href}-${index}`}
                                                color="primary"
                                                variant="contained"
                                                href={value.href}
                                                component={NextLink}
                                                fullWidth
                                            >
                                                {value.name}
                                            </Button>
                                        ) : null;
                                    })}
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
