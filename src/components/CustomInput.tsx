// src/components/CustomInput.tsx
import React, { useState, useRef } from 'react';
import { 
  TextInput, 
  View, 
  Text, 
  StyleSheet, 
  TextInputProps, 
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../constants/theme';

type InputVariant = 'default' | 'outlined' | 'filled' | 'underlined';
type InputSize = 'small' | 'medium' | 'large';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  animated?: boolean;
};

export const CustomInput: React.FC<Props> = ({
  label,
  error,
  variant = 'default',
  size = 'medium',
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  animated = true,
  style,
  onFocus,
  onBlur,
  ...props
}) => {
  const t = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const focusProgress = useSharedValue(0);
  const scale = useSharedValue(1);

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { 
          paddingVertical: t.spacing.sm, 
          paddingHorizontal: t.spacing.lg,
          fontSize: 14,
          minHeight: 40,
        };
      case 'large':
        return { 
          paddingVertical: t.spacing.xl, 
          paddingHorizontal: t.spacing.xl,
          fontSize: 18,
          minHeight: 60,
        };
      default:
        return { 
          paddingVertical: t.spacing.lg, 
          paddingHorizontal: t.spacing.lg,
          fontSize: 16,
          minHeight: 52,
        };
    }
  };

  const getVariantStyles = () => {
    const baseStyles = {
      borderRadius: t.radii.lg,
      borderWidth: 1,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    };

    switch (variant) {
      case 'outlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          borderColor: isFocused ? t.colors.primary : t.colors.border,
        };
      case 'filled':
        return {
          ...baseStyles,
          backgroundColor: t.colors.surface,
          borderColor: isFocused ? t.colors.primary : 'transparent',
        };
      case 'underlined':
        return {
          ...baseStyles,
          backgroundColor: 'transparent',
          borderWidth: 0,
          borderBottomWidth: 2,
          borderRadius: 0,
          borderBottomColor: isFocused ? t.colors.primary : t.colors.border,
        };
      default:
        return {
          ...baseStyles,
          backgroundColor: t.colors.surface,
          borderColor: isFocused ? t.colors.primary : t.colors.border,
        };
    }
  };

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (animated) {
      focusProgress.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1.02, { damping: 15, stiffness: 300 });
    }
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (animated) {
      focusProgress.value = withTiming(0, { duration: 200 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
    onBlur?.(e);
  };

  const handleTextChange = (text: string) => {
    setIsFilled(text.length > 0);
    props.onChangeText?.(text);
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowColor: isFocused ? t.colors.primary : 'transparent',
    shadowOffset: { width: 0, height: isFocused ? 4 : 0 },
    shadowOpacity: isFocused ? 0.2 : 0,
    shadowRadius: isFocused ? 8 : 0,
    elevation: isFocused ? 4 : 0,
  }));

  const animatedLabelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      focusProgress.value,
      [0, 1],
      [t.colors.textDim, t.colors.primary]
    ),
    transform: [
      { 
        scale: withSpring(isFocused || isFilled ? 0.85 : 1, { 
          damping: 15, 
          stiffness: 300 
        }) 
      },
      { 
        translateY: withSpring(isFocused || isFilled ? -8 : 0, { 
          damping: 15, 
          stiffness: 300 
        }) 
      }
    ],
  }));

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
        </Animated.Text>
      )}
      
      <Animated.View style={[variantStyles, animatedContainerStyle]}>
        {leftIcon && (
          <View style={[styles.iconContainer, { marginRight: t.spacing.sm }]}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[
            styles.input,
            {
              color: t.colors.text,
              flex: 1,
              ...sizeStyles,
            },
            style,
          ]}
          placeholderTextColor={t.colors.textDim}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleTextChange}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={[styles.iconContainer, { marginLeft: t.spacing.sm }]}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && (
        <Animated.Text 
          style={[styles.errorText, { color: t.colors.danger }]}
        >
          {error}
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    fontFamily: undefined, // Use system font
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
