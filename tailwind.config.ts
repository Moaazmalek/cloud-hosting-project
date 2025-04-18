import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        
        primary:{
         primary:"rgb(7,71,166)",
         accent:"rgb(0,82,204)",
         sidebar:"rgb(23,43,77)",
         background:"rgb(244,245,247)",
         text:"rgb(23,43,77)",
         card:"rgb(255,255,255)",
         ["muted-text"]:"rgb(107,119,140)"
        }

      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
