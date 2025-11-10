import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkAuth } from './stdfunc';

// TODO: IMplement Loading page
export function ProtectedRoute() {
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        checkAuth().then(setAuthorized);
    }, []);

    if (authorized === null) return <div>Loading...</div>;
    if (!authorized) return <Navigate to="/auth/login" replace />;

    return <Outlet />; // renders child routes
}
