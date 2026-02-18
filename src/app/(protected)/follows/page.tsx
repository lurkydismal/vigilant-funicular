import MainContent from "@/components/follows/MainContent";
import { Container } from "@mui/material";

export default function Follows() {
    return (
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
    );
}
