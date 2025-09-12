// src/screens/ProfileScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';
import { Ionicons } from '@expo/vector-icons';

type ProfileMenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  variant?: 'default' | 'danger';
};

const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const [user] = useState({
    name: 'Alex Green',
    email: 'alex@example.com',
    memberSince: '2024',
    totalCharges: 24,
    totalSavings: '₹2,400',
    carbonSaved: '120 kg',
  });

  const profileMenuItems: ProfileMenuItem[] = [
    {
      id: 'bookings',
      title: 'My Bookings',
      subtitle: 'View charging history',
      icon: 'calendar-outline',
      onPress: () => Alert.alert('Bookings', 'View your charging history'),
    },
    {
      id: 'favorites',
      title: 'Favorite Stations',
      subtitle: 'Quick access to preferred locations',
      icon: 'heart-outline',
      onPress: () => Alert.alert('Favorites', 'Manage your favorite stations'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      icon: 'card-outline',
      onPress: () => Alert.alert('Payment', 'Manage payment methods'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Configure your preferences',
      icon: 'notifications-outline',
      onPress: () => Alert.alert('Notifications', 'Configure notification settings'),
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Support', 'Contact our support team'),
    },
    {
      id: 'about',
      title: 'About Wattway',
      subtitle: 'App version and information',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('About', 'Wattway v1.0.0 - EV Charging Made Easy'),
    },
    {
      id: 'logout',
      title: 'Sign Out',
      icon: 'log-out-outline',
      onPress: () => Alert.alert('Sign Out', 'Are you sure you want to sign out?'),
      variant: 'danger',
    },
  ];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.background },
        header: {
          paddingHorizontal: 24,
          paddingTop: 60,
          paddingBottom: 20,
        },
        title: {
          ...theme.typography.h2,
          color: theme.colors.text,
          marginBottom: 8,
        },
        subtitle: {
          ...theme.typography.subtitle,
          color: theme.colors.textDim,
          marginBottom: 24,
        },
        profileCard: {
          backgroundColor: theme.colors.card,
          borderRadius: theme.radii.xl,
          padding: 24,
          marginHorizontal: 24,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        },
        profileHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        avatar: {
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        },
        avatarText: {
          ...theme.typography.h3,
          color: theme.colors.white,
          fontWeight: '800',
        },
        profileInfo: {
          flex: 1,
        },
        profileName: {
          ...theme.typography.title,
          color: theme.colors.text,
          marginBottom: 4,
        },
        profileEmail: {
          ...theme.typography.caption,
          color: theme.colors.textDim,
        },
        statsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        statItem: {
          alignItems: 'center',
          flex: 1,
        },
        statValue: {
          ...theme.typography.h3,
          color: theme.colors.primary,
          marginBottom: 4,
        },
        statLabel: {
          ...theme.typography.caption,
          color: theme.colors.textDim,
          textAlign: 'center',
        },
        menuContainer: {
          paddingHorizontal: 24,
          paddingBottom: 100,
        },
        menuItem: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: theme.colors.card,
          borderRadius: theme.radii.lg,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        menuIcon: {
          marginRight: 16,
        },
        menuContent: {
          flex: 1,
        },
        menuTitle: {
          ...theme.typography.subtitle,
          color: theme.colors.text,
          marginBottom: 2,
        },
        menuSubtitle: {
          ...theme.typography.caption,
          color: theme.colors.textDim,
        },
        menuArrow: {
          marginLeft: 8,
        },
        editButton: {
          position: 'absolute',
          top: 24,
          right: 24,
          padding: 8,
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
      }),
    [theme]
  );

  const renderMenuItem = (item: ProfileMenuItem, index: number) => (
    <Animated.View
      key={item.id}
      entering={FadeInUp.delay(index * 100)}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
      >
        <View style={styles.menuIcon}>
          <Ionicons
            name={item.icon}
            size={24}
            color={item.variant === 'danger' ? theme.colors.danger : theme.colors.primary}
          />
        </View>
        <View style={styles.menuContent}>
          <Text
            style={[
              styles.menuTitle,
              item.variant === 'danger' && { color: theme.colors.danger },
            ]}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
          )}
        </View>
        <View style={styles.menuArrow}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textDim}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.header}
      >
        <Animated.Text entering={FadeInDown} style={styles.title}>
          Profile
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100)} style={styles.subtitle}>
          Manage your account and preferences
        </Animated.Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200)} style={styles.profileCard}>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalCharges}</Text>
              <Text style={styles.statLabel}>Total Charges</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.totalSavings}</Text>
              <Text style={styles.statLabel}>Total Savings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.carbonSaved}</Text>
              <Text style={styles.statLabel}>CO₂ Saved</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.menuContainer}>
          {profileMenuItems.map((item, index) => renderMenuItem(item, index))}
        </View>
      </ScrollView>
    </View>
  );
};

export { ProfileScreen };