/**
 * This component is in charge of determine if the user is authenticated or not 
 * Then make the right navigaton to determine route for logged users
 */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { getUserInformation, returnStringRoute } from '@kubo-dev/kubo-auth';
import { ADMIN_PREFIX, ADMIN_ROUTES, AUTH_PREFIX, AUTH_ROUTES } from '../../../routes';


const AuthMiddleware = () => {
    const [route, setRoute] = useState("")
    console.log("AuthMiddleware", route)

    /**
     * Calls the @getUserInformation to determine if the users is authenticated
     */
    useEffect(() => {
        const user = async () => {
            const resp = await getUserInformation();
            if (resp) {
                console.log("redirecting to home")
                setRoute(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))
            }
            else {
                console.log("redirecting to login")
                setRoute(returnStringRoute(AUTH_PREFIX, AUTH_ROUTES.LOGIN))
            }
        }
        user();
    }, [])



    return (
        route && <Navigate to={route} replace />
    )
}

export default AuthMiddleware