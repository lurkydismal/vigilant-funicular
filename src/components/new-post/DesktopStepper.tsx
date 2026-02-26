"use client";

import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { stepSx, Step as StepType } from "./types";
import { Dispatch, SetStateAction } from "react";

export default function DesktopStepper({
    activeStep,
    steps,
    setActiveStep,
}: {
    activeStep: number;
    steps: StepType[];
    setActiveStep: Dispatch<SetStateAction<number>>;
}) {
    return (
        <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
            <Stepper nonLinear activeStep={activeStep} sx={{ px: 0 }}>
                {steps.map((step, index) => {
                    return (
                        <Step
                            key={step.title}
                        >
                            <StepLabel
                                sx={stepSx}
                                onClick={() => setActiveStep(index)}
                            >
                                {step.title}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}
