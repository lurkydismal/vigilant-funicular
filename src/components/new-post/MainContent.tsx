"use client";

import WriteForm from "./WriteForm";
import OrganizationForm from "./OrganizationForm";
import SettionsForm from "./SettingsForm";
import PreviewForm from "./PreviewForm";
import { Activity, useState } from "react";
import { Box } from "@mui/material";
import FinalStep from "./FinalStep";
import MobileStepper from "./MobileStepper";
import { Step as StepType } from "./types";
import DesktopStepper from "./DesktopStepper";
import CardForm from "./CardForm";

export default function MainContent() {
    const [activeStep, setActiveStep] = useState(0);

    const steps: StepType[] = [
        {
            title: "Write",
            item: <WriteForm />,
        },
        {
            title: "Settings",
            item: <SettionsForm />,
        },
        {
            title: "Organization",
            item: <OrganizationForm />,
        },
        {
            title: "Card",
            item: <CardForm />,
        },
        {
            title: "Preview content",
            item: <PreviewForm />,
        },
    ];

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
                <MobileStepper activeStep={activeStep} steps={steps} />

                {/* Current step content */}
                {steps.map((item, index) => (
                    <Activity
                        key={`${item.title}-${index}`}
                        mode={index === activeStep ? "visible" : "hidden"}
                    >
                        {item.item}
                    </Activity>
                ))}

                <Activity
                    mode={activeStep === steps.length ? "visible" : "hidden"}
                >
                    <FinalStep />
                </Activity>
            </Box>
        </Box>
    );
}
