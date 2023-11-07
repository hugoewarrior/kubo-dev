import { Auth } from "aws-amplify";

/**
 * Function to determine if the user is Logged or not
 * @returns 
 */

export const getUserInformation = async () => {
    try {
        console.info("getUserInformation");
        return await Auth.currentAuthenticatedUser();
    }
    catch (e) {
        console.info("getUserInformation", e);
        return null
    }

}