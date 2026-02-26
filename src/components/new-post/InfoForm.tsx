"use client";

import {
    styled,
    Grid,
    FormLabel,
    OutlinedInput,
    Card,
    Box,
} from "@mui/material";
import { FormProps } from "./types";
import { useId, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import Markdown from "../Markdown";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));

export default function InfoForm({ moveNext }: FormProps) {
    const titleId = useId();
    const descId = useId();
    const [text, setText] = useState("");

    return (
        <>
            <Grid container spacing={2}>
                <FormGrid size={{ xs: 12, md: 12 }}>
                    <FormLabel htmlFor={titleId} required>
                        Title
                    </FormLabel>

                    <OutlinedInput
                        autoComplete="title"
                        name={titleId}
                        placeholder="Title"
                        required
                        size="small"
                        type="title"
                    />
                </FormGrid>

                <FormGrid size={{ xs: 12, md: 12 }}>
                    <FormLabel htmlFor={descId} required>
                        Description
                    </FormLabel>

                    <OutlinedInput
                        autoComplete="description"
                        name={descId}
                        placeholder="Description"
                        required
                        size="small"
                        type="description"
                    />
                </FormGrid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <Card>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '80vh',
                            }}
                        >
                            <MarkdownEditor value={text} onChange={setText} />
                            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                                <Markdown>{text}</Markdown>
                            </Box>
                        </Box>
                    </Card>

                </Grid>
            </Grid>
        </>
    );
}
