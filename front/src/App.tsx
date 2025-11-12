import AppTheme from './shared-theme/AppTheme';
import Follows from './follows/Follows';
import Home from './home-page/HomePage';
import New_Post from './new-post/New-post';
import Post from './post/Post';
import Posts from './posts/Posts';
import Profile from './profile/Profile';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from './ProtectedRoute';

function NotFound() {
    return (
        <AppTheme>
            <Typography
                variant='h2'
            >
                404 - Page Not Found
            </Typography>
        </AppTheme>
    );
}

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth/register" element={<SignUp />} />
                <Route path="/auth/login" element={<SignIn />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile/:id?" element={<Profile />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/new-post" element={<New_Post />} />
                    <Route path="/follows" element={<Follows />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
