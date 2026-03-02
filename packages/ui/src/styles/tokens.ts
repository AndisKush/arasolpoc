/**
 * Design System Tokens
 * Paleta: Laranja vibrante + Cinza meio-tom
 * Suporta Light e Dark mode
 */

// Cores base da paleta
export const palette = {
  // Laranja - Cor primária da marca
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Laranja principal
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  // Cinza meio-tom - Cor secundária
  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',  // Cinza meio-tom principal
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  // Cores de suporte
  success: {
    light: '#10b981',
    main: '#059669',
    dark: '#047857',
  },
  error: {
    light: '#ef4444',
    main: '#dc2626',
    dark: '#b91c1c',
  },
  warning: {
    light: '#fbbf24',
    main: '#f59e0b',
    dark: '#d97706',
  },
  info: {
    light: '#3b82f6',
    main: '#2563eb',
    dark: '#1d4ed8',
  },
} as const;

// Cores semânticas - Light Mode
export const lightColors = {
  // Marca
  primary: palette.orange[500],
  primaryHover: palette.orange[600],
  primaryActive: palette.orange[700],
  primaryLight: palette.orange[100],

  // Secundária
  secondary: palette.gray[500],
  secondaryHover: palette.gray[600],
  secondaryActive: palette.gray[700],
  secondaryLight: palette.gray[100],

  // Backgrounds
  background: '#ffffff',
  backgroundAlt: palette.gray[50],
  surface: '#ffffff',
  surfaceHover: palette.gray[50],

  // Texto
  text: palette.gray[900],
  textSecondary: palette.gray[600],
  textTertiary: palette.gray[500],
  textInverted: '#ffffff',

  // Bordas
  border: palette.gray[200],
  borderHover: palette.gray[300],
  borderFocus: palette.orange[500],

  // Estados
  success: palette.success.main,
  error: palette.error.main,
  warning: palette.warning.main,
  info: palette.info.main,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
} as const;

// Cores semânticas - Dark Mode
export const darkColors = {
  // Marca
  primary: palette.orange[400],
  primaryHover: palette.orange[500],
  primaryActive: palette.orange[600],
  primaryLight: palette.orange[900],

  // Secundária
  secondary: palette.gray[400],
  secondaryHover: palette.gray[300],
  secondaryActive: palette.gray[200],
  secondaryLight: palette.gray[800],

  // Backgrounds
  background: palette.gray[900],
  backgroundAlt: palette.gray[800],
  surface: palette.gray[800],
  surfaceHover: palette.gray[700],

  // Texto
  text: palette.gray[50],
  textSecondary: palette.gray[300],
  textTertiary: palette.gray[400],
  textInverted: palette.gray[900],

  // Bordas
  border: palette.gray[700],
  borderHover: palette.gray[600],
  borderFocus: palette.orange[500],

  // Estados
  success: palette.success.light,
  error: palette.error.light,
  warning: palette.warning.light,
  info: palette.info.light,

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
} as const;

// Espaçamento
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px

  // Aliases semânticos
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
} as const;

// Tipografia
export const fontSizes = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  md: '1rem',         // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
} as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

export const fontFamilies = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const;

// Bordas
export const radii = {
  none: '0',
  sm: '0.25rem',    // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const borderWidths = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// Sombras
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// Transições
export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const easings = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Z-index
export const zIndices = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

// Tema principal (light mode por padrão)
export const theme = {
  colors: lightColors,
  palette,
  spacing,
  fontSizes,
  fontWeights,
  lineHeights,
  fontFamilies,
  radii,
  borderWidths,
  shadows,
  transitions,
  easings,
  zIndices,
} as const;

// Tema dark
export const darkTheme = {
  ...theme,
  colors: darkColors,
} as const;

// Tipo inferido do tema para uso no styled-components
// Precisamos alargar o tipo das cores para aceitar strings gerais,
// caso contrário o TS reclama que as cores do dark mode não batem com os literais do light mode.
type ColorKey = keyof typeof lightColors;
export type ThemeType = Omit<typeof theme, 'colors'> & {
  colors: Record<ColorKey, string>;
};