"use client";

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import mermaid from "mermaid";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface Props {
    content: string;
}

export default function MarkdownPreview({ content }: Props) {
    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        mermaid.run();
    }, [content]);

    return (
        <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            <MathJaxContext>
                <MathJax>
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                    >
                        {content}
                    </ReactMarkdown>
                </MathJax>
            </MathJaxContext>
        </Box>
    );
}
