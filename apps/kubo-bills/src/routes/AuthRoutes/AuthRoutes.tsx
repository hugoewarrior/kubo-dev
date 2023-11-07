import { Navigate, Route, Routes } from "react-router-dom";
import { AUTH_PREFIX, AUTH_ROUTES } from "../route-values";
import {
    ConfirmationPage, ForgotPasswordResetComponent,
    LoginPage, RecoverEmailSenderComponent,
    SignUp
} from "../../pages/authentication";

interface IAuthRoutes {
    isAuthenticated: boolean
}

const PROTECTED_ROUTES = [
    { route: AUTH_ROUTES.LOGIN, Component: <LoginPage /> },
    { route: AUTH_ROUTES.CONFIRMATION, Component: <ConfirmationPage /> },
    { route: AUTH_ROUTES.FORGOT, Component: <ForgotPasswordResetComponent /> },
    { route: AUTH_ROUTES.RECOVERY, Component: <RecoverEmailSenderComponent /> },
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
                        element={isAuthenticated ? <Navigate replace to={"/admin/home"} /> : row.Component} />
                ))}
            </Route>
        </Routes>
    )
};