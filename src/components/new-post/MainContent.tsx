"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Activity, useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, Path, SubmitHandler, useForm } from "react-hook-form";

import { createPost } from "@/lib/post";
import { useSnackbar } from "@/providers/snackbar";
import { postNewSchema } from "@/utils/validate/schemas";

import DesktopStepper from "./DesktopStepper";
import FinalStep from "./FinalStep";
import MobileStepper from "./MobileStepper";
import SettionsForm from "./SettingsForm";
import { FormValues, Step as StepType } from "./types";
import WriteForm from "./WriteForm";

const DRAFT_KEY = "post-new-draft";

const DEFAULT_VALUES: FormValues = {
    // Write form
    title: "",
    description: "",
    content: "",
    "reading-time": 0,

    // Settings form
    visibility: "public",
    "content-warning": false,
    category: "",
    publish: "now",
    "co-author": "",
    "attribution-note": "",
};

export default function MainContent() {
    const { showError } = useSnackbar();
    const methods = useForm<FormValues>({
        resolver: zodResolver(postNewSchema),
        defaultValues: DEFAULT_VALUES,
    });
    const { reset, subscribe } = methods;
    const [activeStep, setActiveStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [completed, setCompleted] = useState(false);

    const steps: StepType[] = useMemo(
        () => [
            {
                title: "Write",
                fields: ["title", "description", "content"],
                item: <WriteForm />,
            },
            {
                title: "Settings",
                fields: [
                    "visibility",
                    "content-warning",
                    "category",
                    "publish",
                    "co-author",
                    "attribution-note",
                ],
                item: <SettionsForm />,
            },
        ],
        [],
    );

    const validateStep = async (fields: Path<FormValues>[]) => {
        const valid = await methods.trigger(fields);

        // show visual feedback for all fields in this step
        fields.forEach((f) => {
            const error = methods.getFieldState(f).error;
            if (error) showError(`${error.message}`);
        });

        return valid;
    };

    const handleReset = () => {
        reset(DEFAULT_VALUES);
        localStorage.removeItem(DRAFT_KEY);

        setActiveStep(0);
        setCompletedSteps([]);
        setCompleted(false);
    };

    const addCompletedStep = async (index: number) => {
        try {
            const isValid = await validateStep(steps[index].fields); // validate without submitting

            if (isValid) setCompletedSteps((prev) => [...prev, index]);
        } catch {
            // validation failed, RHF already shows errors
        }
    };

    const removeCompletedStep = (value: number) => {
        setCompletedSteps(completedSteps.filter((n) => n !== value));
    };

    const handleClick = (index: number, isActive: boolean, isCompleted: boolean) => {
        if (!isActive) {
            setActiveStep(index);
        } else {
            if (!isCompleted) addCompletedStep(index);
            else removeCompletedStep(index);
        }
    };

    const onSubmit: SubmitHandler<FormValues> = useCallback<SubmitHandler<FormValues>>(
        async (data) => {
            try {
                postNewSchema.parse(data);

                await createPost(data);

                // Reset form and delete saved draft
                reset(DEFAULT_VALUES);
                localStorage.removeItem(DRAFT_KEY);

                setCompleted(true);
                setActiveStep(steps.length);
            } catch (err) {
                showError(err);
            }
        },
        [reset, showError, steps.length],
    );

    useEffect(() => {
        const allCompleted = completedSteps.length === steps.length;

        if (allCompleted) methods.handleSubmit(onSubmit)();
    }, [completedSteps, steps, methods.handleSubmit, onSubmit]);

    const [draftReady, setDraftReady] = useState(false);

    // Restore draft from localStorage
    useEffect(() => {
        try {
            const savedDraft = localStorage.getItem(DRAFT_KEY);

            if (savedDraft) {
                const parsed: unknown = JSON.parse(savedDraft);

                if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
                    reset({
                        ...DEFAULT_VALUES,
                        ...(parsed as Partial<FormValues>),
                    });
                }
            }
        } catch (error) {
            console.error("Failed to restore draft:", error);
            localStorage.removeItem(DRAFT_KEY);
        } finally {
            setDraftReady(true);
        }
    }, [reset]);

    // Automatically save form changes
    useEffect(() => {
        if (!draftReady) return;

        return subscribe({
            formState: {
                values: true,
            },
            callback: ({ values }) => {
                localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
            },
        });
    }, [draftReady, subscribe]);

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
                    maxHeight: "calc(100dvh - var(--template-frame-height, 0px) - 220px)", // optional safeguard
                }}
            >
                <MobileStepper
                    activeStep={activeStep}
                    completedSteps={completedSteps}
                    steps={steps}
                    completed={completed}
                    onClick={handleClick}
                />

                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormProvider {...methods}>
                        {/* Current step content */}
                        {steps.map((item, index) => (
                            <Activity
                                key={`${item.title}-${index}`}
                                mode={index === activeStep ? "visible" : "hidden"}
                            >
                                {item.item}
                            </Activity>
                        ))}
                    </FormProvider>
                </form>

                <Activity mode={completed ? "visible" : "hidden"}>
                    <FinalStep onReset={handleReset} />
                </Activity>
            </Box>
        </Box>
    );
}
