import { Step, StepLabel, Stepper } from "@mui/material";
import { Step as StepType } from "./types";

export default function MobileStepper({
    activeStep,
    steps,
}: {
    activeStep: number;
    steps: StepType[];
}) {
    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ display: { sm: "flex", md: "none" } }}
        >
            {steps.map((step) => {
                return (
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
                );
            })}
        </Stepper>
    );
}
