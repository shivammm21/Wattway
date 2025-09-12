// src/screens/UserHomeScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';

type Props = {
  onSearchStations?: () => void;
  onOpenBookings?: () => void;
  onOpenProfile?: () => void;
};

const UserHomeScreen: React.FC<Props> = ({ onSearchStations, onOpenBookings, onOpenProfile }) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, paddingHorizontal: 20, paddingTop: 24, backgroundColor: theme.colors.background },
        hero: {
          backgroundColor: theme.colors.card,
          padding: theme.spacing.xl,
          borderRadius: theme.radii.xl,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        heroTitle: { ...theme.typography.h2, color: theme.colors.text },
        heroBody: { ...theme.typography.body, color: theme.colors.textDim, marginTop: 6 },
        mapPlaceholder: {
          flex: 1,
          minHeight: 220,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          marginTop: theme.spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
        },
        mapText: { ...theme.typography.subtitle, color: theme.colors.textDim },
        gap: { height: theme.spacing.xl },
        buttons: { gap: theme.spacing.lg },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown} style={styles.hero}>
        <Text style={styles.heroTitle}>Welcome to Wattway</Text>
        <Text style={styles.heroBody}>Find and book charging stations around you</Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(100)} style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map coming soon</Text>
      </Animated.View>

      <View style={styles.gap} />

      <Animated.View entering={FadeInUp.delay(150)} style={styles.buttons}>
        <CustomButton label="Search nearby stations" onPress={onSearchStations} />
        <CustomButton label="My bookings" onPress={onOpenBookings} />
        <CustomButton label="Profile" onPress={onOpenProfile} />
      </Animated.View>
    </View>
  );
};

export { UserHomeScreen };
