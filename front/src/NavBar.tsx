import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import { alpha, styled } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'center',
    backdropFilter: 'blur(24px)',
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    boxShadow: (theme.vars || theme).shadows[1],
    pborder: '1px solid',
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'space-between',
    adding: '8px 12px',
}));

export default function NavBar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            enableColorOnDark
            position="fixed"
            sx={{
                backgroundImage: 'none',
                bgcolor: 'transparent',
                boxShadow: 0,
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="text" color="info" size="small" href='/epistles'>
                                Epistles
                            </Button>
                            <Button variant="text" color="info" size="small" href='/follows'>
                                Follows
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            paddingRight: 2,
                            alignItems: 'center',
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                        }}
                    >
                        <Button color="primary" variant="contained" size="small" href='/new-post'>
                            New post
                        </Button>
                        <Button color="primary" variant="contained" size="small" href='/posts'>
                            Posts
                        </Button>
                        <Button color="primary" variant="contained" size="small" href='/profile'>
                            My profile
                        </Button>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="top"
                            onClose={toggleDrawer(false)}
                            open={open}
                            slotProps={{
                                paper: {
                                    sx: {
                                        top: 'var(--template-frame-height, 0px)',
                                    },
                                }
                            }}
                        >
                            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <MenuItem href='/epistles'>Epistles</MenuItem>
                                <MenuItem href='/follows'>Follows</MenuItem>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem>
                                    <Button color="primary" variant="contained" href='/new-posts' fullWidth>
                                        New posts
                                    </Button>
                                    <Button color="primary" variant="contained" href='/posts' fullWidth>
                                        Posts
                                    </Button>
                                    <Button color="primary" variant="contained" href='/profile' fullWidth>
                                        My profile
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
