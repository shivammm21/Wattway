// src/components/AnimatedLogo.tsx
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring, 
  withRepeat,
  withSequence,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../constants/theme';

/**
 * Enhanced animated logomark for Wattway with modern styling.
 * - Fades and scales in with rotation and glow effects.
 * - Uses gradient backgrounds and smooth animations.
 */
type Props = {
  size?: number;
  showText?: boolean;
  variant?: 'default' | 'minimal' | 'glow';
};

export const AnimatedLogo: React.FC<Props> = ({ 
  size = 96, 
  showText = true, 
  variant = 'default' 
}) => {
  const t = useTheme();
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    // Main entrance animation
    progress.value = withTiming(1, { 
      duration: 800, 
      easing: Easing.out(Easing.cubic) 
    });

    // Subtle rotation animation
    rotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 2000 }),
        withTiming(-5, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ),
      -1,
      false
    );

    // Glow effect for glow variant
    if (variant === 'glow') {
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1500 }),
          withTiming(0.3, { duration: 1500 })
        ),
        -1,
        false
      );
    }
  }, [progress, rotation, glowOpacity, variant]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 600 }),
    transform: [
      { 
        scale: withSpring(progress.value ? 1 : 0.7, { 
          damping: 15, 
          stiffness: 150 
        }) 
      },
      { 
        rotate: `${rotation.value}deg` 
      }
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: withTiming(progress.value, { duration: 800 }),
    transform: [
      { 
        translateY: withSpring(progress.value ? 0 : 20, { 
          damping: 20, 
          stiffness: 100 
        }) 
      }
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [
      { scale: interpolate(glowOpacity.value, [0.3, 0.8], [1, 1.1]) }
    ],
  }));

  const getLogoContent = () => {
    if (variant === 'minimal') {
      return (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: t.colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: t.colors.primaryLight,
          }}
        >
          <Text style={{ 
            color: t.colors.white, 
            fontWeight: '800', 
            fontSize: size * 0.3,
            letterSpacing: 1,
          }}>
            W
          </Text>
        </View>
      );
    }

    return (
      <View style={{ position: 'relative' }}>
        {variant === 'glow' && (
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: size * 1.3,
                height: size * 1.3,
                borderRadius: (size * 1.3) / 2,
                backgroundColor: t.colors.primary,
                alignSelf: 'center',
                top: -size * 0.15,
                left: -size * 0.15,
              },
              glowStyle,
            ]}
          />
        )}
        
        <LinearGradient
          colors={t.colors.gradientPrimary as [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: t.colors.primary,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <Text style={{ 
            color: t.colors.white, 
            fontWeight: '800', 
            fontSize: size * 0.28,
            letterSpacing: 1,
            textShadowColor: 'rgba(0, 0, 0, 0.3)',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>
            W
          </Text>
        </LinearGradient>
      </View>
    );
  };

  return (
    <Animated.View style={[{ alignItems: 'center', justifyContent: 'center' }, logoStyle]}>
      {getLogoContent()}
      
      {showText && (
        <Animated.Text 
          style={[
            { 
              marginTop: 12, 
              color: t.colors.text, 
              fontWeight: '700', 
              fontSize: 20,
              letterSpacing: 1,
            },
            textStyle
          ]}
        >
          Wattway
        </Animated.Text>
      )}
    </Animated.View>
  );
};
