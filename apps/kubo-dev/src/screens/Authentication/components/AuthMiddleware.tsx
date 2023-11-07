/**
 * This component is in charge of determine if the user is authenticated or not 
 * Then make the right navigaton to determine route for logged users
 */

import { View } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserInformation } from '@kubo-dev/kubo-auth';
import { RootStackParamList } from '../../../types';

export type PreviousLoginScreenNavigation = StackNavigationProp<
    RootStackParamList,
    'AuthMiddleWare'
>;


const AuthMiddleware = () => {
    const { reset } = useNavigation<PreviousLoginScreenNavigation>();

    /**
     * Calls the @getUserInformation to determine if the users is authenticated
     */
    useEffect(() => {
        const user = async () => {
            const resp = await getUserInformation();
            if (resp) {
                reset({ index: 0, routes: [{ name: "Home" }] })
            }
            else {
                reset({ index: 0, routes: [{ name: "Login" }] })
            }
        }
        user();
    }, [reset])



    return (
        <View />

    )
}

export default AuthMiddleware