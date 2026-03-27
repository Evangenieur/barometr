import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Palette ─────────────────────────────────────────────────────────
      colors: {
        // Backgrounds
        void:     '#05080C',
        base:     '#0A0F16',
        surface:  '#0F1923',
        elevated: '#162130',
        overlay:  '#1C2B3D',

        // Borders
        'border-subtle':  '#1E2D3D',
        'border-default': '#253447',
        'border-strong':  '#2E4460',
        'border-accent':  '#3D8EF0',

        // Text
        'text-primary':   '#E2EBF5',
        'text-secondary': '#8BA4BE',
        'text-muted':     '#4D6880',
        'text-inverse':   '#05080C',

        // Accent
        'accent-blue':     '#3D8EF0',
        'accent-blue-dim': '#1F5A9E',

        // Score / weather bands
        'score-excellent': '#22C55E',
        'score-good':      '#84CC16',
        'score-fair':      '#EAB308',
        'score-poor':      '#F97316',
        'score-critical':  '#EF4444',
        'score-nodata':    '#3A4A5C',
      },

      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'monospace'],
      },

      fontSize: {
        '2xs': ['10px', { lineHeight: '1.4', fontWeight: '500' }],
        xs:    ['11px', { lineHeight: '1.4', fontWeight: '400' }],
        sm:    ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        base:  ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        md:    ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        lg:    ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        xl:    ['22px', { lineHeight: '1.2', fontWeight: '700' }],
        '2xl': ['28px', { lineHeight: '1.1', fontWeight: '700' }],
        '3xl': ['40px', { lineHeight: '1.0', fontWeight: '800' }],
      },

      // ── Spacing ───────────────────────────────────────────────────────────
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
      },

      // ── Border radius ─────────────────────────────────────────────────────
      borderRadius: {
        none: '0',
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        full: '999px',
      },

      // ── Box shadows ───────────────────────────────────────────────────────
      boxShadow: {
        xs:     '0 1px 2px rgba(0,0,0,0.4)',
        sm:     '0 2px 8px rgba(0,0,0,0.5)',
        md:     '0 4px 16px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)',
        lg:     '0 8px 32px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.5)',
        accent: '0 0 0 1px #3D8EF0, 0 0 16px rgba(61,142,240,0.2)',
      },

      // ── Transitions ───────────────────────────────────────────────────────
      transitionDuration: {
        fast:    '100',
        default: '200',
        slow:    '350',
        spring:  '400',
      },

      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Keyframes & animations ────────────────────────────────────────────
      keyframes: {
        'slide-in-right': {
          '0%':   { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',    opacity: '1' },
        },
        'slide-in-up': {
          '0%':   { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        'slide-in-left': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)',     opacity: '1' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'toast-in': {
          '0%':   { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',   opacity: '1' },
        },
      },

      animation: {
        'slide-in-right': 'slide-in-right 200ms ease-out',
        'slide-in-up':    'slide-in-up 250ms ease-out',
        'slide-in-left':  'slide-in-left 200ms ease-out',
        'fade-in':        'fade-in 200ms ease-out',
        'toast-in':       'toast-in 150ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
