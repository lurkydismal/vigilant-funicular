"use client";

import MarkdownEditor from "./MarkdownEditor";
import {
    Stack,
    Box,
    Card,
    OutlinedInput,
    TextField,
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid,
    List,
    ListItem,
    ListItemText,
    RadioGroup,
    Radio,
} from "@mui/material";
import { useEffect, useId, useState } from "react";
import log from "@/utils/stdlog";
import MarkdownPreview from "./MarkdownPreview";
import Markdown from "../Markdown";
import { formatReadingTime } from "@/utils/stdfunc";
import { FormGrid } from "./types";

export default function SettingsForm() {
    const titleId = useId();
    const descId = useId();

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel htmlFor={titleId} required>
                    Title
                </FormLabel>

                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                    />
                    <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                    />
                    <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                    />
                </RadioGroup>
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
                <List disablePadding>
                    <ListItem>
                        <ListItemText
                            primary="Reading time"
                            secondary={formatReadingTime(159)}
                        />

                        <ListItemText primary="Word count" secondary={159} />
                    </ListItem>
                </List>
            </Grid>

            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </FormGrid>
        </Grid>
    );
}
