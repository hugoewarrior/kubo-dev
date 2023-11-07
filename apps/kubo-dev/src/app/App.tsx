import React from 'react';
import { Amplify } from 'aws-amplify';
import { LocalStatusBar } from '@kubo-dev/components'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from '../theme';
import { MainNavigationComponent } from '../routes';
import { cognitoAuthConfig } from '../auth';

console.log(cognitoAuthConfig)
Amplify.configure({
  Auth: cognitoAuthConfig
});

export const App = () => {

  return (
    <SafeAreaProvider>
      <PaperProvider theme={lightTheme}>
        <LocalStatusBar />
        <MainNavigationComponent />

      </PaperProvider>
    </SafeAreaProvider>
  );
};

