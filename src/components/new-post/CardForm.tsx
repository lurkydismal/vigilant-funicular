import { FormLabel, Grid } from "@mui/material";
import { FormGrid } from "./types";
import ImageInput from "./ImageInput";

export default function CardForm() {
    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <ImageInput />
                {/*
                <OutlinedInput
                    autoComplete="title"
                    name="title"
                    placeholder="Title"
                    required
                    size="small"
                    type="title"
                />
                */}
            </FormGrid>
        </Grid>
    );
}
