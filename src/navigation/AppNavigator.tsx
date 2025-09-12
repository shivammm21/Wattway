// src/navigation/AppNavigator.tsx
import React, { useState } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { OwnerHomeScreen } from '../screens/OwnerHomeScreen';

/**
 * Simple role routing:
 * - When user logs in/registers, we set a mock role in state and navigate accordingly.
 * - Native stack provides smooth default transitions; we tweak for subtle fade/slide.
 */

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  UserTabs: undefined;
  OwnerHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade', // smooth fade between screens
};

export default function AppNavigator() {
  const [role, setRole] = useState<'user' | 'owner' | null>(null);

  return (
    <Stack.Navigator screenOptions={screenOptions} initialRouteName="Login">
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            onLogin={(email) => {
              // Very simple branching: flip between roles for demo
              const selected: 'user' | 'owner' = email.includes('+owner') ? 'owner' : 'user';
              setRole(selected);
              props.navigation.replace(selected === 'user' ? 'UserTabs' : 'OwnerHome');
            }}
            onNavigateRegister={() => props.navigation.navigate('Register')}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Register">
        {(props) => (
          <RegistrationScreen
            onRegistered={(email) => {
              const selected: 'user' | 'owner' = email.includes('+owner') ? 'owner' : 'user';
              setRole(selected);
              props.navigation.replace(selected === 'user' ? 'UserTabs' : 'OwnerHome');
            }}
            onNavigateLogin={() => props.navigation.goBack()}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="UserTabs"
        component={BottomTabNavigator}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="OwnerHome"
        component={OwnerHomeScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
