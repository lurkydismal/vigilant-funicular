"use client";

import WriteForm from "./WriteForm";
import SettionsForm from "./SettingsForm";
import { Activity, startTransition, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FinalStep from "./FinalStep";
import MobileStepper from "./MobileStepper";
import { Step as StepType } from "./types";
import DesktopStepper from "./DesktopStepper";
import { createPost } from "@/lib/post";
import { postNewSchema } from "@/utils/validate/schemas";
import log from "@/utils/stdlog";
import { useSnackbar } from "@/providers/snackbar";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext } from "react";
import { Control } from "react-hook-form";

type FormValues = z.infer<typeof postNewSchema>;

const FormContext = createContext<{
    control: Control<FormValues>;
} | null>(null);

export function _useForm() {
    const ctx = useContext(FormContext);

    if (!ctx) {
        throw new Error("_useForm must be used within FormContext");
    }

    return ctx;
}

export default function MainContent() {
    const formRef = useRef<HTMLFormElement | null>(null);
    const { showError } = useSnackbar();
    const {
        control,
        handleSubmit,
    } = useForm<FormValues>({
        resolver: zodResolver(postNewSchema),
        defaultValues: {
            // Write form
            title: "",
            description: "",
            content: "",
            "reading-time": 1,

            // Settings form
            visibility: 'public',
            "content-warning": false,
            category: "",
            publish: 'now',
            "co-author": "",
            "attribution-note": "",
        },
    });
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

    const handleReset = () => {
        setActiveStep(0);
        setCompletedSteps([]);
        setCompleted(false);
    };

    const addCompletedStep = async (index: number) => {
        try {
            await handleSubmit((data) => data)(); // validate without submitting

            setCompletedSteps((prev) => [...prev, index]);
        } catch {
            // validation failed, RHF already shows errors
        }
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

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const parsed = postNewSchema.parse(data);

            log.debug(`Post create: ${JSON.stringify(parsed)}`);

            startTransition(async () => {
                await createPost(data);

                setCompleted(true);
                setActiveStep(steps.length);
            });
        } catch (err) {
            showError(err);
        }

    };

    useEffect(() => {
        const allCompleted = completedSteps.length === steps.length;
        const form = formRef.current;

        if (allCompleted && form) {
            form.submit();
        }
    }, [completedSteps, steps, steps, setActiveStep]);

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

                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <FormContext.Provider
                        value={{
                            control,
                        }}
                    >
                        {/* Current step content */}
                        {steps.map((item, index) => (
                            <Activity
                                key={`${item.title}-${index}`}
                                mode={index === activeStep ? "visible" : "hidden"}
                            >
                                {item.item}
                            </Activity>
                        ))}
                    </FormContext.Provider>
                </form>

                <Activity mode={completed ? "visible" : "hidden"}>
                    <FinalStep onReset={handleReset} />
                </Activity>
            </Box>
        </Box>
    );
}
