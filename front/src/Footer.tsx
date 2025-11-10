import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Copyright } from './Copyright';

export default function Footer() {
    return (
        <React.Fragment>
            <Divider />
            <Container
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    py: { xs: 1, sm: 2 },
                    textAlign: { sm: 'center', md: 'left' },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                    }}
                >
                    <div>
                        <Link color="text.secondary" variant="body2" href="#">
                            Privacy Policy
                        </Link>
                        <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                            &nbsp;•&nbsp;
                        </Typography>
                        <Link color="text.secondary" variant="body2" href="#">
                            Terms of Service
                        </Link>
                        <Copyright />
                    </div>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: 'left', color: 'text.secondary' }}
                        useFlexGap
                    >
                        <IconButton
                            aria-label="GitHub"
                            color="inherit"
                            href={import.meta.env.VITE_GITHUB_LINK}
                            size="small"
                            sx={{ alignSelf: 'center' }}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </React.Fragment>
    );
}
