import { Auth } from 'aws-amplify';

export async function signOut() {
    try {
        await Auth.signOut();
        console.info("Succesfull Logout")
    } catch (error) {
        console.log('error signing out: ', error);
    }
}