import { Auth } from 'aws-amplify';
import { ICognitoSignResponse } from '../types';

export async function changePassword(oldPassword: string, newPassword: string, cognitoUser?: ICognitoSignResponse) {
    try {
        let user;
        if (!cognitoUser) {
            user = await Auth.currentAuthenticatedUser();
        }
        
        const data = await Auth.changePassword(cognitoUser ?? user, oldPassword, newPassword);
        console.log(data);
        return data
    } catch (err) {
        console.log(err);
        throw new Error(String(err) || 'Error changePassword');
    }
};