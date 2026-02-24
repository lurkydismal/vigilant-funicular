import { Step, StepLabel, Stepper } from "@mui/material";
import { Step as StepType } from "./types";
import { Dispatch, SetStateAction } from "react";

export default function MobileStepper({
    activeStep,
    steps,
    setActiveStep,
}: {
    activeStep: number;
    steps: StepType[];
    setActiveStep: Dispatch<SetStateAction<number>>;
}) {
    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ display: { sm: "flex", md: "none" } }}
        >
            {steps.map((step, index) => {
                const isActive = activeStep >= index;

                return (
                    <Step key={step.title}>
                        <StepLabel
                            onClick={isActive ? () => setActiveStep(index) : undefined}
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
