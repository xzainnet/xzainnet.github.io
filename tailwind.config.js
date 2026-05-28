/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          green:  '#00ff88',
          blue:   '#00cfff',
          purple: '#a855f7',
          red:    '#ff4455',
          bg:     '#0a0d14',
          surface:'#111520',
          card:   '#161b27',
          border: '#1e2535',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'scan-line':  'scanLine 8s linear infinite',
        'type-cursor':'typeCursor 1s step-end infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,255,136,0.2)' },
          '50%':      { boxShadow: '0 0 40px rgba(0,255,136,0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typeCursor: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
