export const COLORS = {
  primary: '#00CCBC',
  primaryDark: '#00A89D',
  primaryLight: '#E6FAF8',
  secondary: '#FF6B6B',
  white: '#FFFFFF',
  black: '#1A1A2E',
  gray: '#6B7280',
  lightGray: '#F3F4F6',
  mediumGray: '#D1D5DB',
  darkGray: '#374151',
  background: '#F8F9FA',
  cardBg: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  overlay: 'rgba(0,0,0,0.5)',
  star: '#FFD700',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  xlarge: 24,
  xxlarge: 32,
  padding: 16,
  margin: 16,
  radius: 12,
  radiusSmall: 8,
  radiusLarge: 20,
  icon: 24,
  iconLarge: 32,
  headerHeight: 60,
  tabBarHeight: 80,
  cardWidth: 280,
};

export const FONTS = {
  h1: { fontSize: 30, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  h3: { fontSize: 20, fontWeight: '600' },
  h4: { fontSize: 16, fontWeight: '600' },
  body1: { fontSize: 16, fontWeight: 'normal' },
  body2: { fontSize: 14, fontWeight: 'normal' },
  body3: { fontSize: 12, fontWeight: 'normal' },
  caption: { fontSize: 10, fontWeight: 'normal' },
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

export default { COLORS, SIZES, FONTS, SHADOWS };
