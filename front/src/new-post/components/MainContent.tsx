import * as React from 'react';
import AddressForm from './AddressForm';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Grid from '@mui/material/Grid';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

interface Step {
    title: string;
    item: React.ReactElement;
};

const steps: Step[] = [
    { title: 'Shipping address', item: <AddressForm /> },
    { title: 'Payment details', item: <PaymentForm /> },
    { title: 'Review your order', item: <Review /> },
];

export default function MainContent() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div>
                <Typography variant="h2" gutterBottom>
                    New post
                </Typography>
            </div>
            <Grid
                size={{ sm: 12, md: 7, lg: 8 }}
                sx={{
                    height: {
                        xs: '100%',
                        sm: 'calc(100dvh - var(--template-frame-height, 0px))',
                    },
                    alignItems: 'start',
                    backgroundColor: { xs: 'transparent', sm: 'background.default' },
                    maxWidth: '100%',
                    px: { xs: 2, sm: 10 },
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: { sm: 'space-between', md: 'flex-end' },
                        maxWidth: { sm: '100%', md: 600 },
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            alignItems: 'flex-end',
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            flexGrow: 1,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Stepper
                            activeStep={activeStep}
                            id="desktop-stepper"
                            sx={{ width: '100%', height: 40 }}
                        >
                            {steps.map((step) => (
                                <Step
                                    key={step.title}
                                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                                >
                                    <StepLabel>{step.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        gap: { xs: 5, md: 'none' },
                        maxHeight: '720px',
                        maxWidth: { sm: '100%', md: 600 },
                        width: '100%',
                    }}
                >
                    <Stepper
                        activeStep={activeStep}
                        alternativeLabel
                        id="mobile-stepper"
                        sx={{ display: { sm: 'flex', md: 'none' } }}
                    >
                        {steps.map((step) => (
                            <Step
                                sx={{
                                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                                    ':first-child': { pl: 0 },
                                    ':last-child': { pr: 0 },
                                }}
                                key={step.title}
                            >
                                <StepLabel
                                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                >
                                    {step.title}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Stack spacing={2} useFlexGap>
                            <Typography variant="h1">📦</Typography>
                            <Typography variant="h5">Thank you for your order!</Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                Your order number is
                                <strong>&nbsp;#140396</strong>. We have emailed your order
                                confirmation and will update you once its shipped.
                            </Typography>
                            <Button
                                sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                                variant="contained"
                            >
                                Go to my orders
                            </Button>
                        </Stack>
                    ) : (
                        <React.Fragment>
                            {steps[activeStep].item}
                            <Box
                                sx={[
                                    {
                                        alignItems: 'end',
                                        display: 'flex',
                                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                                        flexGrow: 1,
                                        gap: 1,
                                        mb: '60px',
                                        mt: { xs: 2, sm: 0 },
                                        pb: { xs: 12, sm: 0 },
                                    },
                                    activeStep !== 0
                                        ? { justifyContent: 'space-between' }
                                        : { justifyContent: 'flex-end' },
                                ]}
                            >
                                {activeStep !== 0 && (
                                    <Button
                                        onClick={handleBack}
                                        startIcon={<ChevronLeftRoundedIcon />}
                                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                                        variant="text"
                                    >
                                        Previous
                                    </Button>
                                )}
                                {activeStep !== 0 && (
                                    <Button
                                        fullWidth
                                        onClick={handleBack}
                                        startIcon={<ChevronLeftRoundedIcon />}
                                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                                        variant="outlined"
                                    >
                                        Previous
                                    </Button>
                                )}
                                <Button
                                    endIcon={<ChevronRightRoundedIcon />}
                                    onClick={handleNext}
                                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                                    variant="contained"
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Box>
            </Grid>
        </Box>
    );
}
