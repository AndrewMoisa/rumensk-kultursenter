import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#002147',
          50: '#e6eaf0',
          100: '#ccd5e1',
          200: '#99abc3',
          300: '#6681a5',
          400: '#335787',
          500: '#002147',
          600: '#001a39',
          700: '#00142b',
          800: '#000d1d',
          900: '#00070f',
        },
        gold: {
          DEFAULT: '#C5A059',
          50: '#f9f6ef',
          100: '#f3eddf',
          200: '#e7dbbf',
          300: '#dbc99f',
          400: '#cfb77f',
          500: '#C5A059',
          600: '#9e8047',
          700: '#776035',
          800: '#4f4023',
          900: '#282011',
        },
        ice: {
          DEFAULT: '#F0F4F8',
          50: '#ffffff',
          100: '#ffffff',
          200: '#ffffff',
          300: '#fafcfd',
          400: '#f5f8fb',
          500: '#F0F4F8',
          600: '#c0c3c6',
          700: '#909295',
          800: '#606163',
          900: '#303132',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
