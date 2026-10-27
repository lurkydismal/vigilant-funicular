import { Container } from "@mui/material";

import MainContent from "@/components/new-post/MainContent";

export default function NewPost() {
    return (
        <Container
            maxWidth="xl"
            sx={{
                pt: "1%",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <MainContent />
        </Container>
    );
}
