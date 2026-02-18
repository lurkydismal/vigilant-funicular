import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Container } from "@mui/material";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 11,
                    marginBottom: 4,
                    gap: 4,
                }}
            >
                {children}
            </Container>

            <Footer />
        </>
    );
}
