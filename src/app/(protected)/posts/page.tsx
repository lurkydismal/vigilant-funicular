import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Latest from "@/components/posts/Latest";
import MainContent from "@/components/posts/MainContent";
import { Container } from "@mui/material";

export default function Posts() {
    return (
        <>
            <NavBar />

            <Container
                component="main"
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 13,
                    marginBottom: 4,
                    gap: 4,
                }}
            >
                <MainContent />
                <Latest />
            </Container>

            <Footer />
        </>
    );
}
