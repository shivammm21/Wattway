// src/constants/theme.ts
import React, { createContext, useContext, PropsWithChildren } from 'react';
import { TextStyle } from 'react-native';

type Colors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textDim: string;
  success: string;
  danger: string;
  warning: string;
  gradient: string[];
  gradientPrimary: string[];
  gradientAccent: string[];
  white: string;
  black: string;
  overlay: string;
};

type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};

type Radii = {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  round: number;
};

type Typography = {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  body: TextStyle;
  caption: TextStyle;
  button: TextStyle;
  label: TextStyle;
};

export type AppTheme = {
  colors: Colors;
  spacing: Spacing;
  radii: Radii;
  typography: Typography;
};

export const theme: AppTheme = {
  colors: {
    primary: '#10b981',
    primaryDark: '#059669',
    primaryLight: '#34d399',
    accent: '#06b6d4',
    background: '#0f172a',
    surface: '#1e293b',
    card: '#334155',
    border: '#475569',
    text: '#f8fafc',
    textDim: '#cbd5e1',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    gradient: ['#0f172a', '#1e293b', '#334155'],
    gradientPrimary: ['#10b981', '#34d399', '#6ee7b7'],
    gradientAccent: ['#06b6d4', '#22d3ee', '#67e8f9'],
    white: '#ffffff',
    black: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 999,
  },
  typography: {
    h1: { fontSize: 36, fontWeight: '800', letterSpacing: -0.5, lineHeight: 44 },
    h2: { fontSize: 28, fontWeight: '700', letterSpacing: -0.25, lineHeight: 36 },
    h3: { fontSize: 22, fontWeight: '600', letterSpacing: 0, lineHeight: 28 },
    title: { fontSize: 18, fontWeight: '600', letterSpacing: 0, lineHeight: 24 },
    subtitle: { fontSize: 16, fontWeight: '500', letterSpacing: 0.15, lineHeight: 22 },
    body: { fontSize: 15, fontWeight: '400', lineHeight: 22, letterSpacing: 0.25 },
    caption: { fontSize: 12, fontWeight: '400', letterSpacing: 0.4, lineHeight: 16 },
    button: { fontSize: 16, fontWeight: '700', letterSpacing: 0.5, lineHeight: 20 },
    label: { fontSize: 14, fontWeight: '500', letterSpacing: 0.1, lineHeight: 20 },
  },
};

const ThemeContext = createContext<AppTheme>(theme);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  return React.createElement(ThemeContext.Provider, { value: theme }, children);
};

export const useTheme = () => useContext(ThemeContext);

export { ThemeContext };