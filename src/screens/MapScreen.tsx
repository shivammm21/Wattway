// src/screens/MapScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const theme = useTheme();
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const mockStations = [
    {
      id: '1',
      name: 'Green Park Hub',
      location: { latitude: 28.6139, longitude: 77.2090 },
      status: 'available',
      power: '50 kW',
      price: '₹15/kWh',
    },
    {
      id: '2',
      name: 'Eco Plaza Station',
      location: { latitude: 28.6140, longitude: 77.2095 },
      status: 'occupied',
      power: '22 kW',
      price: '₹12/kWh',
    },
    {
      id: '3',
      name: 'Solar Power Center',
      location: { latitude: 28.6145, longitude: 77.2100 },
      status: 'available',
      power: '150 kW',
      price: '₹18/kWh',
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
        mapContainer: {
          flex: 1,
          marginHorizontal: 24,
          marginBottom: 24,
          borderRadius: theme.radii.xl,
          overflow: 'hidden',
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        mapPlaceholder: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.surface,
        },
        mapText: {
          ...theme.typography.title,
          color: theme.colors.textDim,
          textAlign: 'center',
          marginBottom: 8,
        },
        mapSubtext: {
          ...theme.typography.caption,
          color: theme.colors.textDim,
          textAlign: 'center',
        },
        controlsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 24,
          marginBottom: 20,
        },
        controlButton: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.card,
          borderWidth: 1,
          borderColor: theme.colors.border,
          gap: 8,
        },
        controlText: {
          ...theme.typography.caption,
          color: theme.colors.text,
          fontWeight: '600',
        },
        stationList: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.colors.card,
          borderTopLeftRadius: theme.radii.xl,
          borderTopRightRadius: theme.radii.xl,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border,
          paddingTop: 16,
          paddingHorizontal: 24,
          paddingBottom: 40,
          maxHeight: height * 0.4,
        },
        stationItem: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: theme.radii.lg,
          marginBottom: 8,
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        stationItemSelected: {
          backgroundColor: theme.colors.primary + '20',
          borderColor: theme.colors.primary,
        },
        stationInfo: {
          flex: 1,
          marginLeft: 12,
        },
        stationName: {
          ...theme.typography.subtitle,
          color: theme.colors.text,
          marginBottom: 2,
        },
        stationDetails: {
          ...theme.typography.caption,
          color: theme.colors.textDim,
        },
        statusIndicator: {
          width: 8,
          height: 8,
          borderRadius: 4,
          marginRight: 8,
        },
        statusAvailable: {
          backgroundColor: theme.colors.success,
        },
        statusOccupied: {
          backgroundColor: theme.colors.warning,
        },
        statusMaintenance: {
          backgroundColor: theme.colors.danger,
        },
      }),
    [theme]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return theme.colors.success;
      case 'occupied':
        return theme.colors.warning;
      case 'maintenance':
        return theme.colors.danger;
      default:
        return theme.colors.textDim;
    }
  };

  const getStatusIndicatorStyle = (status: string) => {
    switch (status) {
      case 'available':
        return styles.statusAvailable;
      case 'occupied':
        return styles.statusOccupied;
      case 'maintenance':
        return styles.statusMaintenance;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.header}
      >
        <Animated.Text entering={FadeInDown} style={styles.title}>
          Map View
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100)} style={styles.subtitle}>
          Find charging stations on the map
        </Animated.Text>
      </LinearGradient>

      <Animated.View entering={FadeInUp.delay(200)} style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color={theme.colors.textDim} />
          <Text style={styles.mapText}>Interactive Map</Text>
          <Text style={styles.mapSubtext}>Map integration coming soon</Text>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300)} style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="locate" size={20} color={theme.colors.primary} />
          <Text style={styles.controlText}>My Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="filter" size={20} color={theme.colors.primary} />
          <Text style={styles.controlText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="list" size={20} color={theme.colors.primary} />
          <Text style={styles.controlText}>List View</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(400)} style={styles.stationList}>
        <Text style={[styles.title, { marginBottom: 16, fontSize: 18 }]}>
          Nearby Stations
        </Text>
        
        {mockStations.map((station, index) => (
          <Animated.View
            key={station.id}
            entering={FadeInUp.delay(500 + index * 100)}
            style={[
              styles.stationItem,
              selectedStation === station.id && styles.stationItemSelected,
            ]}
          >
            <View style={[styles.statusIndicator, getStatusIndicatorStyle(station.status)]} />
            <View style={styles.stationInfo}>
              <Text style={styles.stationName}>{station.name}</Text>
              <Text style={styles.stationDetails}>
                {station.power} • {station.price} • {station.status}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setSelectedStation(selectedStation === station.id ? null : station.id)}
            >
              <Ionicons
                name={selectedStation === station.id ? "chevron-up" : "chevron-down"}
                size={20}
                color={theme.colors.textDim}
              />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
};

export { MapScreen };