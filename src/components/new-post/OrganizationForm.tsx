import { TextField, FormLabel, Grid } from "@mui/material";
import { useId } from "react";
import { FormGrid } from "./types";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import AutocompleteWithHighlight from "../Autocomplete";

export default async function OrganizationForm() {
    const categoryId = useId();

    const _categories = await getAllCategories(requestAllCategories());
    const categories = _categories.map((item) => item.name);

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={categoryId}>Category</FormLabel>

                <AutocompleteWithHighlight
                    options={categories}
                    renderInput={(params) => (
                        <TextField placeholder="Category" {...params} />
                    )}
                />
            </FormGrid>
        </Grid>
    );
}
