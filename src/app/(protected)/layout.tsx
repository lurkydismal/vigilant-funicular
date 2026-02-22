import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { getSessionData } from "@/lib/auth";
import { Box, Container } from "@mui/material";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getSessionData();

    if (!user) {
        // redirect to login if not authenticated
        redirect("/login");
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <NavBar />

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    mt: 11,
                    mb: 4,
                    gap: 4,
                }}
            >
                {children}
            </Container>

            <Footer />
        </Box>
    );
}
