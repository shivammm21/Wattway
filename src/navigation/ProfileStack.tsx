// src/navigation/ProfileStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Named exports: use braces
import { ProfileScreen } from '@screens/ProfileScreen';
import { LoginScreen } from '@screens/LoginScreen';
import { RegistrationScreen } from '@screens/RegistrationScreen';

type ProfileStackParamList = {
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
  return (
    <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}
