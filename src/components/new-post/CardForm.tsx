import { TextField, FormLabel, Grid, OutlinedInput } from "@mui/material";
import { FormGrid } from "./types";

export default function CardForm() {
    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel htmlFor="title">Category</FormLabel>

                <OutlinedInput
                    autoComplete="title"
                    name="title"
                    placeholder="Title"
                    required
                    size="small"
                    type="title"
                />
            </FormGrid>
        </Grid>
    );
}
