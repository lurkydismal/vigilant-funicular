import { FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { FormGrid } from "./types";
import { useId } from "react";
import { toPascalCase } from "@/utils/stdfunc";

export default function PublishForm() {
    const publishId = useId();

    const publishOptions = ["now", "scheduled", "draft"];

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={publishId} required>Publish</FormLabel>

                <RadioGroup
                    row
                    aria-labelledby={publishId}
                    defaultValue="public"
                    name="publish"
                >
                    {publishOptions.map((item) => (
                        <FormControlLabel
                            key={item}
                            value={item}
                            control={<Radio />}
                            label={toPascalCase(item)}
                        />
                    ))}
                </RadioGroup>
            </FormGrid>
        </Grid>
    );
}
