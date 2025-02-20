import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { svelte } from '@sveltejs/vite-plugin-svelte';
//@ts-ignore
import tailwind from "@tailwindcss/vite";
import path from 'path';

export default defineConfig({

	optimizeDeps: {
		exclude: ['@sveltejs/vite-plugin-svelte'],
		include: [
			'monaco-editor/esm/vs/language/json/json.worker',
			'monaco-editor/esm/vs/language/css/css.worker',
			'monaco-editor/esm/vs/language/html/html.worker',
			'monaco-editor/esm/vs/language/typescript/ts.worker',
			'monaco-editor/esm/vs/editor/editor.worker'
		],
		esbuildOptions: {
			define: {
				global: 'globalThis'
			}
		}
	},
	worker: {
		format: 'es',
	},

	publicDir: "public", // Remove the ./ as it's not needed
	plugins: [
		solidPlugin(),
		svelte(),
		tailwind()
	],
	// server: {
	// 	port: 3000,
	// 	fs: {
	// 		strict: false,
	// 		allow: ['..']
	// 	}
	// },
	build: {
		target: 'esnext',

		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (!assetInfo.name) return 'assets/[name]-[hash][extname]';

					// Remove query parameters and preserve directory structure
					const [filename] = assetInfo.name.split('?');
					const extname = path.extname(filename);

					// Handle different asset types
					if (/\.(png|jpe?g|gif|svg|webp)$/i.test(extname)) {
						return `images/${filename}`;
					}
					if (/\.(woff2?|eot|ttf|otf)$/i.test(extname)) {
						return `fonts/${filename}`;
					}
					if (/\.css$/i.test(extname)) {
						return `css/${filename}`;
					}

					return filename;
				},
				chunkFileNames: 'js/[name]-[hash].js',
				entryFileNames: 'js/[name]-[hash].js'
			}
		},
		assetsInlineLimit: 0,
		copyPublicDir: true,
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
			'$components': path.resolve(__dirname, './src/components'),
			'@framework': path.resolve(__dirname, './src/framework'),
			'/static': path.resolve(__dirname, './static'), // Updated to match publicDir
			'/fonts': path.resolve(__dirname, './static/fonts') // Updated to match publicDir
		}
	}
});
