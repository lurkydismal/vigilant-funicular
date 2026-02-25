import MainContent from "@/components/new-post/MainContent";
import { Container } from "@mui/material";

export default function NewPost() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: "4%",
            }}
        >
            <MainContent />
        </Container>
    );
}
