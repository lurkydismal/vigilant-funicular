"use client";

import MarkdownEditor from './MarkdownEditor';
import { Stack, Box, Card, OutlinedInput, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProps } from "./types";
import log from "@/utils/stdlog";
import MarkdownPreview from './MarkdownPreview';
import Markdown from '../Markdown';

export default function ContentForm({ moveNext }: FormProps) {
    const [text, setText] = useState("");

    return (
        <Card>
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                }}
            >
                <MarkdownEditor value={text} onChange={setText} />
                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                    <Markdown>{text}</Markdown>
                </Box>
            </Box>
        </Card>
    );
}
