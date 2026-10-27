import { Container } from "@mui/material";

import FeaturesClient from "./FeaturesClient";
import Title from "./Title";

export default function Features() {
    return (
        <Container sx={{ py: { xs: 8, sm: 16 } }}>
            <Title />

            <FeaturesClient initialIndex={0} />
        </Container>
    );
}
