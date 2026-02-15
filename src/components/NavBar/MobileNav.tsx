import { CloseRounded } from "@mui/icons-material";
import { useState } from "react";
import NextLink from "@/components/Link";
import { items, NavItem } from "@/data/navbat";
import { Drawer, Box, IconButton, MenuItem, Divider, Button } from "@mui/material";

export default function MobileNav({ items }: { items: NavItem[] }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
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
                        <CloseRounded />
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
    );
}
