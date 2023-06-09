/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'hover:bg-purple-500',
    'bg-purple-500',
    {
      pattern: /(from|to)-(green|blue|gray|red|purple)-(50|100|200|300|400|500|600|700|800|900|950)/
    },
    {
      pattern: /(bg|color)-(green|blue|gray|red|purple)-(50|100|200|300|400|500|600|700|800|900|950)/
    },
    {
      pattern: /(text|mb)-(purple-600|1)/
    }
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
