"use client";

import {
    styled,
    Grid,
    FormLabel,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
    Card,
    Box,
} from "@mui/material";
import { FormProps } from "./types";
import { useState, useEffect } from "react";
import log from "@/utils/stdlog";
import MarkdownEditor from "./MarkdownEditor";
import Markdown from "../Markdown";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));

export default function InfoForm({ moveNext }: FormProps) {
    const [text, setText] = useState("");

    return (
        <Grid container spacing={3}>
            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="first-name" required>
                    First name
                </FormLabel>

                <OutlinedInput
                    autoComplete="first name"
                    name="first-name"
                    placeholder="John"
                    required
                    size="small"
                    type="name"
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </FormGrid>

            <Card>
                <Box
                    sx={{
                        display: 'flex',
                        height: '100vh',
                    }}
                >
                    <MarkdownEditor value={text} onChange={setText} />
                    <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                        <Markdown>{text}</Markdown>
                    </Box>
                </Box>
            </Card>
        </Grid>
    );
}
