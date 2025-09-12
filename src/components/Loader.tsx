// src/components/Loader.tsx
import React from 'react';
import { ViewStyle, View, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useTheme } from '../constants/theme';

type LoaderVariant = 'default' | 'charging' | 'dots' | 'pulse';
type LoaderSize = 'small' | 'medium' | 'large';

type Props = {
  size?: number;
  style?: ViewStyle;
  source?: any; // allow require() or { uri }
  loop?: boolean;
  autoPlay?: boolean;
  variant?: LoaderVariant;
  sizeVariant?: LoaderSize;
  text?: string;
  color?: string;
};

export const Loader: React.FC<Props> = ({
  size,
  style,
  source,
  loop = true,
  autoPlay = true,
  variant = 'default',
  sizeVariant = 'medium',
  text,
  color,
}) => {
  const t = useTheme();
  const pulseScale = useSharedValue(1);
  const opacity = useSharedValue(0.3);

  const getSize = () => {
    if (size) return size;
    switch (sizeVariant) {
      case 'small': return 40;
      case 'large': return 120;
      default: return 72;
    }
  };

  const getSource = () => {
    if (source) return source;
    switch (variant) {
      case 'charging':
        return require('../../assets/charging.json');
      default:
        return require('../../assets/charging.json'); // fallback to charging animation
    }
  };

  const getTextSize = () => {
    switch (sizeVariant) {
      case 'small': return 12;
      case 'large': return 16;
      default: return 14;
    }
  };

  React.useEffect(() => {
    if (variant === 'pulse') {
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        false
      );
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0.3, { duration: 800 })
        ),
        -1,
        false
      );
    }
  }, [variant]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: opacity.value,
  }));

  const loaderSize = getSize();
  const loaderSource = getSource();
  const textSize = getTextSize();

  if (variant === 'dots') {
    return (
      <View style={[{ alignItems: 'center' }, style]}>
        <View style={styles.dotsContainer}>
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: color || t.colors.primary,
                  width: loaderSize / 8,
                  height: loaderSize / 8,
                  borderRadius: loaderSize / 16,
                },
                {
                  transform: [
                    {
                      translateY: withRepeat(
                        withSequence(
                          withTiming(-loaderSize / 4, { duration: 600 }),
                          withTiming(0, { duration: 600 })
                        ),
                        -1,
                        false
                      ),
                    },
                  ],
                },
              ]}
            />
          ))}
        </View>
        {text && (
          <Text style={[styles.text, { color: color || t.colors.textDim, fontSize: textSize }]}>
            {text}
          </Text>
        )}
      </View>
    );
  }

  if (variant === 'pulse') {
    return (
      <View style={[{ alignItems: 'center' }, style]}>
        <Animated.View
          style={[
            styles.pulseContainer,
            {
              width: loaderSize,
              height: loaderSize,
              borderRadius: loaderSize / 2,
              backgroundColor: color || t.colors.primary,
            },
            animatedStyle,
          ]}
        />
        {text && (
          <Text style={[styles.text, { color: color || t.colors.textDim, fontSize: textSize }]}>
            {text}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      <LottieView
        source={loaderSource}
        autoPlay={autoPlay}
        loop={loop}
        style={{ width: loaderSize, height: loaderSize }}
        colorFilters={color ? [{ keypath: '**', color }] : undefined}
      />
      {text && (
        <Text style={[styles.text, { color: color || t.colors.textDim, fontSize: textSize }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = {
  dotsContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 8,
  },
  dot: {
    marginHorizontal: 4,
  },
  pulseContainer: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  text: {
    marginTop: 12,
    textAlign: 'center' as const,
    fontWeight: '500' as const,
  },
};
