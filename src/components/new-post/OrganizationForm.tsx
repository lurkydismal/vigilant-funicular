"use client";

import { TextField, FormLabel, Grid, CircularProgress } from "@mui/material";
import { useTransition, useId, useState } from "react";
import { FormGrid } from "./types";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import AutocompleteWithHighlight from "@/components/Autocomplete";

export default function OrganizationForm() {
    const categoryId = useId();
    const [categories, setCategories] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    const handleOpen = () => {
        setOpen(true);

        if (!categories) {
            startTransition(async () => {
                const _categories = await getAllCategories(requestAllCategories());

                setCategories(_categories.map((item) => item.name));
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={categoryId}>Category</FormLabel>

                <AutocompleteWithHighlight
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    loading={pending}
                    options={categories}
                    renderInput={(params) => (
                        <TextField
                            {...params}

                            placeholder="Category"
                            slotProps={{
                                input: {
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {pending ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            </FormGrid>
        </Grid>
    );
}
