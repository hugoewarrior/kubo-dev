import { Navigate, Route, Routes } from "react-router-dom";
import { returnStringRoute } from "@kubo-dev/kubo-auth";
import { ADMIN_PREFIX, ADMIN_ROUTES, AUTH_PREFIX, AUTH_ROUTES } from "../route-values";
import {
    ConfirmationPage, ForgotPasswordPage,
    LoginPage, RecoverEmailSender,
    SignUp
} from "../../pages/Authentication";

interface IAuthRoutes {
    isAuthenticated: boolean
}

const PROTECTED_ROUTES = [
    { route: AUTH_ROUTES.LOGIN, Component: <LoginPage /> },
    { route: AUTH_ROUTES.CONFIRMATION, Component: <ConfirmationPage /> },
    { route: AUTH_ROUTES.FORGOT, Component: <ForgotPasswordPage /> },
    { route: AUTH_ROUTES.RECOVERY, Component: <RecoverEmailSender /> },
    { route: AUTH_ROUTES.SIGNUP, Component: <SignUp /> },
]


export const AuthRoutes = ({ isAuthenticated }: IAuthRoutes) => {
    return (
        <Routes>
            <Route path={AUTH_PREFIX}>
                {PROTECTED_ROUTES.map((row, key) => (
                    <Route
                        key={key + "-" + row.route}
                        path={row.route}
                        element={isAuthenticated ? <Navigate replace to={returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME)} /> : row.Component} />
                ))}
            </Route>
        </Routes>
    )
};