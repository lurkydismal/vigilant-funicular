"use client";

import { CreditCardRounded } from "@mui/icons-material";
import { Stack, Box, Card, OutlinedInput, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProps } from "./types";

export default function ContentForm({ moveNext }: FormProps) {
    const [value, setValue] = useState("");

    // Detect when the form is complete
    const isFormValid = value.replace(/\s/g, "").length === 16;

    // Automatically move to the next step when valid
    useEffect(() => {
        if (isFormValid) {
            moveNext();
        }
    }, [isFormValid, moveNext]);

    return (
        <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Card>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "space-between",
                            width: "100%",
                            flexGrow: 1,
                        }}
                    >
                        <OutlinedInput
                            onChange={(event: { target: { value: string } }) => setValue(event.target.value)}
                            placeholder="Image"
                            size="small"
                            value={value}
                            endAdornment={
                                <InputAdornment position="start">
                                    <CreditCardRounded />
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Card>
            </Box>
        </Stack>
    );
}
