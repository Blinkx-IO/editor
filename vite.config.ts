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
		closeBundle: async () => {
			console.log('Monaco workers bundled to workers directory');

			// Path they already exist in
			const existingDir = path.resolve(__dirname, 'dist/assets');

			// Target directory for workers
			const targetDir = path.resolve(__dirname, 'dist/workers');

			if (!fs.existsSync(targetDir)) {
				fs.mkdirSync(targetDir, { recursive: true });
			}

			// Copy all .js files from existingDir to targetDir
			try {
				if (fs.existsSync(existingDir)) {
					const files = fs.readdirSync(existingDir);

					// Filter for .js files
					const jsFiles = files.filter(file => file.endsWith('.js'));

					// Copy each .js file
					for (const file of jsFiles) {
						fs.copyFileSync(
							path.join(existingDir, file),
							path.join(targetDir, file)
						);
						console.log(`Copied ${file} to workers directory`);
					}

					console.log(`Copied ${jsFiles.length} .js files to workers directory`);
				} else {
					console.warn(`Source directory ${existingDir} does not exist`);
				}
			} catch (error) {
				console.error('Error copying worker files:', error);
			}

			console.log('Monaco worker files processing completed');
		}
	}
}





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
				'monaco-utils': path.resolve(__dirname, 'src/utilities/monaco-setup.ts'),
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
					// Define chunks for worker files - these will be placed in /workers directory
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

					// Check for Monaco worker files and place them in /workers directory
					if (filename.includes('worker')) {
						const workerTypes = ['editor', 'json', 'css', 'html', 'ts'];
						for (const type of workerTypes) {
							if (filename.includes(`${type}.worker`)) {
								return `workers/${type}.worker.js`;
							}
						}
					}

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
