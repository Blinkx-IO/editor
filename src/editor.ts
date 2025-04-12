import type { Plugin } from "grapesjs";
import { defaultStyles } from './design/styles/styles';
import { defaultPanels } from './panels/panels';
// declare global {
// 	interface Window {
// 		editorThemeConfig?: EditorTheme;
// 		editor?: VisualEditor.BlinkEditor;
// 		BlinkJS?: any;
// 	}
// }
import { setCommands } from './commands/commands';
import { setEvents } from './events/events';
import { setTraits } from './traits/traits';
import domtoimage from 'dom-to-image-more';
import { setUpPlugInOpts, setUpPlugins } from './additonalPlugins';

import { addDomComponents } from './blocks/blinkcontentmodel';
import breadCrumbs from './panels/breadcrumbs';
import ToggleClassSelectors from './panels/selectors';
import { defaultSelectorTemplate } from './panels/selectorManager';
// import { createElement } from 'react';
import { transformJSX, type JSXObject } from './plugins/codeParsers/jsxParserLegacy';
import { BlinkJS } from './editorConfig';
import { blockCategories } from './blocks/interfaces';
import { pageSettings, /*setProjectLinks*/ } from './panels/pageSettings';
import type { ItemMappingStatus } from "./global";

const blinkStylePrefix = 'blink-';
export let contentStatus: VisualEditor.status = "draft";
export let contentTitle = '';
let itemMappingState: ItemMappingStatus = "active";
export type CssModeTheming = { dark: string, light: string };
export type EditorTheme = {
	primaryBackgroundColor: CssModeTheming
	primaryBorderColor: CssModeTheming
	primaryTextColor: CssModeTheming
}
export type editorConfig = {
	projectData?: Record<string, unknown>;
	projectId: string;
	projectName: string;
	itemId: string | number;
	itemTitle: string;
	themePreference: themePreference;
	theme?: EditorTheme
	itemStatus: VisualEditor.status;
	dev?: boolean;
	browser?: boolean;
	itemMappingState?: ItemMappingStatus
	storageStrategy?: "local" | "remote";
	serverRoutes?: {
		assetManagerUrl?: string;
		storageManager?: {
			remote?: {
				urlStore: string,
				urlLoad: string
			}
		}

	};
}
type CategoryBackBoneType = {
	id: string;
	set: (arg0: string, arg1: boolean) => {
		(): any; new(): any; on: { (arg0: string, arg1: (opened: { get?: any; set?: (toggle: string, catToggle: boolean) => any; }) => void): void; new(): any; };
	};
}

export const configureEditor = async (config: editorConfig) => {
	const { projectData, itemId, projectId, serverRoutes, storageStrategy, theme } = config;
	let storageStrategyValue = storageStrategy ?? "local";
	let dev = config.dev ?? false;
	let browser = config.browser ?? true;
	let defaultProjectData: Record<string, unknown>;
	const { assetManagerUrl, storageManager } = serverRoutes ?? {};

	// Make theme available to imported components
	if (browser && theme) {
		window.editorThemeConfig = theme;
	}
	if (projectData) {
		defaultProjectData = projectData;
		//TODO: check proj data to set these
		// contentStatus.set(config.itemStatus);
		// contentTitle.set(config.itemTitle);
	} else {
		defaultProjectData = {
			pages: [
				{
					component: `<div>Start dragging your blocks here...</div>`
				}
			]
		};
		//TODO: if using frameworks this needs to be store/signals etd	
		contentStatus = config.itemStatus;
		contentTitle = config.itemTitle;
		//contentTitle.set(`New Content Item ${config.itemId}`);
	}

	const editor = BlinkJS.init({
		assetManager: {
			upload: assetManagerUrl ?? `/content/api/file-upload?project=${projectId}`,
			uploadName: 'image',
			multiUpload: false,
			autoAdd: true
		},
		blockManager: {
			appendTo: '#content-blocks',
			blocks: []
		},
		canvas: {
			//TODO add gridjs here
			//stylePrefix: blinkStylePrefix,
			//frameContent: '<!DOCTYPE html>',
			styles: [
				'/css/editor/canvas.css',
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', crossorigin: true, href: 'https://fonts.gstatic.com' },
				'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Oxygen:wght@300;400;700&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
			]
		},
		colorPicker: { appendTo: 'parent', offset: { top: 20, left: -175 } },

		container: '#editorCanvas',
		deviceManager: {
			devices: [
				{
					name: 'Desktop',
					width: '' // default size
				},
				{
					name: 'Tablet',
					width: '750px', //"641px",
					widthMedia: '850px' //"700px",
				},
				{
					name: 'Mobile',
					width: '414px', // this value will be used on canvas width
					widthMedia: '480px' // this value will be used in CSS @media
				},
				{
					name: 'Mobile-Iphone',
					width: '414px', // this value will be used on canvas width
					widthMedia: '480px' // this value will be used in CSS @media
				}
			]
		},
		domComponents: {
			processor: (obj: JSXObject) => {
				//console.log(component);

				if (obj.tagName === 'div') {
					obj.type = 'box';
				}
				//Checks for JSX component types

				if (obj.$$typeof) return transformJSX(editor, obj);
				//check for vue or svelte lit and more
			}
			//components:[testComponent()],
			//stylePrefix:blinkStylePrefix
		},
		// fromElement: false,
		// height: '300px',
		layerManager: {
			appendTo: '.layers-container',
			hidable: true,
		},
		panels: {
			defaults: defaultPanels({
				itemTitle: config.itemTitle,
				themePreference: config.themePreference,
				theme: config.theme
			}),

		},
		plugins: setUpPlugins() as Plugin[],
		pluginsOpts: setUpPlugInOpts(),
		//NOTE: more investigation to be done on loading/perf
		projectData: defaultProjectData,
		selectorManager: {
			appendTo: '.selector-container',
			states: [
				{ name: 'hover', label: 'Hover' },
				{ name: 'active', label: 'Click' },
				{ name: 'focus', label: 'Focus' },
				{ name: 'focus-within', label: 'Focus Within' },
				{ name: 'focus-visible', label: 'Focus Visible' },
				{ name: 'nth-of-type(2n)', label: 'Even/Odd' },
				{ name: 'visited', label: 'Visited' },
				{ name: 'placeholder-shown', label: 'Placholder Visible' }
			],
			//TODO: redo this
			render: defaultSelectorTemplate
		},
		showOffsets: true,
		showOffsetsSelected: true,
		storageManager: {
			type: storageStrategyValue,
			stepsBeforeSave: 1,
			onLoad: (data) => {
				if (dev) {
					console.log(data);
				}
				return {
					...data
				};
			},
			options: {
				local: storageStrategyValue === "local" ? { key: "blink-" } : undefined,

				remote: storageStrategyValue === "remote" ? {
					urlStore: storageManager?.remote?.urlStore ?? `/content/api/store?itemId=${itemId}&project=${projectId}`,
					urlLoad: storageManager?.remote?.urlLoad ?? `/content/api/load?itemId=${itemId}`,
					headers: {
						"Content-Type": "application/json"
					},

					//Pass custom server data here
					onLoad: (data) => {
						if (dev) {
							console.log(data);
						}
						return {
							...data
						};
					},

					async onStore(data, editor) {
						if (browser) {
							//const screenshot = null/
							//const domToImage = await import('dom-to-image-more');
							let screenshot = null;
							try {

								//editor.Canvas.getDocument().body.querySelector('[data-gjs-type="wrapper"]')
								//editor.Canvas.getDocument().body
								//const canvasEl = editor.Canvas.getDocument().body.querySelector('[data-gjs-type="wrapper"]')
								screenshot = await domtoimage.toPng(editor.Canvas.getDocument().body, {
									//@ts-ignore
									filter: (node: HTMLElement) => {
										//console.log(node.tagName,node)
										//console.log(node.tagName,node)

										if (node.tagName === 'LINK') {
											return false
										}

										/*if(node.tagName ==='IMG'){
											console.log('starting fetch')
											const imageElement = node as HTMLImageElement;
											const imageUrl = imageElement.src;
											// Fetch the image
											await fetch(imageUrl)
											.then(response => {
											if (response.ok) {
												return response.blob(); // Convert the response to a Blob
											}
											throw new Error('Network response was not ok.');
											})
											.then(blob => {
											// Now you have the image as a Blob
											// You can use this blob as needed, for example, to create a local URL for the image
											const blobUrl = URL.createObjectURL(blob);

											// Optionally, you can display this blob as an image in your HTML
											// For demonstration, let's assume you have an img element with id 'blobImage'
											document.getElementById('blobImage').src = blobUrl;

											console.log('Blob URL:', blobUrl);
											})
											.catch(error => console.error('Error fetching the image:', error));
											return false
										}*/

										return true
									},

									//imagePlaceholder:'https://via.placeholder.com/150',
								}).catch((e: Error) => {
									console.warn(e)
									return null;
								});
							} catch (error) {
								console.warn(error)
							}


							const status = contentStatus;
							const title = contentTitle;
							const getMappingState = itemMappingState;
							if (["inactive", "active"].includes(getMappingState)) {
								itemMappingState = "pending";
							}

							let item_preview = null;
							if (screenshot) {
								item_preview = screenshot;
							}

							return {
								...data,
								item_preview,
								status: status ?? null,
								title,
								itemMappingState: itemMappingState
							};
						}
					}

					/*onStore:(data : editorStorageObject)=>{
						console.log(data)
					}*/
				} : undefined
			},

			//@deprecated
			id: 'blink-'
		},
		styleManager: {
			appendTo: '.styles-container',
			clearProperties: true,
			sectors: defaultStyles
		},
		stylePrefix: blinkStylePrefix,
		traitManager: {
			appendTo: '.traits-container'
		},
		width: 'auto'
	});

	//Init Commands for Editor after config
	addDomComponents(editor, dev);
	//addfeatureBlocks(editor);
	setCommands(editor, dev);
	setEvents(editor, projectId, dev);
	setTraits(editor, dev);

	//TODO Fix this
	//loadAllDynamicBlocks(editor);
	breadCrumbs(editor, {}, dev);
	//TODO bug test this further
	//addCustomStyleTraits(editor);
	ToggleClassSelectors(editor, {}, dev);

	// editor.renderJSX = createElement;

	if (dev && browser) {
		window.BlinkJS = BlinkJS;
		// window.JSXComponents = [testComponent()];
	}
	if (browser) {
		window.editor = editor;
	}

	// editor.on('command:run:show-layers', () => {
	//
	// 	console.log('layers being toggled')
	// });

	editor.on('load', async () => {
		const inputVal = document.getElementById('panel__Title') as HTMLInputElement;

		function Logger(...log: any) {
			console.warn(
				'Values being exposed by logger, make sure to turn this off in production mode.'
			);
			console.warn(log);
		}

		pageSettings(editor);

		inputVal.addEventListener('change', () => {
			editor.store();
		});

		//Rearange or place custom built components
		const imports = document.querySelector('#content-blocks button');
		imports?.parentNode?.appendChild(imports);

		//TODO extend this functionality outside of here
		const categories = editor.BlockManager.getCategories();
		//TODO: check if this is still needed
		categories.each((category: CategoryBackBoneType) => {
			//console.log(category)
			//Set defaults to close here
			if (category.id != blockCategories.basic) {
				category
					.set('open', false)
					.on(
						'change:open',
						(opened: { get?: any; set?: (toggle: string, catToggle: boolean) => any }) => {
							opened.get('open') &&
								categories.each(
									(category: { set: (toggle: string, catToggle: boolean) => any }) => {
										category !== opened && category.set('open', false);
									}
								);
						}
					);
			}
		});

		const wrapper = document.getElementById('editor-wrapper') as HTMLElement;
		wrapper.dataset.load = 'loaded';

		if (dev) {
			//Logger(editor, editor.Panels.getPanels(), editor.BlockManager);
			Logger('To access the editor object use the global editor in the console');
		}


		addKeyMapFromPanel({ editor, panelId: 'edit-actions', panelCommand: 'sw-visibility', hotKey: 'alt+g' });
		addKeyMapFromPanel({ editor, panelId: 'panel-switcher', panelCommand: 'preview', hotKey: 'alt+p' });
		addKeyMapFromPanel({ editor, panelId: 'panel__left', panelCommand: 'show-layers', hotKey: 'alt+l' });
		addKeyMapFromPanel({ editor, panelId: 'edit-actions', panelCommand: 'edit-code', hotKey: 'alt+c' });
		addKeyMapFromPanel({ editor, panelId: 'panel__left', panelCommand: 'show-blocks', hotKey: 'alt+b' });

		if (storageStrategyValue == "local") {
			if (projectData) {
				if (projectData.css) {
					const localCss = projectData.css;
					if (typeof localCss == 'string') {
						editor.Css.addRules(localCss);

					}

				}

			}
		}

	});

	return editor;
};
export function addKeyMapFromPanel(config: { editor: VisualEditor.BlinkEditor, panelId: VisualEditor.PanelIdNames, panelCommand: VisualEditor.PanelCommands, hotKey: string }) {
	const { editor, hotKey, panelCommand, panelId } = config;

	//TODO check if panel has other buttons, then check if they are active, if they are active close them

	editor.Keymaps.add(`bx:${panelCommand}`, hotKey, (_) => {
		const panelButton = editor.Panels.getButton(panelId, panelCommand);
		if (editor.Commands.isActive(panelCommand)) {
			editor.stopCommand(panelCommand);
			if (panelButton) panelButton.set('active', false);
		} else {
			editor.runCommand(panelCommand);
			if (panelButton) panelButton.set('active', true);
		}
	});
};
