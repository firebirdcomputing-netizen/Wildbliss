export const colors = {
  brand: {
    primary: '#163C8C',
    primaryHover: '#0f2a6b',
    secondary: '#ff6361',
    secondaryHover: '#e55a58',
    light: '#f8fafc',
    dark: '#1a202c',
  },
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
} as const;

export type BrandColors = typeof colors.brand;
export type NeutralColors = typeof colors.neutral;