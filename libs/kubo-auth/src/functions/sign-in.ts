import { Auth } from 'aws-amplify';
import { ICognitoSignResponse, SignInParameters } from '../types';



export async function signIn({ username, password }: SignInParameters): Promise<ICognitoSignResponse | Error> {
    try {
        return await Auth.signIn(username, password);
    } catch (error) {
        throw new Error(String(error) || 'Error signing in')
    }
}