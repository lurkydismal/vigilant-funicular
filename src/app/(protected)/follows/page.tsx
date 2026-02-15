import Container from "@mui/material/Container";
import Footer from "@/components//Footer";
import NavBar from "@/components//NavBar";
import MainContent from "@/components/follows/MainContent";

export default function Follows() {
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
            </Container>

            <Footer />
        </>
    );
}
