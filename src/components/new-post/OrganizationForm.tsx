import {
    TextField,
    FormLabel,
    Grid,
    Autocomplete,
} from "@mui/material";
import { useId } from "react";
import { FormGrid } from "./types";

export default function SettingsForm() {
    const categoryId = useId();

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={categoryId}>
                    Category
                </FormLabel>

                <Autocomplete
                    disablePortal
                    options={[]}
                    renderInput={(params) => <TextField placeholder="Category" {...params} />}
                />
            </FormGrid>
        </Grid>
    );
}
