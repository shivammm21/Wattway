// src/screens/OwnerHomeScreen.tsx
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';
import { CustomButton } from '../components/CustomButtons';

type Station = { id: string; name: string; status: 'available' | 'occupied'; earnings: string };

type Props = {
  stations?: Station[];
  onAddStation?: () => void;
  onToggleStatus?: (id: string) => void;
};

const mock: Station[] = [
  { id: '1', name: 'Green Park Hub', status: 'available', earnings: '₹12,400' },
  { id: '2', name: 'Eco Plaza', status: 'occupied', earnings: '₹7,980' },
];

const OwnerHomeScreen: React.FC<Props> = ({ stations = mock, onAddStation, onToggleStatus }) => {
  const theme = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, paddingHorizontal: 20, paddingTop: 24, backgroundColor: theme.colors.background },
        summaryCard: {
          backgroundColor: theme.colors.card,
          padding: theme.spacing.xl,
          borderRadius: theme.radii.xl,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
        title: { ...theme.typography.h2, color: theme.colors.text },
        body: { ...theme.typography.body, color: theme.colors.textDim, marginTop: 6 },
        listSpacing: { height: theme.spacing.xl },
        stationCard: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radii.lg,
          borderWidth: 1,
          borderColor: theme.colors.border,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          flexDirection: 'row',
          alignItems: 'center',
        },
        stationName: { ...theme.typography.title, color: theme.colors.text },
        status: { ...theme.typography.caption, marginTop: 6 },
        earnings: { ...theme.typography.caption, marginTop: 4, color: theme.colors.textDim },
        spacer: { width: 12 },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown} style={styles.summaryCard}>
        <Text style={styles.title}>Station overview</Text>
        <Text style={styles.body}>Total stations: {stations.length}</Text>
        <Text style={styles.body}>Earnings (mock): ₹20,380</Text>
      </Animated.View>

      <View style={styles.listSpacing} />
      <CustomButton label="Add new station" onPress={onAddStation} />

      <View style={styles.listSpacing} />

      <FlatList
        data={stations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Animated.View entering={FadeInDown} style={styles.stationCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.stationName}>{item.name}</Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === 'available' ? theme.colors.success : theme.colors.warning },
                ]}
              >
                {item.status.toUpperCase()}
              </Text>
              <Text style={styles.earnings}>Earnings: {item.earnings}</Text>
            </View>
            <View style={styles.spacer} />
            <CustomButton
              label={item.status === 'available' ? 'Mark occupied' : 'Mark available'}
              onPress={() => onToggleStatus?.(item.id)}
            />
          </Animated.View>
        )}
      />
    </View>
  );
};

export { OwnerHomeScreen };
