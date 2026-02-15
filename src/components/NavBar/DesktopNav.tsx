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
                {left.map((value, index) => (
                    <Box
                        key={value.href ?? `left-${index}`}
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
                ))}
            </Box>

            <Box
                sx={{
                    paddingRight: 2,
                    alignItems: "center",
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                }}
            >
                {right.map((value, index) => (
                    <Button
                        key={value.href ?? `right-${index}`}
                        color="primary"
                        variant="contained"
                        size="small"
                        href={value.href}
                        component={NextLink}
                    >
                        {value.name}
                    </Button>
                ))}
            </Box>
        </Box>
    );
}
