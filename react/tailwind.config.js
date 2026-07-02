/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        xs: '11px', sm: '12px', md: '13px', lg: '14px',
        xl: '15px', '2xl': '16px', '3xl': '18px', '4xl': '24px',
      },
      colors: {
        surface: {
          base: '#000000',
          raised: '#181818',
          muted: '#fbbf24',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b3b3b3', // AA-safe
        },
        accent: '#cc3366',
        'on-accent': '#000000',
        error: '#ff5a5f',
        border: '#333333',
      },
      spacing: {
        s1: '12px', s2: '14.4px', s3: '24px', s4: '48px', s5: '96px',
      },
      borderRadius: {
        xs: '3px', pill: '50px',
      },
      transitionDuration: {
        instant: '300ms',
      },
    },
  },
  plugins: [],
};