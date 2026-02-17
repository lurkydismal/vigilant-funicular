import { NavItem } from "@/data/navbat";
import NextLink from "@/components/Link";
import { Box, Button, Divider, SxProps } from "@mui/material";
import { usePathname } from "next/navigation";

const navButtonSx = {
    px: 2.5,
    borderRadius: 2,
    textTransform: "none",
    fontWeight: 600,
    position: "relative",
    transition: "all 0.2s ease",

    "&::after": {
        content: '""',
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 6,
        height: 2,
        backgroundColor: "primary.main",
        transform: "scaleX(0)",
        transition: "transform 0.2s ease",
    },

    "&:hover": {
        backgroundColor: "action.hover",
        transform: "translateY(-2px)",
    },

    "&:hover::after": {
        transform: "scaleX(1)",
    },

    "&:focus-visible": {
        outline: "2px solid",
        outlineColor: "primary.main",
        outlineOffset: 2,
    }
};

const activeButtonSx = {
    backgroundColor: "primary.main",
    color: "primary.contrastText",
    fontWeight: 700,

    "&::after": {
        display: "none",
    },

    "&:hover": {
        backgroundColor: "primary.dark",
        transform: "translateY(-2px)",
    },
};

function NavButton({ item, isActive }: { item: NavItem; isActive: boolean }) {
    return (
        <Button
            component={NextLink}
            href={item.href}
            size="small"
            sx={{
                ...navButtonSx,
                ...(isActive && activeButtonSx),
            }}
        >
            {item.name}
        </Button>
    );
}

export default function DesktopNav({
    items,
    containerSx,
}: {
    items: NavItem[];
    containerSx?: SxProps;
}) {
    const pathname = usePathname();

    const { left, right } = items.reduce(
        (acc, item) => {
            acc[item.position].push(item);
            return acc;
        },
        { left: [] as NavItem[], right: [] as NavItem[] },
    );

    const isActive = (href?: string) =>
        !!(href && (pathname === href || pathname.startsWith(href + "/")));

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
                {left.map((value) => (
                    <NavButton
                        key={value.href}
                        item={value}
                        isActive={isActive(value.href)}
                    />
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
                {right.map((value) => (
                    <NavButton
                        key={value.href}
                        item={value}
                        isActive={isActive(value.href)}
                    />
                ))}
            </Box>
        </Box>
    );
}
