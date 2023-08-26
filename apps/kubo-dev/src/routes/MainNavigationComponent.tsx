import React from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '../screens/Home';


const { Navigator, Screen } = createStackNavigator();

export const MainNavigationComponent = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Navigator
                    initialRouteName="Home"
                    screenOptions={({ navigation }) => ({
                        //detachPreviousScreen: !navigation.isFocused(),
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerShadowVisible: true,
                        gestureEnabled: false,
                    })}
                >
                    <Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Home' }}
                    />
                </Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
export default MainNavigationComponent