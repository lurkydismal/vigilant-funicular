import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Copyright } from "./Copyright";
import { Link } from "@/components/Link";
import { githubUrl } from "@/utils/stdvar";
import { Divider } from "@mui/material";

export default function Footer() {
    return (
        <>
            <Divider />

            <Container
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    py: { xs: 1, sm: 2 },
                    textAlign: { sm: "center", md: "left" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    {/* LEFT SIDE */}
                    <Stack spacing={0.5}>
                        {/* Row 1 */}
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Link
                                color="text.secondary"
                                variant="body2"
                                href="/privacy"
                            >
                                Privacy Policy
                            </Link>

                            <Typography sx={{ opacity: 0.5 }}>•</Typography>

                            <Link
                                color="text.secondary"
                                variant="body2"
                                href="/terms"
                            >
                                Terms of Service
                            </Link>
                        </Stack>

                        {/* Row 2 */}
                        <Copyright />
                    </Stack>

                    {/* RIGHT SIDE */}
                    <IconButton
                        aria-label="GitHub"
                        href={githubUrl}
                        size="small"
                        sx={{
                            border: "1px solid white",
                            borderRadius: 1,
                            color: "white",

                            transition:
                                "border-color 200ms ease, background-color 200ms ease",

                            "&:hover": {
                                borderColor: "gray",
                            },
                        }}
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Container>
        </>
    );
}
