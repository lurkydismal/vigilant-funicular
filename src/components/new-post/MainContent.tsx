"use client";

import InfoForm from "./InfoForm";
import ContentForm from "./ContentForm";
import PreviewForm from "./PreviewForm";
import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import FinalStep from "./FinalStep";
import MobileStepper from "./MobileStepper";
import { Step as StepType } from "./types";
import DesktopStepper from "./DesktopStepper";
import log from "@/utils/stdlog";

export default function MainContent() {
    const [activeStep, setActiveStep] = useState(0);

    const moveNext = () => {
        log.debug(`Current: ${activeStep}`);
        setActiveStep(activeStep + 1);
    };

    const steps: StepType[] = useMemo(
        () => [
            {
                title: "Fill information",
                item: <InfoForm moveNext={moveNext} />,
            },
            {
                title: "Write content",
                item: <ContentForm moveNext={moveNext} />,
            },
            {
                title: "Preview your content",
                item: <PreviewForm moveNext={moveNext} />,
            },
        ],
        [],
    );

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
            <DesktopStepper
                activeStep={activeStep}
                steps={steps}
                setActiveStep={setActiveStep}
            />

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
                <MobileStepper
                    activeStep={activeStep}
                    steps={steps}
                    setActiveStep={setActiveStep}
                />

                {/* Current step content */}
                {activeStep === steps.length ? (
                    <FinalStep />
                ) : (
                    steps[activeStep].item
                )}
            </Box>
        </Box>
    );
}
