// src/screens/StationsScreen.tsx
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';
import { CustomInput } from '../components/CustomInput';
import { Ionicons } from '@expo/vector-icons';

type Station = {
  id: string;
  name: string;
  location: string;
  distance: string;
  status: 'available' | 'occupied' | 'maintenance';
  power: string;
  price: string;
  rating: number;
  amenities: string[];
};

const mockStations: Station[] = [
  {
    id: '1',
    name: 'Green Park Hub',
    location: '123 Green Street, Eco City',
    distance: '0.5 km',
    status: 'available',
    power: '50 kW',
    price: '₹15/kWh',
    rating: 4.8,
    amenities: ['WiFi', 'Restroom', 'Cafe'],
  },
  {
    id: '2',
    name: 'Eco Plaza Station',
    location: '456 Eco Avenue, Green District',
    distance: '1.2 km',
    status: 'occupied',
    power: '22 kW',
    price: '₹12/kWh',
    rating: 4.6,
    amenities: ['WiFi', 'Parking'],
  },
  {
    id: '3',
    name: 'Solar Power Center',
    location: '789 Solar Road, Renewable Zone',
    distance: '2.1 km',
    status: 'available',
    power: '150 kW',
    price: '₹18/kWh',
    rating: 4.9,
    amenities: ['WiFi', 'Restroom', 'Cafe', 'Shopping'],
  },
];

const StationsScreen: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available' | 'fast'>('all');

  const filteredStations = useMemo(() => {
    let filtered = mockStations;

    if (searchQuery) {
      filtered = filtered.filter(station =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter === 'available') {
      filtered = filtered.filter(station => station.status === 'available');
    } else if (selectedFilter === 'fast') {
      filtered = filtered.filter(station => parseInt(station.power) >= 50);
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const getStatusColor = (status: Station['status']) => {
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

  const getStatusIcon = (status: Station['status']) => {
    switch (status) {
      case 'available':
        return 'checkmark-circle';
      case 'occupied':
        return 'time';
      case 'maintenance':
        return 'construct';
      default:
        return 'help-circle';
    }
  };

  const renderStation = ({ item, index }: { item: Station; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[styles.stationCard, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}
    >
      <View style={styles.stationHeader}>
        <View style={styles.stationInfo}>
          <Text style={[styles.stationName, { color: theme.colors.text }]}>{item.name}</Text>
          <Text style={[styles.stationLocation, { color: theme.colors.textDim }]}>{item.location}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons name={getStatusIcon(item.status)} size={16} color={theme.colors.white} />
          <Text style={[styles.statusText, { color: theme.colors.white }]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.stationDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="flash" size={16} color={theme.colors.primary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.power}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="cash" size={16} color={theme.colors.primary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.price}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color={theme.colors.primary} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.distance}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="star" size={16} color={theme.colors.warning} />
          <Text style={[styles.detailText, { color: theme.colors.text }]}>{item.rating}</Text>
        </View>
      </View>

      <View style={styles.amenitiesContainer}>
        {item.amenities.map((amenity, idx) => (
          <View key={idx} style={[styles.amenityTag, { backgroundColor: theme.colors.surface }]}>
            <Text style={[styles.amenityText, { color: theme.colors.textDim }]}>{amenity}</Text>
          </View>
        ))}
      </View>

      <CustomButton
        label={item.status === 'available' ? 'Book Now' : 'View Details'}
        onPress={() => {}}
        variant={item.status === 'available' ? 'primary' : 'outline'}
        size="small"
        disabled={item.status === 'maintenance'}
      />
    </Animated.View>
  );

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
        searchContainer: {
          marginBottom: 20,
        },
        filterContainer: {
          flexDirection: 'row',
          marginBottom: 20,
          gap: 12,
        },
        filterButton: {
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: theme.radii.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        filterButtonActive: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        },
        filterText: {
          ...theme.typography.caption,
          fontWeight: '600',
        },
        filterTextActive: {
          color: theme.colors.white,
        },
        filterTextInactive: {
          color: theme.colors.textDim,
        },
        listContainer: {
          paddingHorizontal: 24,
          paddingBottom: 100,
        },
        stationCard: {
          borderRadius: theme.radii.xl,
          padding: 20,
          marginBottom: 16,
          borderWidth: 1,
          shadowColor: theme.colors.black,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 4,
        },
        stationHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        },
        stationInfo: {
          flex: 1,
          marginRight: 12,
        },
        stationName: {
          ...theme.typography.title,
          marginBottom: 4,
        },
        stationLocation: {
          ...theme.typography.caption,
        },
        statusBadge: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: theme.radii.sm,
          gap: 4,
        },
        statusText: {
          ...theme.typography.caption,
          fontWeight: '700',
          fontSize: 10,
        },
        stationDetails: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        },
        detailRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
        },
        detailText: {
          ...theme.typography.caption,
          fontWeight: '600',
        },
        amenitiesContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
          marginBottom: 16,
        },
        amenityTag: {
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: theme.radii.sm,
        },
        amenityText: {
          ...theme.typography.caption,
          fontSize: 10,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background, theme.colors.surface]}
        style={styles.header}
      >
        <Animated.Text entering={FadeInDown} style={styles.title}>
          Charging Stations
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(100)} style={styles.subtitle}>
          Find and book EV charging stations near you
        </Animated.Text>

        <Animated.View entering={FadeInDown.delay(200)} style={styles.searchContainer}>
          <CustomInput
            placeholder="Search stations or locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            leftIcon={<Ionicons name="search" size={20} color={theme.colors.textDim} />}
            variant="filled"
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300)} style={styles.filterContainer}>
          {[
            { key: 'all', label: 'All' },
            { key: 'available', label: 'Available' },
            { key: 'fast', label: 'Fast Charging' },
          ].map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter.key ? styles.filterTextActive : styles.filterTextInactive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </LinearGradient>

      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderStation}
        ListEmptyComponent={
          <Animated.View entering={FadeInUp} style={{ alignItems: 'center', paddingVertical: 40 }}>
            <Ionicons name="search" size={48} color={theme.colors.textDim} />
            <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 16 }]}>
              No stations found matching your criteria
            </Text>
          </Animated.View>
        }
      />
    </View>
  );
};

export { StationsScreen };