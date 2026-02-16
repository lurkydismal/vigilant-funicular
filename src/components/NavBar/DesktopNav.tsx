import { NavItem } from "@/data/navbat";
import NextLink from "@/components/Link";
import { Box, Button, Divider, SxProps } from "@mui/material";

export default function DesktopNav({
    items,
    containerSx,
}: {
    items: NavItem[];
    containerSx?: SxProps;
}) {
    const left = items.filter((i) => i.position === "left");
    const right = items.filter((i) => i.position === "right");

    const navButtonSx: SxProps = {
        px: 2,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 500,
        transition: "all 0.2s ease",
        "&:hover": {
            backgroundColor: "action.hover",
            transform: "translateY(-1px)",
        },
    };

    return (
        <Box
            component="nav"
            role="navigation"
            aria-label="Primary"
            sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                ...containerSx,
            }}
        >
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 1,
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

            <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 2, display: { xs: "none", md: "block" } }}
            />

            <Box
                sx={{
                    ml: "auto",
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 1,
                }}
            >
                {right.map((value, index) => (
                    <Button
                        key={value.href ?? `right-${index}`}
                        color="primary"
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
