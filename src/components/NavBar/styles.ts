export const navButtonSx = {
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
    },
};

export const activeButtonSx = {
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
