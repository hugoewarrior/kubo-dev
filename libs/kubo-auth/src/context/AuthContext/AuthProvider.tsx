import { useEffect, useState } from "react";
import { confirmSignUp, getUserInformation, resendConfirmationCode, signIn, signOut, signUp } from "../../functions";
import { ConfirmSignUpParameters, ICognitoSignResponse, ResendConfCodeParameters, SignUpParameters } from "../../types";
import { CHALLENGE_OPTS } from "../../constants";
import { AuthContext } from "./AuthContext"


interface IAuthProvider {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProvider) => {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const u = await getUserInformation().finally(() => setLoading(false));
            setUser(u);
        };

        getUser();
    }, [])


    /**
     * Logs in the user with the provided username and password.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<void>} - A promise that resolves when the user is logged in.
     */
    const login = async (username: string, password: string) => await signIn({
        username,
        password,
    }).then((u) => {
        console.log(u)
        if ((u as ICognitoSignResponse).challengeName === CHALLENGE_OPTS.NEW_PASSWORD_REQUIRED) {
            return u;
        }
        else {
            setUser(u)
        }
    }).catch((e) => e);

    /**
     * Logs out the user by calling the signOut function.
     * @returns A promise that resolves when the user is successfully logged out.
     */
    const logout = async () => await signOut();

    /**
     * Registers a new user with the provided sign up parameters.
     * @param {SignUpParameters} signUpParameters - The sign up parameters containing the user's username, password, email, and phone number.
     * @returns {Promise<void>} - A promise that resolves when the user is successfully registered.
     */
    const register = async ({ username, password, email, phoneNumber }: SignUpParameters) => await signUp({
        username,
        password,
        email,
        phoneNumber
    })

    /**
     * Resends the confirmation code for a given user.
     * @param {ResendConfCodeParameters} params - The parameters for resending the confirmation code.
     * @returns {Promise<void>} - A Promise that resolves when the confirmation code is successfully resent.
     */
    const resendSignUpCode = async ({ username }: ResendConfCodeParameters) => await resendConfirmationCode({ username });

    /**
     * Asynchronously retrieves user information.
     * @returns {Promise<UserInfo>} A promise that resolves with the user information.
     */
    const getUserInfo = async () => await getUserInformation();

    /**
     * Confirms user registration by verifying the confirmation code sent to the user's email or phone number.
     * @param {ConfirmSignUpParameters} params - An object containing the username and confirmation code.
     * @returns {Promise<void>} - A promise that resolves when the confirmation is successful.
     */
    const confirmRegister = async ({ username, code }: ConfirmSignUpParameters) => await confirmSignUp({ username, code });


    return (
        <AuthContext.Provider
            value={{
                user, loading, login,
                logout, register,
                resendSignUpCode,
                getUserInfo, confirmRegister
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }