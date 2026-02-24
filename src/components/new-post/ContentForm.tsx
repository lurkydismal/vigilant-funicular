"use client";

import { CreditCardRounded } from "@mui/icons-material";
import { Stack, Box, Card, OutlinedInput, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProps } from "./types";
import log from "@/utils/stdlog";

export default function ContentForm({ moveNext }: FormProps) {
    const [value, setValue] = useState<string>("");

    // Detect when the form is complete
    const isFormValid = Boolean(value);

    // Automatically move to the next step when valid
    useEffect(() => {
        log.debug({ isFormValid });
        if (isFormValid) {
            moveNext();
        }
    }, [isFormValid, moveNext, value]);

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
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setValue(event.target.value);
                                log.debug({ value });
                            }}
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
