import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/new-post/MainContent";
import { Container } from "@mui/material";

export default function NewPost() {
    return (
        <>
            <NavBar />

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // center horizontally
                    justifyContent: "flex-start",
                    mt: 16,
                    marginBottom: 5,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 3, sm: 6 },
                    gap: 4,
                }}
            >
                <MainContent />
            </Container>

            <Footer />
        </>
    );
}
