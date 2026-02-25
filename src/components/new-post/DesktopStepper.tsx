import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { Step as StepType } from "./types";

export default function DesktopStepper({
    activeStep,
    steps,
}: {
    activeStep: number;
    steps: StepType[];
}) {
    return (
        <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
            <Stepper activeStep={activeStep} sx={{ px: 0 }}>
                {steps.map((step) => {
                    return (
                        <Step key={step.title}>
                            <StepLabel >
                                {step.title}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}
