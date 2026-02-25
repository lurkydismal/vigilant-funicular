"use client";

import {
    styled,
    Grid,
    FormLabel,
    OutlinedInput,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { FormProps } from "./types";
import { useState, useEffect } from "react";
import log from "@/utils/stdlog";

const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
}));

export default function InfoForm({ moveNext }: FormProps) {
    // State for all required fields
    const [formValues, setFormValues] = useState({
        firstName: "",
    });

    // Update state on input change
    const handleChange =
        (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
            log.debug({ formValues });
        };

    // Check if all required fields are filled
    const isFormValid = Object.values(formValues).every(
        (val) => val.trim() !== "",
    );

    // Auto-move to next step when valid
    useEffect(() => {
        log.debug({ isFormValid });
        if (isFormValid) {
            moveNext();
        }
    }, [isFormValid, moveNext]);

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
                    onChange={handleChange("firstName")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="saveAddress" value="yes" />}
                    label="Use this address for payment details"
                />
            </FormGrid>
        </Grid>
    );
}
