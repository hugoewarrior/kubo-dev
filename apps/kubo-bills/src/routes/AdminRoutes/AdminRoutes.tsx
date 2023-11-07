import { Navigate, Route, Routes } from "react-router-dom"
import { ADMIN_PREFIX, ADMIN_ROUTES } from "../route-values"
import { Home } from "../../pages/admin/home"

interface IAdminRoutes {
    isAuthenticated: boolean
}


const PROTECTED_ROUTES = [
    { route: ADMIN_ROUTES.HOME, Component: <Home /> },
]



export const AdminRoutes = ({ isAuthenticated }: IAdminRoutes) => {
    return (
        <Routes>
            <Route path={ADMIN_PREFIX} >
                {PROTECTED_ROUTES.map((row, key) => (
                    <Route
                        key={key + "-" + row.route}
                        path={row.route}
                        element={isAuthenticated ? row.Component : <Navigate replace to={"/auth/login"} />} />
                ))}
            </Route>

        </Routes>
    )
}