import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/profile/MainContent";
import { Container } from "@mui/material";

export default async function Page() {
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
                <MainContent />
            </Container>

            <Footer />
        </>
    );
}
