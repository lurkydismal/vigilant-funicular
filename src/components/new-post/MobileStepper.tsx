"use client";

import { Step, StepLabel, Stepper } from "@mui/material";
import { Step as StepType } from "./types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function MobileStepper({
    activeStep,
    steps,
    setActiveStep,
}: {
    activeStep: number;
    steps: StepType[];
    setActiveStep: Dispatch<SetStateAction<number>>;
}) {
    const [maxVisitedStep, setMaxVisitedStep] = useState(activeStep);

    useEffect(() => {
        if (activeStep > maxVisitedStep) {
            setMaxVisitedStep(activeStep);
        }
    }, [activeStep, maxVisitedStep]);

    return (
        <Stepper
            activeStep={maxVisitedStep}
            alternativeLabel
            sx={{ display: { sm: "flex", md: "none" } }}
        >
            {steps.map((step, index) => {
                const isActive = activeStep >= index;

                return (
                    <Step key={step.title}>
                        <StepLabel
                            onClick={
                                isActive
                                    ? () => setActiveStep(index)
                                    : undefined
                            }
                            sx={{
                                ".MuiStepLabel-labelContainer": {
                                    maxWidth: "70px",
                                },
                            }}
                        >
                            {step.title}
                        </StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    );
}
