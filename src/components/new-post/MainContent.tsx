"use client";

import WriteForm from "./WriteForm";
import SettionsForm from "./SettingsForm";
import { Activity, useEffect, useState } from "react";
import { Box } from "@mui/material";
import FinalStep from "./FinalStep";
import MobileStepper from "./MobileStepper";
import { Step as StepType } from "./types";
import DesktopStepper from "./DesktopStepper";

export default function MainContent() {
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [completed, setCompleted] = useState(false);

    const steps: StepType[] = [
        {
            title: "Write",
            item: <WriteForm />,
        },
        {
            title: "Settings",
            item: <SettionsForm />,
        },
    ];

    const handleReset = () => {};

    const addCompletedStep = (index: number) => {
        setCompletedSteps((prev) => [...prev, index]);
    };

    const removeCompletedStep = (value: number) => {
        setCompletedSteps(completedSteps.filter((n) => n !== value));
    };

    const handleClick = (
        index: number,
        isActive: boolean,
        isCompleted: boolean,
    ) => {
        if (!isActive) {
            setActiveStep(index);
        } else {
            if (!isCompleted) addCompletedStep(index);
            else removeCompletedStep(index);
        }
    };

    useEffect(() => {
        const allCompleted = completedSteps.length === steps.length;

        if (allCompleted) {
            setActiveStep(steps.length);

            setCompleted(true);

            handleReset();
        }
    }, [completedSteps, steps, activeStep, setActiveStep]);

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
                completedSteps={completedSteps}
                steps={steps}
                completed={completed}
                onClick={handleClick}
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
                    completedSteps={completedSteps}
                    steps={steps}
                    completed={completed}
                    onClick={handleClick}
                />

                {/* Current step content */}
                {steps.map((item, index) => (
                    <Activity
                        key={`${item.title}-${index}`}
                        mode={index === activeStep ? "visible" : "hidden"}
                    >
                        {item.item}
                    </Activity>
                ))}

                <Activity mode={completed ? "visible" : "hidden"}>
                    <FinalStep />
                </Activity>
            </Box>
        </Box>
    );
}
