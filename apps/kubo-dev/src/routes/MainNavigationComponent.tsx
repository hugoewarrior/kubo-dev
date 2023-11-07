import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { HomeScreen } from '../screens/Home';
import { Login } from '../screens/Authentication';
import AuthMiddleware from '../screens/Authentication/components/AuthMiddleware';


const { Navigator, Screen } = createStackNavigator();

export const MainNavigationComponent = () => {
    return (

        <NavigationContainer>
            <Navigator
                initialRouteName="AuthMiddleware"
                screenOptions={({ navigation }) => ({
                    //detachPreviousScreen: !navigation.isFocused(),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    headerShadowVisible: true,
                    headerShown: false,
                    gestureEnabled: false,
                })}
            >
                <Screen
                    name="Home"
                    component={HomeScreen}
                />
                <Screen
                    name="AuthMiddleware"
                    component={AuthMiddleware}
                />
                <Screen
                    name="Login"
                    component={Login}
                />
            </Navigator>
        </NavigationContainer>

    );
}
export default MainNavigationComponent