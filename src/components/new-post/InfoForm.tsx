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
        lastName: "",
        address1: "",
        city: "",
        state: "",
        zip: "",
        country: "",
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

            <FormGrid size={{ xs: 12, md: 6 }}>
                <FormLabel htmlFor="last-name" required>
                    Last name
                </FormLabel>

                <OutlinedInput
                    autoComplete="last name"
                    name="last-name"
                    placeholder="Snow"
                    required
                    size="small"
                    type="last-name"
                    onChange={handleChange("lastName")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address1" required>
                    Address line 1
                </FormLabel>

                <OutlinedInput
                    autoComplete="shipping address-line1"
                    name="address1"
                    placeholder="Street name and number"
                    required
                    size="small"
                    type="address1"
                    onChange={handleChange("address1")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormLabel htmlFor="address2">Address line 2</FormLabel>

                <OutlinedInput
                    autoComplete="shipping address-line2"
                    name="address2"
                    placeholder="Apartment, suite, unit, etc. (optional)"
                    required
                    size="small"
                    type="address2"
                    onChange={handleChange("address2")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="city" required>
                    City
                </FormLabel>

                <OutlinedInput
                    autoComplete="City"
                    name="city"
                    placeholder="New York"
                    required
                    size="small"
                    type="city"
                    onChange={handleChange("city")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="state" required>
                    State
                </FormLabel>

                <OutlinedInput
                    autoComplete="State"
                    name="state"
                    placeholder="NY"
                    required
                    size="small"
                    type="state"
                    onChange={handleChange("state")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="zip" required>
                    Zip / Postal code
                </FormLabel>

                <OutlinedInput
                    autoComplete="shipping postal-code"
                    name="zip"
                    placeholder="12345"
                    required
                    size="small"
                    type="zip"
                    onChange={handleChange("zip")}
                />
            </FormGrid>

            <FormGrid size={{ xs: 6 }}>
                <FormLabel htmlFor="country" required>
                    Country
                </FormLabel>

                <OutlinedInput
                    autoComplete="shipping country"
                    name="country"
                    placeholder="United States"
                    required
                    size="small"
                    type="country"
                    onChange={handleChange("country")}
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
