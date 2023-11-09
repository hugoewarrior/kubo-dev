import { useEffect, useState } from "react";
import {
    confirmSignUp, forgotPassword, forgotPasswordSubmit,
    getUserInformation, resendConfirmationCode, signIn,
    signOut, signUp, changePassword
} from "../../functions";
import {
    ChangePasswordIndependent, ConfirmSignUpParameters,
    ForgotPasswordProcess, ICognitoSignResponse,
    ResendConfCodeParameters, SignUpParameters
} from "../../types";
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

    /**
     * Calls the forgotPassword function with the provided username.
     * @param username - The username of the user who forgot their password.
     * @returns A promise that resolves when the forgotPassword function is called.
     */
    const forgotPasswordInit = async (username: string) => await forgotPassword(username);


    /**
     * Submits a new password for a forgotten password flow.
     * @param {ForgotPasswordProcess} params - The parameters for the forgot password process.
     * @returns {Promise<void>} - A promise that resolves when the new password is submitted successfully.
     */
    const forgotPasswordProccess = async ({ username, code, newPassword }: ForgotPasswordProcess) => await forgotPasswordSubmit(username, code, newPassword);


    /**
     * Changes the password for an individual user.
     * @param {ChangePasswordIndependent} - An object containing the old and new passwords.
     * @returns {Promise<void>} - A promise that resolves when the password has been changed.
     */
    const changePasswordIndividualFlow = async ({ oldPassword, newPassword, user }: ChangePasswordIndependent) => changePassword(oldPassword, newPassword, user)



    return (
        <AuthContext.Provider
            value={{
                user, loading, login,
                logout, register,
                resendSignUpCode,
                getUserInfo, confirmRegister,
                forgotPasswordInit,
                forgotPasswordProccess,
                changePasswordIndividualFlow
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext }