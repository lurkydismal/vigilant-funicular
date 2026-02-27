"use client";

import { useState, useEffect, ChangeEvent, DragEvent } from "react";
import { TextField, Box, Typography } from "@mui/material";

export default function ImageInput({ acceptedFileTypes = "image/*" }) {
    const [urlInput, setUrlInput] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // When file changes, read it with FileReader (client-side only)
    useEffect(() => {
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string | null);
        };
        reader.readAsDataURL(file);
    }, [file]);

    // When URL input changes, use it as preview
    useEffect(() => {
        if (urlInput) {
            setPreview(urlInput);
            setFile(null);
        }
    }, [urlInput]);

    // Handle file selection via hidden input
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setFile(file);
            setUrlInput("");
        }
    };

    // Handle drag-over event
    const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    // Handle drag-leave event
    const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    // Handle drop event
    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setFile(file);
            setUrlInput("");
        }
    };

    return (
        <Box>
            {/* URL input field */}
            <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste image URL here"
                margin="normal"
            />

            {/* Drag-and-drop file upload area */}
            <Box
                component="label"
                htmlFor="image-upload-input"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    border: "2px dashed",
                    borderColor: isDragging ? "primary.main" : "text.secondary",
                    borderRadius: 1,
                    bgcolor: isDragging ? "grey.900" : "background.paper",
                    color: "text.secondary",
                    cursor: "pointer",
                    height: 150,
                    "&:hover": { bgcolor: "grey.900" },
                }}
            >
                <input
                    id="image-upload-input"
                    type="file"
                    accept={acceptedFileTypes}
                    hidden
                    onChange={handleFileChange}
                />
                <Typography>
                    {isDragging
                        ? "Drop image here..."
                        : "Drag & drop an image here, or click to select one"}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    (Supported formats: {acceptedFileTypes})
                </Typography>
            </Box>

            {/* Image preview */}
            {preview && (
                <Box mt={2} textAlign="center">
                    <Typography variant="subtitle1">Preview:</Typography>
                    <Box
                        component="img"
                        src={preview}
                        alt="Image preview"
                        sx={{ maxWidth: "100%", maxHeight: 300, mt: 1 }}
                    />
                </Box>
            )}
        </Box>
    );
}
