import { Auth } from 'aws-amplify';

// Send confirmation code to user's email or phone number
export async function forgotPassword(username: string) {
    try {
        const data = await Auth.forgotPassword(username);
        console.info(data);
        return data;
    } catch (err) {
        console.error(err);
        throw new Error(String(err) || 'Error forgotPassword');
    }
};




// Collect confirmation code and new password
export async function forgotPasswordSubmit(username: string, code: string, newPassword: string) {
    try {
        const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        throw new Error(String(err) || 'Error forgotPasswordSubmit');
    }
};