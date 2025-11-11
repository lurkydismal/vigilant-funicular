import AppTheme, { AppThemeProps } from '../shared-theme/AppTheme';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../shared/Footer';
import MainContent from './components/MainContent';
import NavBar from '../shared/NavBar';

export default function Follows(props: AppThemeProps) {
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />

            <NavBar />
            <Container
                component="main"
                maxWidth="xl"
                sx={{ display: 'flex', flexDirection: 'column', marginTop: 13, marginBottom: 4, gap: 4 }}
            >
                <MainContent />
            </Container>
            <Footer />
        </AppTheme>
    );
}
