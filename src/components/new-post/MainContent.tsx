"use client";

import AddressForm from "./AddressForm";
import PaymentForm from "./Attachments";
import Review from "./Review";
import { ReactElement, useState } from "react";
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Stack,
    Button,
} from "@mui/material";

interface Step {
    title: string;
    item: ReactElement;
}

const steps: Step[] = [
    { title: "Shipping address", item: <AddressForm /> },
    { title: "Payment details", item: <PaymentForm /> },
    { title: "Review your order", item: <Review /> },
];

export default function MainContent() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "100%",
                px: { xs: 0, sm: 2 },
            }}
        >
            {/* Header */}
            {/* Desktop stepper */}
            <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
                <Stepper activeStep={activeStep} sx={{ px: 0 }}>
                    {steps.map((step) => (
                        <Step key={step.title}>
                            <StepLabel>{step.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>

            {/* Main content area - grows and scrolls if necessary */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    flexGrow: 1,
                    minHeight: 0, // allow proper overflow within flex children
                    overflow: "auto",
                    maxHeight:
                        "calc(100dvh - var(--template-frame-height, 0px) - 220px)", // optional safeguard
                }}
            >
                {/* Mobile stepper */}
                <Stepper
                    activeStep={activeStep}
                    alternativeLabel
                    sx={{ display: { sm: "flex", md: "none" } }}
                >
                    {steps.map((step) => (
                        <Step key={step.title}>
                            <StepLabel
                                sx={{
                                    ".MuiStepLabel-labelContainer": {
                                        maxWidth: "70px",
                                    },
                                }}
                            >
                                {step.title}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Current step content */}
                {activeStep === steps.length ? (
                    <Stack spacing={2} useFlexGap>
                        <Typography variant="h1">📦</Typography>

                        <Typography variant="h5">
                            Thank you for your order!
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ color: "text.secondary" }}
                        >
                            Your order number is <strong>&nbsp;#140396</strong>.
                            We have emailed your order confirmation and will
                            update you once it{"'"}s shipped.
                        </Typography>

                        <Button variant="contained" sx={{ alignSelf: "start" }}>
                            Go to my orders
                        </Button>
                    </Stack>
                ) : (
                    <>{steps[activeStep].item}</>
                )}
            </Box>
        </Box>
    );
}
