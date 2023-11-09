/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { ChangePasswordIndependent, ForgotPasswordProcess, ICognitoSignResponse, SignUpParameters } from "../../types";

interface AuthContextProps {
    user?: object
    loading: boolean
    login: (username: string, password: string) => Promise<ICognitoSignResponse>
    logout: () => Promise<void>
    register: (e: SignUpParameters) => Promise<ISignUpResult | Error>
    resendSignUpCode: (e: { username: string }) => Promise<any>
    getUserInfo: () => Promise<null | object>
    confirmRegister: (e: { username: string, code: string }) => Promise<any>
    forgotPasswordInit: (e: string) => Promise<any>
    forgotPasswordProccess: (e: ForgotPasswordProcess) => Promise<any>
    changePasswordIndividualFlow: (e: ChangePasswordIndependent) => Promise<any>
}

const initialState: any = {}

export const AuthContext = createContext<AuthContextProps>(initialState);