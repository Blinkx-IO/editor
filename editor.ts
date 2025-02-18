//import type { BlinkJS } from './editorTypes';
import type { Plugin } from "grapesjs";
import { defaultStyles } from './design/styles/styles';
import { defaultPanels } from './panels/panels';
//import { components, style } from './templates/templates';
import { setCommands } from './commands/commands';
import { setEvents } from './events/events';
import { setTraits } from './traits/traits';
//import { loadAllDynamicBlocks } from '../controller/dynamicBlocks';
import domtoimage from 'dom-to-image-more';
import { setUpPlugInOpts, setUpPlugins } from './additonalPlugins';

import { addDomComponents } from './blocks/blinkcontentmodel';
import breadCrumbs from './panels/breadcrumbs';
import ToggleClassSelectors from './panels/selectors';
import { defaultSelectorTemplate } from './panels/selectorManager';
// import { testComponent } from './plugins/codeParsers/test';
import { createElement } from 'react';
import { transformJSX, type JSXObject } from './plugins/codeParsers/jsxParserLegacy';
import { BlinkJS } from './editorConfig';
import { blockCategories } from './blocks/interfaces';
// import { editorPanels } from './panels/state';
// import { html, render } from 'lit-html';
//import { bindStatusUpdates } from './panels/status';
import { pageSettings, /*setProjectLinks*/ } from './panels/pageSettings';
import type { ItemMappingStatus } from "./global";
// import { itemMappingState } from "$editorItem/stores.client";
// import { get, writable, type Writable } from 'svelte/store';

const blinkStylePrefix = 'blink-';
// export const contentStatus: Writable<VisualEditor.status> = writable();
// export const contentTitle: Writable<string> = writable();
export let contentStatus: VisualEditor.status = "draft";
export let contentTitle = '';
let itemMappingState: ItemMappingStatus = "active";
export type editorConfig = {
	projectData?: Record<string, unknown>;
	projectId: string;
	projectName: string;
	itemId: string | number;
	itemTitle: string;
	themePreference: themePreference;
	itemStatus: VisualEditor.status;
	dev?: boolean;
	browser?: boolean;
	itemMappingState: ItemMappingStatus
}

// interface installedApps {
// 	valid: boolean;
// 	message: string;
// 	meta?: { apps: apps };
// }

// interface appDetails {
// 	enabled: boolean;
// 	activated: boolean;
// }
// interface apps {
// 	contacts: appDetails;
// 	'e-commerce': appDetails;
// }

//TODO: Add more option to config
export const configureEditor = async (config: editorConfig) => {
	const { projectData, itemId, projectId, } = config;
	let dev = config.dev ?? false;
	let browser = config.browser ?? false;
	let defaultProjectData;
	if (projectData) {
		defaultProjectData = projectData;
		//TODO: check proj data to set these
		// contentStatus.set(config.itemStatus);
		// contentTitle.set(config.itemTitle);
	} else {
		defaultProjectData = {
			pages: [
				{
					component: `
                    <div>Start dragging your blocks here...</div>
                  `
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
			upload: `/content/api/file-upload?project=${projectId}`,
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


			processor: (component: JSXObject) => {
				//console.log(component);

				if (component.tagName === 'div') {
					component.type = 'box';
				}
				//Checks for JSX component types

				if (component.$$typeof) return transformJSX(editor, component);
				//check for vue or svelte lit and more
			}
			//components:[testComponent()],
			//stylePrefix:blinkStylePrefix
		},
		fromElement: false,
		height: '300px',
		layerManager: {

			appendTo: '.layers-container',
			hidable: true,

			//stylePrefix:blinkStylePrefix,
			//stylePrefix: '',
		},
		//layers: {
		//stylePrefix:blinkStylePrefix,
		//},
		panels: {
			defaults: defaultPanels({
				itemTitle: config.itemTitle,
				themePreference: config.themePreference
			}),

			//delayBtnsShow:true
			//stylePrefix:blinkStylePrefix
		},


		plugins: setUpPlugins() as Plugin[],
		pluginsOpts: setUpPlugInOpts(),
		projectData: defaultProjectData,

		selectorManager: {

			appendTo: '.selector-container',

			//stylePrefix:blinkStylePrefix,
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
			//componentFirst: false,
			//TODO redo this
			render: defaultSelectorTemplate
		},
		showOffsets: true,
		showOffsetsSelected: true,
		storageManager: {
			type: 'remote',
			stepsBeforeSave: 1,

			options: {
				remote: {
					urlStore: `/content/api/store?itemId=${itemId}&project=${projectId}`,
					urlLoad: `/content/api/load?itemId=${itemId}`,
					headers: {
						"Content-Type": "application/json"
					},
					/*fetchOptions:(a)=>{
						
						return{
							method:"POST",

						}
					},*/
					//Pass custom server data here
					onLoad: (data) => {
						//console.log(data);
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

							//!check for status here
							//console.log(screenshot)
							let item_preview = null;
							if (screenshot) {
								item_preview = screenshot;
								//console.log(data.item_preview)
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
				}
			},

			//@deprecated
			id: 'blink-'
		},
		//style: style ?? undefined,
		styleManager: {
			appendTo: '.styles-container',
			clearProperties: true,
			sectors: defaultStyles
			//stylePrefix:blinkStylePrefix,
		},
		stylePrefix: blinkStylePrefix,
		//pStylePrefix:blinkStylePrefix,
		traitManager: {
			appendTo: '.traits-container' //'.traits-container',
			//stylePrefix:blinkStylePrefix,
		},
		width: 'auto'
	});

	//Init Commands for Editor after config
	addDomComponents(editor);
	//addfeatureBlocks(editor);
	setCommands(editor);
	setEvents(editor, projectId);
	setTraits(editor);

	//TODO Fix this
	//loadAllDynamicBlocks(editor);
	breadCrumbs(editor, {});
	//TODO bug test this further
	//addCustomStyleTraits(editor);
	ToggleClassSelectors(editor);

	editor.renderJSX = createElement;

	if (dev && browser) {
		window.BlinkJS = BlinkJS;
		// window.JSXComponents = [testComponent()];
	}
	if (browser) {
		window.editor = editor;
	}

	//!Refactor?
	editor.on('load', async () => {
		const inputVal = document.getElementById('panel__Title') as HTMLInputElement;
		//const idNumber = document.getElementById('idNumber') as HTMLElement;
		//idNumber.innerText = `ID:${config.itemId}`;
		//const dataExplorer: HTMLElement = document.getElementById("data-explorer")!;
		//let templateManager = document.querySelector('#template-manager')
		//const templateExplorer = document.createElement('button');

		//TODO this is a temporary modification to a placholder
		//const addClassInput = document.getElementById('blink-clm-new') as HTMLInputElement;
		//addClassInput.placeholder = 'Add new class...';

		//feather.replace();
		function Logger(...log: any) {
			console.warn(
				'Values being exposed by logger, make sure to turn this off in production mode.'
			);
			console.warn(log);
		}

		/*function openDataModal(title: string, content: string | HTMLTableElement | HTMLElement) {
			editor.Modal.setTitle(title);
			editor.Modal.setContent(content);
			editor.Modal.open();
		}*/
		/*function createTableString(table: any[]) {
				const newTable = document.createElement("table");
				const container = document.createElement("tbody");

				table.forEach((element: any[]) => {
					const row = document.createElement("tr");
					row.classList.add("blink-two-color");
					element.forEach((item: string) => {
						const cell = document.createElement("td");
						cell.innerText = item;
						row.append(cell);
					});
					container.append(row);
				});

				newTable.append(container);
				return newTable;
			}*/
		//bindStatusUpdates(editor);
		pageSettings(editor);

		//pass editor issue blinkx #8
		//pass data from server here on inital load
		//await setProjectLinks(editorConfig.collection!, editor);

		/*const dataParserScript = function () {
			if (dev) console.log('Opening Data Parser');
		};*/

		/*templateExplorer.addEventListener('click', () => {
			openDataModal('Template Manager', showTemplates());
		});*/

		/*editor.Commands.add('data-explorer', (editor: any) => {
			if (dev) console.log(editor, 'Has expanded');
			dataParserScript();
		});*/

		inputVal.addEventListener('change', () => {
			editor.store();
		});

		//TODO Add a better check here
		/*if (editorTemplate != null) {
			//console.log("Setting title");
			//inputVal.value = `New Content Item ${temporaryPostIdentifier.item_id}`;
			inputVal.value = 'Untitled';
			//@ts-ignore
			editor.store();
		} else {
			//inputVal.value = `Untitled Content Item ${itemID}`
		}*/

		//Rearange or place custom built components
		const imports = document.querySelector('#content-blocks button');
		imports?.parentNode?.appendChild(imports);

		//TODO extend this functionality outside of here
		const categories = editor.BlockManager.getCategories();
		//@ts-ignore
		categories.each((category) => {
			//console.log(category)
			//Set defaults to close here
			//@ts-ignore
			if (category.id != blockCategories.basic) {
				category
					.set('open', false)
					//@ts-ignore
					.on(
						'change:open',
						(opened: { get?: any; set?: (toggle: string, catToggle: boolean) => any }) => {
							opened.get('open') &&
								//@ts-ignore
								categories.each(
									(category: { set: (toggle: string, catToggle: boolean) => any }) => {
										category !== opened && category.set('open', false);
									}
								);
						}
					);
			}
		});

		//Modify Block Option Here and create the htmlelement in the toolbar
		//! blinkx #5
		//createPopUpToolbar();

		const wrapper = document.getElementById('editor-wrapper') as HTMLElement;
		wrapper.dataset.load = 'loaded';

		if (dev) {
			//Logger(editor, editor.Panels.getPanels(), editor.BlockManager);
			Logger('To access the editor object use the global editor in the console');
		}

		//const loader = document.getElementById('initial-loader') as HTMLElement;
		//loader.remove();

		//const activePanel = editorPanels().leftPanelContainer.querySelector(".blink-pn-active") as HTMLElement;
		//if(activePanel)activePanel.click();

		// const iframe = document.querySelector('.blink-frame') as HTMLIFrameElement;
		// const innerDoc = iframe.contentDocument || iframe.contentWindow!.document;

		// interface MenuCommand {
		// 	name: string;
		// 	key: string;
		// 	command: string;
		// 	toggleable: boolean;
		// }

		/*function runCommand(command: MenuCommand) {
			//editor.Commands.isActive
			if (command.toggleable && editor.Commands.isActive(command.command)) {
				editor.stopCommand(command.command);
			} else {
				editor.runCommand(command.command);
			}
			editor.stopCommand('secondary-menu');
			document.removeEventListener('click', closeMenu);
			innerDoc.body.removeEventListener('click', closeMenu);
		}*/
		// const menuItem: MenuCommand[] = [
		// 	{
		// 		name: 'Select Parent',
		// 		key: 'A',
		// 		command: 'core:component-exit',
		// 		toggleable: false
		// 	},
		// 	{ name: 'Copy', key: '⌘+c', command: 'core:copy', toggleable: false },
		// 	{ name: 'Paste', key: '⌘+v', command: 'core:paste', toggleable: false },
		// 	{ name: 'Undo', key: '⌘+z', command: 'core:undo', toggleable: false },
		// 	{ name: 'Redo', key: '⌘+shift+z', command: 'core:redo', toggleable: false },
		// 	//{name:"Edit Code",key:"⌘+shift+e",command:"html-edit",toggleable:false},
		// 	{ name: 'Toggle Fullscreen', key: '', command: 'expand-screen', toggleable: true },
		// 	{ name: 'Toggle Grid', key: 'alt+g', command: 'sw-visibility', toggleable: true },
		// 	{
		// 		name: 'Toggle Active Classes',
		// 		key: '',
		// 		command: 'toggle-classes',
		// 		toggleable: false
		// 	}
		// ];

		//move this to a separte module

		function addKeyMapFromPanel(config: { panelId: VisualEditor.PanelIdNames, panelCommand: VisualEditor.PanelCommands, hotKey: string }) {
			const { hotKey, panelCommand, panelId } = config;

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
		}
		addKeyMapFromPanel({ panelId: 'edit-actions', panelCommand: 'sw-visibility', hotKey: 'alt+g' });
		addKeyMapFromPanel({ panelId: 'panel-switcher', panelCommand: 'preview', hotKey: 'alt+p' });
		addKeyMapFromPanel({ panelId: 'panel__left', panelCommand: 'show-layers', hotKey: 'alt+l' });
		addKeyMapFromPanel({ panelId: 'edit-actions', panelCommand: 'edit-code', hotKey: 'alt+c' });
		addKeyMapFromPanel({ panelId: 'panel__left', panelCommand: 'show-blocks', hotKey: 'alt+b' });

		//TODO redo slide/state logic
		//addKeyMapFromPanel({panelId:'panel-utilities',panelCommand:'show-styles',hotKey:'alt+s'});
		//addKeyMapFromPanel({panelId:'panel-utilities',panelCommand:'show-traits',hotKey:'alt+o'});
		/*const contextMenu = html`
			<div>
				${menuItem.map(
			(command) => html`
						<div
							@click=${() => runCommand(command)}
							class="my-1 cursor-pointer context-menu-items text-white flex items-center justify-between"
						>
							<div class="pl-3">${command.name}</div>
							<div class="pr-3">${command.key}</div>
						</div>
					`
		)}
			</div>
		`;*/
		//if(editorPanels()?.contextMenu){	
		////render(contextMenu, editorPanels().contextMenu);
		//}
		/*function toggleContextMenu(e: MouseEvent) {
			editorPanels().contextMenu.dataset.xPosition = `${e.clientX}`;
			editorPanels().contextMenu.dataset.yPosition = `${e.clientY}`;
			editor.Commands.isActive('secondary-menu')
				? editor.stopCommand('secondary-menu')
				: editor.runCommand('secondary-menu');
		}*/

		/*function closeMenu(e: MouseEvent) {
			const childEl = e.target as HTMLElement;

			if (
				editor.Commands.isActive('secondary-menu') &&
				e.target !== editorPanels().contextMenu &&
				!editorPanels().contextMenu.contains(childEl)
			) {
				editor.stopCommand('secondary-menu');

				document.removeEventListener('click', closeMenu);

				innerDoc.body.removeEventListener('click', closeMenu);
			}
		}*/

		/*innerDoc.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			toggleContextMenu(e);
			innerDoc.body.addEventListener('click', (e) => closeMenu(e));
			document.addEventListener('click', (e) => closeMenu(e));
		});*/

		/*document.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				toggleContextMenu(e);
				document.addEventListener("click", (e) => closeMenu(e));
				innerDoc.body.addEventListener("click", (e) => closeMenu(e));
			});*/

		//Content in Canvas iframe
		//const frameBody = innerDoc.querySelector('.gjs-dashed') as HTMLBodyElement;
		//frameBody.classList.add('blink-dashed');
		//frameBody.classList.remove('gjs-dashed');
	});

	return editor;
};
//})();
