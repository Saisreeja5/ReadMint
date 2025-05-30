/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          keyframes: {
            tilt: {
              '0%, 100%': { transform: 'rotate(0deg)' },
              '50%': { transform: 'rotate(5deg)' },
            },
          },
          animation: {
            tilt: 'tilt 2s ease-in-out infinite',
          },
        },
      },
    plugins: [],
  };
  