import React, { useContext } from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { AuthContext } from '@kubo-dev/kubo-auth';
import { FullScreenLoader } from '../components';
import { AdminRoutes } from './AdminRoutes';
import { AuthRoutes } from './AuthRoutes/AuthRoutes';



//Importing Components 

const AppRoutes = () => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return (
            <FullScreenLoader open={loading} />
        )
    }

    return (
        <Router>
            <AuthRoutes isAuthenticated={Boolean(user)} />
            <AdminRoutes isAuthenticated={Boolean(user)} />
        </Router>
    );
}



export default AppRoutes;