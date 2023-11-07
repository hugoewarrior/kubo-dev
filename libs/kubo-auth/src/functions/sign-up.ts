import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';
import { SignUpParameters } from '../types';



export async function signUp({ username, password, email, phoneNumber }: SignUpParameters): Promise<ISignUpResult | Error> {
    try {
        const response = await Auth.signUp({
            username,
            password,
            attributes: {
                email, // optional
                phoneNumber, // optional - E.164 number convention
                // other custom attributes
            },
            autoSignIn: {
                // optional - enables auto sign in after user is confirmed
                enabled: true,
            },
        });
        return response
    } catch (error) {
        console.log('error signing up:', error);
        throw Error(String(error) || 'Error signing up')
    }
}