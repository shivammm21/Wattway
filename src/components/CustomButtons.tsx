// src/components/CustomButtons.tsx
import React from 'react';
import { Text, ViewStyle, StyleSheet, GestureResponderEvent, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

type Props = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export const CustomButton: React.FC<Props> = ({
  label,
  onPress,
  disabled,
  style,
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'medium',
  loading = false,
}) => {
  const t = useTheme();
  const pressed = useSharedValue(0);
  const scale = useSharedValue(1);

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return t.colors.gradientPrimary;
      case 'secondary':
        return t.colors.gradientAccent;
      case 'outline':
        return [t.colors.surface, t.colors.surface];
      case 'ghost':
        return ['transparent', 'transparent'];
      default:
        return t.colors.gradientPrimary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return t.colors.white;
      case 'outline':
      case 'ghost':
        return t.colors.primary;
      default:
        return t.colors.white;
    }
  };

  const getBorderColor = () => {
    switch (variant) {
      case 'outline':
        return t.colors.primary;
      case 'ghost':
        return 'transparent';
      default:
        return 'transparent';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { paddingVertical: t.spacing.sm, paddingHorizontal: t.spacing.lg, minHeight: 40 };
      case 'large':
        return { paddingVertical: t.spacing.xl, paddingHorizontal: t.spacing.xxl, minHeight: 60 };
      default:
        return { paddingVertical: t.spacing.lg, paddingHorizontal: t.spacing.xl, minHeight: 52 };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return { fontSize: 14, fontWeight: '600' as const };
      case 'large':
        return { fontSize: 18, fontWeight: '700' as const };
      default:
        return { fontSize: 16, fontWeight: '700' as const };
    }
  };

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(scale.value, { damping: 18, stiffness: 220 }) },
    ],
    opacity: withTiming(disabled || loading ? 0.6 : 1, { duration: 150 }),
  }), [disabled, loading]);

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (!disabled && !loading && onPress) {
      onPress(e);
    }
  };

  const buttonColors = getButtonColors();
  const textColor = getTextColor();
  const borderColor = getBorderColor();
  const sizeStyles = getSizeStyles();
  const textStyles = getTextSize();

  return (
    <Animated.View
      style={[
        {
          borderRadius: t.radii.lg,
          overflow: 'hidden',
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor,
          shadowColor: variant === 'primary' ? t.colors.primary : 'transparent',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: variant === 'primary' ? 8 : 0,
        },
        rStyle,
        style,
      ]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      onTouchCancel={handlePressOut}
    >
      <Animated.View
        onTouchEnd={handlePress}
        style={[
          styles.container,
          sizeStyles,
          { backgroundColor: variant === 'ghost' ? 'transparent' : undefined },
        ]}
      >
        {variant === 'primary' || variant === 'secondary' ? (
          <LinearGradient
            colors={buttonColors as [string, string, ...string[]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFillObject, { borderRadius: t.radii.lg }]}
          />
        ) : null}
        
        <View style={styles.content}>
          {leftIcon && !loading ? (
            <View style={{ marginRight: t.spacing.sm }}>{leftIcon}</View>
          ) : null}
          
          {loading ? (
            <View style={{ marginRight: t.spacing.sm }}>
              <View style={[styles.loadingDot, { backgroundColor: textColor }]} />
            </View>
          ) : null}
          
          <Text style={[styles.label, { color: textColor }, textStyles]}>
            {label}
          </Text>
          
          {rightIcon && !loading ? (
            <View style={{ marginLeft: t.spacing.sm }}>{rightIcon}</View>
          ) : null}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.8,
  },
});
