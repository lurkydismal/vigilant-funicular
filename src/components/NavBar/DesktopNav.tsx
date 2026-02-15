import NextLink from "../Link";
import { Box, Button, SxProps } from "@mui/material";

type NavItem = {
    name: string;
    href: string;
    position?: "left" | "right";
};
export default function DesktopNav({
    items,
    containerSx,
}: {
    items: NavItem[];
    containerSx?: SxProps;
}) {
    const left = items.filter((i) => i.position === "left");
    const right = items.filter((i) => i.position === "right");

    return (
        <Box
            component="nav"
            role="navigation"
            aria-label="Primary"
            sx={containerSx}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    px: 0,
                }}
            >
                {items.map((value, index) => {
                    return value.position === "left" ? (
                        <Box
                            key={`${value.href}-${index}`}
                            sx={{ display: { xs: "none", md: "flex" } }}
                        >
                            <Button
                                variant="text"
                                color="info"
                                size="small"
                                href={value.href}
                                component={NextLink}
                            >
                                {value.name}
                            </Button>
                        </Box>
                    ) : null;
                })}
            </Box>

            <Box
                sx={{
                    paddingRight: 2,
                    alignItems: "center",
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                }}
            >
                {items.map((value, index) => {
                    return value.position === "right" ? (
                        <Button
                            key={`${value.href}-${index}`}
                            color="primary"
                            variant="contained"
                            size="small"
                            href={value.href}
                            component={NextLink}
                        >
                            {value.name}
                        </Button>
                    ) : null;
                })}
            </Box>
        </Box>
    );
}
