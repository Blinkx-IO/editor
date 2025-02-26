import { defineConfig, type Plugin } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { svelte } from '@sveltejs/vite-plugin-svelte';
//@ts-ignore
import tailwind from "@tailwindcss/vite";
import path from 'path';
import fs from 'fs';
// Custom plugin to copy Monaco workers
//

const monacoWorkersBundle = (): Plugin => {
	return {
		name: 'monaco-workers-bundle',
		enforce: 'post',
		apply: 'build',
		resolveId(id) {
			// These conditions identify Monaco worker entry points to ensure
			// they're processed correctly
			if (id.includes('monaco-editor/esm/vs/editor/editor.worker')) {
				return id;
			}
			if (id.includes('monaco-editor/esm/vs/language/json/json.worker')) {
				return id;
			}
			if (id.includes('monaco-editor/esm/vs/language/css/css.worker')) {
				return id;
			}
			if (id.includes('monaco-editor/esm/vs/language/html/html.worker')) {
				return id;
			}
			if (id.includes('monaco-editor/esm/vs/language/typescript/ts.worker')) {
				return id;
			}
			return null;
		}
	}
}


const copyMonacoWorkers = (): Plugin => {
	return {
		name: 'copy-monaco-workers',
		closeBundle: async () => {
			console.log('Copying Monaco Editor workers...');
			const workersPath = path.resolve(__dirname, 'node_modules/monaco-editor/esm/vs');
			const targetDir = path.resolve(__dirname, 'dist/workers');

			if (!fs.existsSync(targetDir)) {
				fs.mkdirSync(targetDir, { recursive: true });
			}

			// Copy editor.worker.js
			fs.copyFileSync(
				path.resolve(workersPath, 'editor/editor.worker.js'),
				path.resolve(targetDir, 'editor.worker.js')
			);

			// Copy language workers
			fs.copyFileSync(
				path.resolve(workersPath, 'language/json/json.worker.js'),
				path.resolve(targetDir, 'json.worker.js')
			);

			fs.copyFileSync(
				path.resolve(workersPath, 'language/css/css.worker.js'),
				path.resolve(targetDir, 'css.worker.js')
			);

			fs.copyFileSync(
				path.resolve(workersPath, 'language/html/html.worker.js'),
				path.resolve(targetDir, 'html.worker.js')
			);

			fs.copyFileSync(
				path.resolve(workersPath, 'language/typescript/ts.worker.js'),
				path.resolve(targetDir, 'ts.worker.js')
			);

			console.log('Monaco Editor workers copied successfully!');
		}
	};
};

export default defineConfig({
	optimizeDeps: {
		exclude: ['@sveltejs/vite-plugin-svelte'],
		// include: ['dom-to-image-more'],
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
		tailwind(),
		monacoWorkersBundle()
		// copyMonacoWorkers()
	],
	build: {
		target: 'esnext',
		// sourcemap: true,
		// cssCodeSplit: true,
		cssMinify: true,
		lib: {
			entry: {
				index: path.resolve(__dirname, 'src/index.ts'),
				'framework/svelte/index': path.resolve(__dirname, 'src/framework/svelte/index.ts'),
				'framework/solid/index': path.resolve(__dirname, 'src/framework/solid/index.ts'),
				'monaco-utils': path.resolve(__dirname, 'src/monaco-setup.ts'),
			},
			fileName: (format, entryName) => `${entryName}.${format}.js`,
			formats: ['es'],

		},
		rollupOptions: {
			//So they dont get bundled into lib
			external: [
				'svelte',
				'solid-js',
				"solid-js/web",
				'solid-js/store',
				'react'
			],
			output: {
				// preserveModules: true,
				preserveModulesRoot: 'src',
				entryFileNames: '[name].js',
				inlineDynamicImports: false,
				manualChunks: {
					'monaco-editor': ['monaco-editor'],
					// Define chunks for worker files
					'editor.worker': ['monaco-editor/esm/vs/editor/editor.worker'],
					'json.worker': ['monaco-editor/esm/vs/language/json/json.worker'],
					'css.worker': ['monaco-editor/esm/vs/language/css/css.worker'],
					'html.worker': ['monaco-editor/esm/vs/language/html/html.worker'],
					'ts.worker': ['monaco-editor/esm/vs/language/typescript/ts.worker'],
				},
				assetFileNames: (assetInfo) => {
					if (!assetInfo.name) return 'assets/[name]-[hash][extname]';

					const [filename] = assetInfo.name.split('?');
					const extname = path.extname(filename);
					// console.log("look here", filename)
					// if (filename.includes('worker')) {
					// 	const workerTypes = ['editor', 'json', 'css', 'html', 'ts'];
					// 	for (const type of workerTypes) {
					// 		if (filename.includes(`${type}.worker`)) {
					// 			return `assets/${type}.worker.js`;
					// 		}
					// 	}
					// }

					if (/\.(png|jpe?g|gif|svg|webp)$/i.test(extname)) {
						return `assets/images/${filename}`;
					}
					if (/\.(woff2?|eot|ttf|otf)$/i.test(extname)) {
						return `assets/fonts/${filename}`;
					}
					if (/\.css$/i.test(extname)) {
						return `assets/css/${filename}`;
					}
					// if (assetInfo.name.endsWith('.worker.js')) {
					// 	return 'workers/[name][extname]';
					// }

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
