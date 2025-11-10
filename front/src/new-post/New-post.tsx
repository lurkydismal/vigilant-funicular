import * as React from 'react';
import AddressForm from './components/AddressForm';
import AppTheme, { AppThemeProps } from '../shared-theme/AppTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import PaymentForm from './components/PaymentForm';
import Review from './components/Review';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
function getStepContent(step: number) {
    switch (step) {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}
export default function NewPost(props: AppThemeProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <Grid
                container
                sx={{
                    height: {
                        sm: 'calc(100dvh - var(--template-frame-height, 0px))',
                        xs: '100%',
                    },
                    mt: {
                        sm: 0,
                        xs: 4,
                    },
                }}
            >
                <Grid
                    size={{ xs: 12, sm: 5, lg: 4 }}
                    sx={{
                        alignItems: 'start',
                        backgroundColor: 'background.paper',
                        borderColor: { sm: 'none', md: 'divider' },
                        borderRight: { sm: 'none', md: '1px solid' },
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        gap: 4,
                        pt: 16,
                        px: 10,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            maxWidth: 500,
                            width: '100%',
                        }}
                    >
                        <Info totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
                    </Box>
                </Grid>
                <Grid
                    size={{ sm: 12, md: 7, lg: 8 }}
                    sx={{
                        alignItems: 'start',
                        backgroundColor: { xs: 'transparent', sm: 'background.default' },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 4, md: 8 },
                        maxWidth: '100%',
                        pt: { xs: 0, sm: 16 },
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
                                {steps.map((label) => (
                                    <Step
                                        key={label}
                                        sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                                    >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>
                    <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
                        <CardContent
                            sx={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <div>
                                <Typography variant="subtitle2" gutterBottom>
                                    Selected products
                                </Typography>
                                <Typography variant="body1">
                                    {activeStep >= 2 ? '$144.97' : '$134.98'}
                                </Typography>
                            </div>
                            <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
                        </CardContent>
                    </Card>
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
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                                        ':first-child': { pl: 0 },
                                        ':last-child': { pr: 0 },
                                    }}
                                    key={label}
                                >
                                    <StepLabel
                                        sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                    >
                                        {label}
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
                                {getStepContent(activeStep)}
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
            </Grid>
        </AppTheme>
    );
}
