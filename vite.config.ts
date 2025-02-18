import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
	plugins: [solidPlugin()],
	server: {
		port: 3000,
	},
	build: {
		target: 'esnext',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@blocks': path.resolve(__dirname, './src/blocks'),
			'@commands': path.resolve(__dirname, './src/commands'),
			'@css': path.resolve(__dirname, './src/css'),
			'@design': path.resolve(__dirname, './src/design'),
			'@ecommerce': path.resolve(__dirname, './src/ecommerce'),
			'@events': path.resolve(__dirname, './src/events'),
			'@multiplayer': path.resolve(__dirname, './src/multiplayer'),
			'@panels': path.resolve(__dirname, './src/panels'),
			'@plugins': path.resolve(__dirname, './src/plugins'),
			'@server': path.resolve(__dirname, './src/server'),
			'@toolbar': path.resolve(__dirname, './src/toolbar'),
			'@traits': path.resolve(__dirname, './src/traits'),
			'@types': path.resolve(__dirname, './src/types'),
			'@utilities': path.resolve(__dirname, './src/utilities'),
			'$components': path.resolve(__dirname, './src/components/')

		}
	}
});

