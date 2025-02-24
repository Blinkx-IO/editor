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
	publicDir: "public",
	plugins: [
		solidPlugin(),
		svelte(),
		tailwind()
	],
	build: {
		target: 'esnext',
		sourcemap: true,
		// cssCodeSplit: true,
		cssMinify: true,
		lib: {
			entry: {
				index: path.resolve(__dirname, 'src/index.ts'),
				'framework/svelte/index': path.resolve(__dirname, 'src/framework/svelte/index.ts'),
				'framework/solid/index': path.resolve(__dirname, 'src/framework/solid/index.ts'),
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'svelte',
				'solid-js',
				"solid-js/web",
				'solid-js/store',
				'grapesjs',
				'monaco-editor',
				// Add other external dependencies
			],
			output: {
				preserveModules: true,
				preserveModulesRoot: 'src',
				entryFileNames: '[name].js',
				assetFileNames: (assetInfo) => {
					if (!assetInfo.name) return 'assets/[name]-[hash][extname]';

					const [filename] = assetInfo.name.split('?');
					const extname = path.extname(filename);

					if (/\.(png|jpe?g|gif|svg|webp)$/i.test(extname)) {
						return `assets/images/${filename}`;
					}
					if (/\.(woff2?|eot|ttf|otf)$/i.test(extname)) {
						return `assets/fonts/${filename}`;
					}
					if (/\.css$/i.test(extname)) {
						return `assets/css/${filename}`;
					}

					return filename;
				}
			}
		},
		assetsInlineLimit: 0,
		copyPublicDir: true,
		outDir: 'dist',
		emptyOutDir: true,
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
			'/static': path.resolve(__dirname, './static'),
			'/fonts': path.resolve(__dirname, './static/fonts')
		}
	}
});
