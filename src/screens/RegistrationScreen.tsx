// src/screens/RegisterScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, Layout } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';
import { CustomInput } from '../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onRegistered?: (email: string) => void;
  onNavigateLogin?: () => void;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RegistrationScreen: React.FC<Props> = ({ onRegistered, onNavigateLogin }) => {
  const t = useTheme();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = useMemo(() => {
    if (!emailRegex.test(email)) return false;
    if (name.trim().length < 2) return false;
    if (password.length < 6) return false;
    if (password !== confirmPassword) return false;
    return true;
  }, [email, name, password, confirmPassword]);

  const handleSubmit = async () => {
    if (!valid) {
      setError('Please fill all fields correctly and ensure passwords match.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onRegistered?.(email);
    }, 1500);
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1 },
        gradient: { flex: 1 },
        container: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
        scrollContainer: { flexGrow: 1, justifyContent: 'center' },
        header: { alignItems: 'center', marginBottom: 40 },
        title: { 
          ...t.typography.h1, 
          color: t.colors.text, 
          textAlign: 'center',
          marginBottom: t.spacing.sm,
        },
        subtitle: { 
          ...t.typography.subtitle, 
          color: t.colors.textDim, 
          textAlign: 'center',
          marginBottom: t.spacing.xl,
        },
        card: {
          backgroundColor: t.colors.card,
          borderRadius: t.radii.xl,
          padding: t.spacing.xxl,
          borderWidth: 1,
          borderColor: t.colors.border,
          shadowColor: t.colors.black,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.1,
          shadowRadius: 24,
          elevation: 8,
        },
        spacerLg: { height: t.spacing.lg },
        spacerXl: { height: t.spacing.xl },
        footer: { alignItems: 'center', marginTop: t.spacing.xl },
        footerText: { 
          ...t.typography.caption, 
          color: t.colors.textDim,
          textAlign: 'center',
        },
      }),
    [t]
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.select({ ios: 'padding', android: undefined })} 
      style={styles.root}
    >
      <LinearGradient 
        colors={t.colors.gradient as [string, string, ...string[]]} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
              <Text style={styles.title}>Create account</Text>
              <Text style={styles.subtitle}>Join Wattway and power up the road</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(200).duration(600)} layout={Layout.springify()} style={styles.card}>
              <CustomInput
                label="Full Name"
                placeholder="Alex Green"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoComplete="name"
                leftIcon={<Ionicons name="person-outline" size={20} color={t.colors.textDim} />}
                variant="filled"
                size="large"
              />

              <CustomInput
                label="Email Address"
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<Ionicons name="mail-outline" size={20} color={t.colors.textDim} />}
                variant="filled"
                size="large"
              />

              <CustomInput
                label="Password"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoComplete="new-password"
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={t.colors.textDim} />}
                rightIcon={
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={t.colors.textDim} 
                  />
                }
                onRightIconPress={() => setShowPassword(!showPassword)}
                variant="filled"
                size="large"
              />

              <CustomInput
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color={t.colors.textDim} />}
                rightIcon={
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={t.colors.textDim} 
                  />
                }
                onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                variant="filled"
                size="large"
              />

              {error ? (
                <Animated.Text style={[styles.footerText, { color: t.colors.danger }]}>
                  {error}
                </Animated.Text>
              ) : null}

              <View style={styles.spacerXl} />
              
              <CustomButton 
                label="Create Account" 
                onPress={handleSubmit} 
                disabled={!valid || loading}
                loading={loading}
                size="large"
                leftIcon={<Ionicons name="checkmark-circle-outline" size={20} color={t.colors.white} />}
              />
              
              <View style={styles.spacerLg} />
              
              <CustomButton 
                label="Back to login" 
                onPress={onNavigateLogin}
                variant="outline"
                size="large"
                leftIcon={<Ionicons name="arrow-back-outline" size={20} color={t.colors.primary} />}
              />
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.footer}>
              <Text style={styles.footerText}>
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </Text>
            </Animated.View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export { RegistrationScreen as RegisterScreen };