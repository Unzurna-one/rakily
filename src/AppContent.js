import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StatusBar} from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import {OnboardingConfigProvider} from './Core/onboarding/hooks/useOnboardingConfig';
import {useConfig} from './config';
import {authManager} from './Core/onboarding/api';
import {AuthProvider} from './Core/onboarding/hooks/useAuth';

export default function AppContent() {
  const config = useConfig();

  return (
    <OnboardingConfigProvider config={config}>
      <StatusBar />
      <NavigationContainer>
        <AuthProvider authManager={authManager}>
          <RootNavigator />
        </AuthProvider>
      </NavigationContainer>
    </OnboardingConfigProvider>
  );
}
