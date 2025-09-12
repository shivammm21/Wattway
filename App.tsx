// App.tsx
import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, Theme as NavTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/constants/theme';
import { AnimatedLogo } from './src/components/AnimatedLogo';
import { Loader } from './src/components/Loader';
import { View, Platform } from 'react-native';

/**
 * App root:
 * - Wraps navigation with GestureHandlerRootView for gestures.
 * - Applies a custom Navigation theme derived from our design theme.
 * - Shows a branded animated splash while "loading" (simulate font/assets).
 */
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Simulate async setup work (e.g., load fonts, prefetch, hydrate state).
  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Animate out splash when ready.
  useEffect(() => {
    if (isReady) {
      const t = setTimeout(() => setShowSplash(false), 600);
      return () => clearTimeout(t);
    }
  }, [isReady]);

  const navTheme: NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#0f172a', // slate-900 background
      primary: '#10b981',    // emerald primary
      card: '#334155',       // slate-700
      text: '#f8fafc',       // slate-50
      border: '#475569',     // slate-600
      notification: '#34d399', // emerald-400
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style={Platform.OS === 'android' ? 'light' : 'light'} />
          {showSplash ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
              {/* Animated splash logo and loader */}
              <AnimatedLogo size={120} variant="glow" />
              <Loader variant="charging" sizeVariant="large" text="Powering up..." style={{ marginTop: 24 }} />
            </View>
          ) : (
            <AppNavigator />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
