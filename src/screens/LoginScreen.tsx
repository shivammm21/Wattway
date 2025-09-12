// src/screens/LoginScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeOut, Layout } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';

type Props = {
  onLogin?: (email: string) => void;
  onNavigateRegister?: () => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen: React.FC<Props> = ({ onLogin, onNavigateRegister }) => {
  const theme = useTheme();

  // FIXED: Use specific colors from the gradient array instead of the entire array
  const gradientColors = useMemo(
    () => [theme.colors.gradient[0], theme.colors.gradient[1]] as const,
    [theme]
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1 },
        gradient: { flex: 1 },
        container: { flex: 1, paddingHorizontal: 20, paddingTop: 80 },
        title: { ...theme.typography.h1, color: theme.colors.text, marginBottom: theme.spacing.md },
        subtitle: { ...theme.typography.subtitle, color: theme.colors.textDim, marginBottom: theme.spacing.xl },
        card: {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radii.xl,
          padding: theme.spacing.xl,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        label: { ...theme.typography.subtitle, color: theme.colors.text, marginBottom: theme.spacing.md },
        input: {
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderRadius: theme.radii.md,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        fieldSpacing: { marginTop: theme.spacing.lg, marginBottom: theme.spacing.md },
        errorText: { color: theme.colors.danger, marginTop: theme.spacing.md },
        spacerLg: { height: theme.spacing.lg },
        spacerXl: { height: theme.spacing.xl },
      }),
    [theme]
  );

  const valid = useMemo(() => emailRegex.test(email) && password.length >= 6, [email, password]);

  const handleSubmit = () => {
    if (!valid) {
      setError('Enter a valid email and a password of 6+ characters.');
      return;
    }
    setError(null);
    onLogin?.(email);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.root}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <View style={styles.container}>
          <Animated.Text entering={FadeInUp.duration(500)} style={styles.title}>
            Welcome back
          </Animated.Text>

          <Animated.Text entering={FadeInUp.delay(100).duration(500)} style={styles.subtitle}>
            Sign in to continue your EV journey
          </Animated.Text>

          <Animated.View entering={FadeInUp.delay(150)} layout={Layout.springify()} style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="name@example.com"
              placeholderTextColor={theme.colors.textDim}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <View style={styles.fieldSpacing} />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={theme.colors.textDim}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />

            {error ? (
              <Animated.Text exiting={FadeOut} style={styles.errorText}>
                {error}
              </Animated.Text>
            ) : null}

            <View style={styles.spacerXl} />
            <CustomButton label="Login" onPress={handleSubmit} disabled={!valid} />
            <View style={styles.spacerLg} />
            <CustomButton label="Create an account" onPress={onNavigateRegister} />
          </Animated.View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export { LoginScreen };
