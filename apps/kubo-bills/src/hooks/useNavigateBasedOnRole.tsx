import { ICognitoSignResponse, returnStringRoute } from "@kubo-dev/kubo-auth";
import { useNavigate } from "react-router-dom"
import { ADMIN_PREFIX, ADMIN_ROUTES } from "../routes";

export enum VALID_USER_ROLE {
    ADMIN = "admin",
    FAMILY_MEMBER = "family_member",
    GUEST = "guest",
    FAMILY_ADMIN = "family_admin"

}





export const useNavigateBasedOnRole = () => {
    const navigate = useNavigate();

    const naviageByRole = (e: ICognitoSignResponse) => {
        if (e.attributes["custom:role"] === VALID_USER_ROLE.ADMIN) {
            navigate(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))
        }
        if (e.attributes["custom:role"] === VALID_USER_ROLE.FAMILY_ADMIN) {
            navigate(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))
        }
        if (e.attributes["custom:role"] === VALID_USER_ROLE.FAMILY_MEMBER) {
            navigate(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))
        }
        if (e.attributes["custom:role"] === VALID_USER_ROLE.GUEST) {
            navigate(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))
        }

        navigate(returnStringRoute(ADMIN_PREFIX, ADMIN_ROUTES.HOME))

    }

    return { naviageByRole }
}