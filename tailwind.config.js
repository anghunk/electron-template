/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				// Helpful Warmth Theme Colors
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				accent: 'var(--color-accent)',
				background: 'var(--color-background)',
				surface: 'var(--color-surface)',
				text: 'var(--color-text)',
				muted: 'var(--color-muted)',
				success: 'var(--color-success)',
				warning: 'var(--color-warning)',
				error: 'var(--color-error)',
				info: 'var(--color-info)',
				'border-light': 'var(--el-border-color-lighter)',
				'fill-light': 'var(--el-fill-color-lighter)',
				'fill-dark': 'var(--el-fill-color-darker)',
			},
			fontFamily: {
				heading: 'var(--font-heading)',
				body: 'var(--font-body)',
			},
			borderRadius: {
				theme: 'var(--radius)',
				'theme-sm': 'calc(var(--radius) * 0.5)',
				'theme-lg': 'calc(var(--radius) * 1.5)',
			},
			boxShadow: {
				card: '0 4px 24px rgba(217, 119, 87, 0.08), 0 1px 4px rgba(56, 56, 56, 0.04)',
				'card-hover': '0 2px 12px rgba(217, 119, 87, 0.08)',
				primary: '0 4px 12px rgba(217, 119, 87, 0.35)',
				'primary-lg': '0 4px 16px rgba(217, 119, 87, 0.3)',
				'primary-hover': '0 6px 20px rgba(217, 119, 87, 0.4)',
				logo: '0 2px 8px rgba(217, 119, 87, 0.12)',
			},
		},
	},
	plugins: [],
};
