import { Button, Stack, Typography } from "@mui/material";

export default function FinalStep() {
    return (
        <Stack spacing={2} useFlexGap>
            <Typography variant="h1">📦</Typography>

            <Typography variant="h5">Thank you for your order!</Typography>

            <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Your order number is <strong>&nbsp;#140396</strong>. We have
                emailed your order confirmation and will update you once it{"'"}
                s shipped.
            </Typography>

            <Button variant="contained" sx={{ alignSelf: "start" }}>
                Go to my orders
            </Button>
        </Stack>
    );
}
