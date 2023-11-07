/* eslint-disable @typescript-eslint/no-explicit-any */
import { CognitoUser } from "amazon-cognito-identity-js";

export interface ICognitoSignUPResponse {
    user: CognitoUser;
    userConfirmed: boolean;
    userSub: string;
}

export type ConfirmSignUpParameters = {
    username: string;
    code: string;
};

export type ResendConfCodeParameters = {
    username: string;
};

export type SignUpParameters = {
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
};

export type SignInParameters = {
    username: string;
    password: string;
};


export interface ICognitoSignResponse {
    Session: string,
    attributes: ICognitoUserAttributes
    authenticationFlowType: string
    client: any
    signInUserSession: any
    username: any
    challengeName?: any
}


interface ICognitoUserAttributes {
    birthdate?: string
    ['custom:business_id']?: string
    ['custom:role']?: string
    ['custom:role']?: string
    email?: string,
    email_verified?: boolean
    name?: string
    phone_number?: string
    phone_number_verified?: boolean
    sub?: string
}
