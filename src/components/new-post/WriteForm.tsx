"use client";

import {
    Grid,
    FormLabel,
    OutlinedInput,
    Card,
    Box,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useRef, useState } from "react";
import MarkdownEditor from "./MarkdownEditor";
import Markdown from "../Markdown";
import { useWordStats } from "@/utils/stdhook";
import { formatReadingTime } from "@/utils/stdfunc";
import { FormGrid } from "./types";

export default function WriteForm() {
    const [text, setText] = useState("");
    const { wordCount, readingTime } = useWordStats(text);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [leftWidth, setLeftWidth] = useState(50); // percentage

    const handleMouseDown = () => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;

            if (newLeftWidth > 10 && newLeftWidth < 90) {
                setLeftWidth(newLeftWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel htmlFor="title" required>
                    Title
                </FormLabel>

                <OutlinedInput
                    autoComplete="title"
                    name="title"
                    placeholder="Title"
                    required
                    size="small"
                />
            </FormGrid>

            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel htmlFor="description">Description</FormLabel>

                <OutlinedInput
                    autoComplete="description"
                    name="description"
                    placeholder="Description"
                    required
                    size="small"
                />
            </FormGrid>

            <Grid size={{ xs: 12, md: 12 }}>
                <Card>
                    <Box
                        ref={containerRef}
                        sx={{
                            display: "flex",
                            height: "80vh",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* LEFT SIDE */}
                        <Box
                            sx={{
                                width: `${leftWidth}%`,
                                overflow: "auto",
                                display: "flex",
                            }}
                        >
                            <MarkdownEditor value={text} onChange={setText} />
                        </Box>

                        {/* DRAG HANDLE */}
                        <Box
                            onMouseDown={handleMouseDown}
                            sx={{
                                width: "6px",
                                cursor: "col-resize",
                                backgroundColor: "divider",
                                "&:hover": {
                                    backgroundColor: "primary.main",
                                },
                            }}
                        />

                        {/* RIGHT SIDE */}
                        <Box
                            sx={{
                                width: `${100 - leftWidth}%`,
                                overflow: "auto",
                                p: 2,
                            }}
                        >
                            <Markdown>{text}</Markdown>
                        </Box>
                    </Box>
                </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
                <List disablePadding>
                    <ListItem>
                        <ListItemText
                            primary="Reading time"
                            secondary={formatReadingTime(readingTime)}
                        />

                        <ListItemText
                            primary="Word count"
                            secondary={wordCount}
                        />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}
