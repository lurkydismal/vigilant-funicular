"use client";

import {
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    Radio,
    Divider,
    TextField,
    CircularProgress,
    OutlinedInput,
} from "@mui/material";
import { useId, useState, useTransition } from "react";
import { toPascalCase } from "@/utils/stdfunc";
import { FormGrid } from "./types";
import { getAllCategories, requestAllCategories } from "@/lib/category";
import AutocompleteWithHighlight from "@/components/Autocomplete";
import ImageInput from "./ImageInput";
import log from "@/utils/stdlog";

export default function SettingsForm() {
    // Visibility
    const visibilityId = useId();
    const visibilityOptions = ["public", "followers", "unlisted", "private"];

    // Organization
    const categoryId = useId();
    const [categories, setCategories] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();

    const handleOpen = () => {
        setOpen(true);

        if (!categories) {
            startTransition(async () => {
                const _categories = await getAllCategories(
                    requestAllCategories(),
                );

                setCategories(_categories.map((item) => item.name));

                log.debug(`Categories: ${categories}`);
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Publish
    const publishId = useId();
    const publishOptions = ["now", "scheduled", "draft"];

    // Collaboration
    const coAuthorId = useId();
    const attributionNoteId = useId();

    return (
        <Grid container spacing={2}>
            {/* Visibility */}
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={visibilityId}>Visibility</FormLabel>

                <RadioGroup
                    row
                    aria-labelledby={visibilityId}
                    defaultValue="public"
                    name="visibility"
                >
                    {visibilityOptions.map((item) => (
                        <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={toPascalCase(item)}
                        />
                    ))}
                </RadioGroup>
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="contentWarning" value="off" />}
                    label="Content warning"
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            {/* Organization */}
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
                                            {pending ? (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                        />
                    )}
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            {/* Preview */}
            <FormGrid size={{ xs: 12, md: 12 }}>
                <ImageInput />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            {/* Publish */}
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={publishId}>
                    Publish
                </FormLabel>

                <RadioGroup
                    row
                    aria-labelledby={publishId}
                    defaultValue="now"
                    name="publish"
                >
                    {publishOptions.map((item) => (
                        <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={toPascalCase(item)}
                        />
                    ))}
                </RadioGroup>
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            {/* Collaboration */}
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={coAuthorId}>
                    Co-author
                </FormLabel>

                <OutlinedInput
                    autoComplete="coAuthor"
                    name="coAuthor"
                    placeholder="Co-author"
                    required
                    size="small"
                />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={attributionNoteId}>
                    Attribution note
                </FormLabel>

                <OutlinedInput
                    autoComplete="attributionNote"
                    name="attributionNote"
                    placeholder="Originally published on..."
                    required
                    size="small"
                />
            </FormGrid>
        </Grid>
    );
}
