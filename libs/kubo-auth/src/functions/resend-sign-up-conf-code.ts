/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from 'aws-amplify';
import { ResendConfCodeParameters } from '../types';



export async function resendConfirmationCode({ username }: ResendConfCodeParameters): Promise<any> {
  try {
    const resp = await Auth.resendSignUp(username);
    console.log('code resent successfully');
    return resp;
  } catch (err) {
    console.log('error resending code: ', err);
    throw new Error(String(err) || 'Error resending code');
  }
}