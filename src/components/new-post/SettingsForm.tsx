import {
    Checkbox,
    FormControlLabel,
    FormLabel,
    Grid,
    RadioGroup,
    Radio,
    Divider,
} from "@mui/material";
import { useId } from "react";
import { toPascalCase } from "@/utils/stdfunc";
import { FormGrid } from "./types";

export default function SettingsForm() {
    const visibilityId = useId();

    const visibilityOptions = ["public", "followers", "unlisted", "private"];

    return (
        <Grid container spacing={2}>
            <FormGrid size={{ xs: 12, md: 12 }}>
                <FormLabel id={visibilityId}>Visibility</FormLabel>

                <RadioGroup
                    row
                    aria-labelledby={visibilityId}
                    defaultValue="public"
                    name="visibility"
                >
                    {visibilityOptions.map((item) => (
                        <FormControlLabel
                            value={item}
                            control={<Radio />}
                            label={toPascalCase(item)}
                        />
                    ))}
                </RadioGroup>
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <Divider />
            </FormGrid>

            <FormGrid size={{ xs: 12 }}>
                <FormControlLabel
                    control={<Checkbox name="contentWarning" value="off" />}
                    label="Content warning"
                />
            </FormGrid>
        </Grid>
    );
}
