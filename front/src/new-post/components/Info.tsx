import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Footer from '../../shared/Footer';

const products = [
    {
        desc: 'Monthly subscription',
        name: 'Professional plan',
        price: '$15.00',
    },
    {
        desc: 'Included in the Professional plan',
        name: 'Dedicated support',
        price: 'Free',
    },
    {
        desc: 'Devices needed for development',
        name: 'Hardware',
        price: '$69.99',
    },
    {
        desc: 'License',
        name: 'Landing page template',
        price: '$49.99',
    },
];

interface InfoProps {
    totalPrice: string;
}

export default function Info({ totalPrice }: InfoProps) {
    // TODO: Implement footer
    return (
        <React.Fragment>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Total
            </Typography>
            <Typography variant="h4" gutterBottom>
                {totalPrice}
            </Typography>
            <List disablePadding>
                {products.map((product) => (
                    <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                        <ListItemText
                            primary={product.name}
                            secondary={product.desc}
                            sx={{ mr: 2 }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                            {product.price}
                        </Typography>
                    </ListItem>
                ))}
            </List>
            <Footer />
        </React.Fragment>
    );
}
