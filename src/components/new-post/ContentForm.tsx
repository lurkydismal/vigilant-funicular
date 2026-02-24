"use client";

import { CreditCardRounded } from "@mui/icons-material";
import { Stack, Box, Card, OutlinedInput, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function ContentForm() {
    const [cardNumber, setCardNumber] = useState("");

    const handleCardNumberChange = (event: { target: { value: string } }) => {
        const value = event.target.value.replace(/\D/g, "");
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

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
                            onChange={handleCardNumberChange}
                            placeholder="Image"
                            size="small"
                            value={cardNumber}
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
