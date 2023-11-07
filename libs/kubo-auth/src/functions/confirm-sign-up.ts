/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from 'aws-amplify';
import { ConfirmSignUpParameters } from '../types';



export async function confirmSignUp({ username, code }: ConfirmSignUpParameters):Promise<any> {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.log('error confirming sign up', error);
    throw new Error(String(error) || 'Error confirming sign up');
  }
}