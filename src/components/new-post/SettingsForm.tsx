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
import { getAllUsers, requestAllUsers } from "@/lib/user";
import { getUser } from "@/utils/stduser";
import { Controller } from "react-hook-form";
import { _useForm } from "./MainContent";

function VisibilityForm() {
    const { control } = _useForm();

    const visibilityId = useId();
    const visibilityOptions = ["public", "unlisted", "private"];

    return (
        <>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={visibilityId}>Visibility</FormLabel>

                <Controller
                    name="visibility"
                    control={control}
                    rules={{ required: "Visibility is required" }}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            row
                            aria-labelledby={visibilityId}
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
                    )}
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Controller
                    name="content-warning"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            {...field}
                            control={<Checkbox value="off" />}
                            label="Content warning"
                        />
                    )}
                />
            </FormGrid>
        </>
    );
}

function OrganizationForm() {
    const { control } = _useForm();

    const categoryId = useId();
    const [categories, setCategories] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const [categoryValue, setCategoryValue] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);

        if (!categories.length) {
            startTransition(async () => {
                const _categories = await getAllCategories(
                    requestAllCategories(),
                );

                setCategories(_categories.map((item) => item.name));
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <FormGrid size={{ xs: 12, md: 12 }}>
            <FormLabel id={categoryId} required>Category</FormLabel>

            <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState }) => (
                    <>
                        <AutocompleteWithHighlight
                            value={categoryValue}
                            onChange={(_, newVal) => setCategoryValue(newVal)}
                            open={open}
                            onOpen={handleOpen}
                            onClose={handleClose}
                            loading={pending}
                            options={categories}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    {...field}
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
                                    error={!!fieldState.error}
                                />
                            )}
                        />

                        <input
                            {...field}
                            type="hidden"
                            value={categoryValue ?? ""}
                        />
                    </>
                )}
            />
        </FormGrid>
    );
}

// function PreviewForm() {
//     return (
//         <FormGrid size={{ xs: 12, md: 12 }}>
//             <ImageInput />
//         </FormGrid>
//     );
// }

// TODO: Time selection
function PublishForm() {
    const { control } = _useForm();

    const publishId = useId();
    const publishOptions = ["now", "scheduled"];

    return (
        <FormGrid size={{ xs: 12, md: 12 }}>
            <FormLabel id={publishId}>Publish</FormLabel>

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
    );
}

function CollaborationForm() {
    const { control } = _useForm();

    const user = getUser();
    const coAuthorId = useId();
    const attributionNoteId = useId();
    const [cuAuthors, setCoAuthorss] = useState<readonly string[]>([]);
    const [open, setOpen] = useState(false);
    const [pending, startTransition] = useTransition();
    const [coAuthorValue, setCoAuthorValue] = useState<string | null>(null);

    const handleOpen = () => {
        setOpen(true);

        if (!cuAuthors.length) {
            startTransition(async () => {
                const _coAuthors = await getAllUsers(requestAllUsers());

                setCoAuthorss(
                    _coAuthors
                        .map((item) => item.username)
                        .filter((username) => username !== user?.username),
                );
            });
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={coAuthorId}>Co-author</FormLabel>

                <AutocompleteWithHighlight
                    value={coAuthorValue}
                    onChange={(_, newVal) => setCoAuthorValue(newVal)}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    loading={pending}
                    options={cuAuthors}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Co-author"
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

                <input type="hidden" name="co-author" value={coAuthorValue ?? ""} required />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={attributionNoteId}>Attribution note</FormLabel>

                <OutlinedInput
                    autoComplete="attribution-note"
                    name="attribution-note"
                    placeholder="Originally published on..."
                    size="small"
                />
            </FormGrid>
        </>
    );
}

export default function SettingsForm() {
    return (
        <Grid container spacing={2}>
            <VisibilityForm />

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            <OrganizationForm />

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            {/*
            <PreviewForm />

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>
            */}

            <PublishForm />

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            <CollaborationForm />
        </Grid>
    );
}
