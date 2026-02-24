import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { Step as StepType } from "./types";
import { linkSx } from "@/data/styles";
import log from "@/utils/stdlog";
import { Dispatch, SetStateAction } from "react";

const stepSx = {
    ...linkSx,

    px: 1,
    py: 0.75,
    "&::after": {
        transformOrigin: "left",
        bottom: 2,
    },
    "&:hover": {
        backgroundColor: "action.hover",
        transform: "translateY(-2px)",
    },
    "&:active": {
        transform: "translateY(0px)",
    },
};

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
            <Stepper activeStep={activeStep} sx={{ px: 0 }}>
                {steps.map((step, index) => {
                    const isActive = activeStep >= index;

                    return (
                        <Step
                            key={step.title}
                        >
                            <StepLabel
                                onClick={isActive ? () => setActiveStep(index) : undefined}
                                sx={isActive ? stepSx : undefined}
                            >{step.title}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
}
