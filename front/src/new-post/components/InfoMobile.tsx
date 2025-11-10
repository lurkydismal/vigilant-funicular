import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import IconButton from '@mui/material/IconButton';
import Info from './Info';

interface InfoProps {
    totalPrice: string;
}

export default function InfoMobile({ totalPrice }: InfoProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
            <IconButton
                onClick={toggleDrawer(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
            >
                <CloseIcon />
            </IconButton>
            <Info totalPrice={totalPrice} />
        </Box>
    );

    return (
        <div>
            <Button
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={toggleDrawer(true)}
                variant="text"
            >
                View details
            </Button>
            <Drawer
                anchor="top"
                onClose={toggleDrawer(false)}
                open={open}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: 'background.paper',
                            backgroundImage: 'none',
                            top: 'var(--template-frame-height, 0px)',
                        },
                    }
                }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
}
