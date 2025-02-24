/// <reference types="solid-js" />
import /* grapesjs, */ { type Components } from 'grapesjs';
import { BlinkJS } from './editorConfig';
import type {
	Editor,
	EditorConfig,
	AssetManagerConfig,
	DomComponentsConfig,
	PanelProps,
	CanvasConfig,
	SelectorManagerConfig,
	ButtonProps,
	StorageManagerConfig,
	Component,
	ComponentManager,
	AddComponentTypeOptions,
	ComponentView,
	ComponentViewDefinition,

} from 'grapesjs';

import type { PanelCommands as CommandNames, PanelIds } from "./panels/panels";
import type { JSX } from 'react';

interface BlinkUser {
	id: string;
	name?: string;
	firstName?: string;
	lastName?: string;
	fullname?: string;
	role?: string;
	orgid?: number;
	orgName?: string;
	email: string;
	image?: string;
}

export const domEvents = [
	// Mouse Events
	"click",
	"dblclick",
	"mousedown",
	"mouseup",
	"mousemove",
	"mouseover",
	"mouseout",
	"mouseenter",
	"mouseleave",

	// Keyboard Events
	"keydown",
	"keyup",
	"keypress",

	// Form Events
	"submit",
	"change",
	"focus",
	"blur",

	// Touch Events
	"touchstart",
	"touchmove",
	"touchend",
	"touchcancel",

	// UI Events
	"scroll",
	"resize",

	// Drag Events
	"drag",
	"dragstart",
	"dragend",
	"dragover",
	"dragenter",
	"dragleave",
	"drop"
] as const;

//export type ComponentViewEvents = typeof domEvents[number];
type EventHandler = (event: Event) => void;
type ComponentViewEvents = {
	[K in typeof domEvents[number]]?: EventHandler | string;
};
const seoToolKitDefault = {
	siteTitle: "",
	siteDescription: "",
	favicon: "",
	metaImage: "",
	keywords: "",
	author: ""
}

// export type seoToolKit = typeof seoToolKitDefault;
/*interface BlinkSession extends Omit<Session, 'user'> {
	user: BlinkUser;
}*/

export const itemMappingStatus = ['active', 'inactive', 'pending', 'deprecated'] as const;
export type ItemMappingStatus = typeof itemMappingStatus[number];

export const itemStatus = ['draft', 'published', 'inactive', 'archived', 'deleted'] as const;


export type ProjectData = {
	id: string;
	project: string;
	projectName: string;
	title: string;
	status: VisualEditor.status;
	urlPath: string;
	seoToolkit: VisualEditor.seoToolKit;
	body: {
		"blink-components": "";
		"blink-styles": [];
		"blink-assets": [];
	};
	itemEditorStatus?: ItemMappingStatus;
}
export type editorStorageObject = {
	pages: Record<any, any>[];
	customHtml: string;
	title: string;
	status: status;
	csvParser: any;
	components: Components;
	url: string;
	dynamic: boolean;
	'seo-toolkit': seoToolKit;
	fonts: string[];
	project: string;
	html: string;
	css: string;
	assets: string[];
	item_preview?: string;
	itemMappingState?: ItemMappingStatus;
	styles: Record<string, any>[];
}
export type seoToolKit = typeof seoToolKitDefault;

export type status = typeof itemStatus[number] | null;  //'draft' | 'published' | 'inactive' | 'archived' |'deleted';

//!Fix this
export interface BlinkButtonProps extends ButtonProps {
	label?: string;
}
export interface Panel extends Omit<PanelProps, 'buttons'> {
	buttons?: BlinkButtonProps[];
	el?: string;
	doNotUse?: string;
}
export interface BlinkComponentView extends Omit<ComponentManager['view'], 'events'> {
	events: ComponentViewEvents;
}

type test = AddComponentTypeOptions['view']
//Partial<ComponentViewDefinition> & ThisType<ComponentViewDefinition & ComponentView>;
type tester = ComponentView['events']
export interface BlinkComponentView extends Omit<ComponentView, 'events'> {
	events: ComponentViewEvents;
}

export interface BlinkIComponentView extends Omit<ComponentViewDefinition, 'events'> {
	events: ComponentViewEvents;
}

//IComponentView
export type BlinkPartialView = Partial<BlinkIComponentView> & ThisType<BlinkIComponentView & BlinkComponentView>;
export type BlinkComponentOpts = ComponentViewDefinition['init'];
type tr = ComponentViewDefinition['onRender']
export interface BlinkExtendedView extends BlinkPartialView {
	init?: BlinkComponentOpts;
	onRender?: BlinkComponentOpts;
}

export interface BlinkAddComponentTypeOptions extends Omit<AddComponentTypeOptions, 'view'> {
	view?: BlinkExtendedView;

}

export interface BlinkComponentManager extends Omit<ComponentManager, 'view' | 'addType'> {
	view?: BlinkComponentView;
	addType(type: string, methods: BlinkAddComponentTypeOptions): this;
}


//addType(type: string, methods: AddComponentTypeOptions): this;
export interface BlinkEditor extends Omit<Editor, 'DomComponents'> {
	/**
	 * Can be any JSX renderer such as react, preact, solidjs etc
	 **/
	renderJSX: Function;
	DomComponents: BlinkComponentManager

}

export interface BlinkDomComponentsConfig extends DomComponentsConfig {
	processor: any;
}


export interface BlinkCanvasComponentsConfig extends Omit<CanvasConfig, 'styles'> {
	styles?: Array<string | { rel: string; href: string; crossorigin?: boolean }>;
	frameContent?: string;
}
export interface BlinkAssetManager extends Omit<AssetManagerConfig, 'upload'> {
	upload?: string | boolean;
}
export interface BlinkSelectorManager extends SelectorManagerConfig {
	componentFirst?: boolean;
	/**
	 * Custom render function for the Selector Manager
	 * @example
	 * render: ({ el, labelHead, labelStates, labelInfo, }) => {
	 *  // You can use the default `el` to extend/edit the current
	 *  // DOM element of the Selector Manager
	 *  const someEl = document.createElement('div');
	 *  // ...
	 *  el.appendChild(someEl);
	 *  // no need to return anything from the function
	 *
	 *  // Create and return a new DOM element
	 *  const newEl = document.createElement('div');
	 *  // ...
	 *  return newEl;
	 *
	 *  // Return an HTML string for a completely different layout.
	 *  // Use `data-*` attributes to make the module recognize some elements:
	 *  // `data-states` - Where to append state `<option>` elements (or just write yours)
	 *  // `data-selectors` - Where to append selectors
	 *  // `data-input` - Input element which is used to add new selectors
	 *  // `data-add` - Element which triggers the add of a new selector on click
	 *  // `data-sync-style` - Element which triggers the sync of styles (visible with `componentFirst` enabled)
	 *  // `data-selected` - Where to print selected selectors
	 *  return `
	 *    <div class="my-sm-header">
	 *     <div>${labelHead}</div>
	 *     <div>
	 *       <select data-states>
	 *         <option value="">${labelStates}</option>
	 *       </select>
	 *     </div>
	 *    </div>
	 *    <div class="my-sm-body">
	 *      <div data-selectors></div>
	 *      <input data-input/>
	 *      <span data-add>Add</span>
	 *      <span data-sync-style>Sync</span>
	 *    </div>
	 *    <div class="my-sm-info">
	 *      <div>${labelInfo}</div>
	 *      <div data-selected></div>
	 *    </div>
	 * `;
	 * }
	 */
	render?: any;
}

export interface BlinkStorageManager extends StorageManagerConfig {
	id?: string;
}
export interface BlinkEditorConfig
	extends Omit<EditorConfig, 'canvas' | 'domComponents' | 'assetManager' | 'storageManager'> {
	canvas?: VisualEditor.BlinkCanvasComponentsConfig;
	domComponents?: VisualEditor.BlinkDomComponentsConfig;
	assetManager?: VisualEditor.BlinkAssetManager;
	colorPicker?: any;
	//selectorManager?:VisualEditor.BlinkSelectorManager
	projectData?: any;
	storageManager?: VisualEditor.BlinkStorageManager;
}

export type PanelCommands = CommandNames[keyof CommandNames];

export type PanelIdNames = PanelIds[keyof PanelIds];


declare global {
	type themePreference = 'light' | 'dark' | 'system';
	type settingsPages = 'team' | 'account' | 'billing' | 'integrations' | 'users';
	type codeLanguageOptions = 'javascript' | 'html' | 'json' | 'css' | 'typescript' | 'jsx' | 'componentCss';
	interface Window {
		JSXComponents: JSX.Element[];
		BlinkJS: typeof BlinkJS;
		editor: VisualEditor.BlinkEditor;
		dataLayer: any;


	}


	namespace VisualEditor {
		type ProjectData = {
			id: string;
			project: string;
			projectName: string;
			title: string;
			status: VisualEditor.status;
			urlPath: string;
			seoToolkit: VisualEditor.seoToolKit;
			body: {
				"blink-components": "";
				"blink-styles": [];
				"blink-assets": [];
			};
			itemEditorStatus?: ItemMappingStatus;
		}
		type editorStorageObject = {
			pages: Record<any, any>[];
			customHtml: string;
			title: string;
			status: status;
			csvParser: any;
			components: Components;
			url: string;
			dynamic: boolean;
			'seo-toolkit': seoToolKit;
			fonts: string[];
			project: string;
			html: string;
			css: string;
			assets: string[];
			item_preview?: string;
			itemMappingState?: ItemMappingStatus;
			styles: Record<string, any>[];
		}
		type seoToolKit = typeof seoToolKitDefault;

		type status = typeof itemStatus[number] | null;  //'draft' | 'published' | 'inactive' | 'archived' |'deleted';

		//!Fix this
		interface BlinkButtonProps extends ButtonProps {
			label?: string;
		}
		interface Panel extends Omit<PanelProps, 'buttons'> {
			buttons?: BlinkButtonProps[];
			el?: string;
			doNotUse?: string;
		}
		interface BlinkComponentView extends Omit<ComponentManager['view'], 'events'> {
			events: ComponentViewEvents;
		}

		type test = AddComponentTypeOptions['view']
		//Partial<ComponentViewDefinition> & ThisType<ComponentViewDefinition & ComponentView>;
		type tester = ComponentView['events']
		interface BlinkComponentView extends Omit<ComponentView, 'events'> {
			events: ComponentViewEvents;
		}

		interface BlinkIComponentView extends Omit<ComponentViewDefinition, 'events'> {
			events: ComponentViewEvents;
		}
		//IComponentView
		type BlinkPartialView = Partial<BlinkIComponentView> & ThisType<BlinkIComponentView & BlinkComponentView>;
		type BlinkComponentOpts = ComponentViewDefinition['init'];
		type tr = ComponentViewDefinition['onRender']
		interface BlinkExtendedView extends BlinkPartialView {
			init?: BlinkComponentOpts;
			onRender?: BlinkComponentOpts;
		}

		interface BlinkAddComponentTypeOptions extends Omit<AddComponentTypeOptions, 'view'> {
			view?: BlinkExtendedView;

		}

		interface BlinkComponentManager extends Omit<ComponentManager, 'view' | 'addType'> {
			view?: BlinkComponentView;
			addType(type: string, methods: BlinkAddComponentTypeOptions): this;
		}


		//addType(type: string, methods: AddComponentTypeOptions): this;
		interface BlinkEditor extends Omit<Editor, 'DomComponents'> {
			/**
			 * Can be any JSX renderer such as react, preact, solidjs etc
			 **/
			renderJSX: Function;
			DomComponents: BlinkComponentManager

		}

		interface BlinkDomComponentsConfig extends DomComponentsConfig {
			processor: any;
		}







		interface BlinkCanvasComponentsConfig extends Omit<CanvasConfig, 'styles'> {
			styles?: Array<string | { rel: string; href: string; crossorigin?: boolean }>;
			frameContent?: string;
		}
		interface BlinkAssetManager extends Omit<AssetManagerConfig, 'upload'> {
			upload?: string | boolean;
		}
		interface BlinkSelectorManager extends SelectorManagerConfig {
			componentFirst?: boolean;
			/**
			 * Custom render function for the Selector Manager
			 * @example
			 * render: ({ el, labelHead, labelStates, labelInfo, }) => {
			 *  // You can use the default `el` to extend/edit the current
			 *  // DOM element of the Selector Manager
			 *  const someEl = document.createElement('div');
			 *  // ...
			 *  el.appendChild(someEl);
			 *  // no need to return anything from the function
			 *
			 *  // Create and return a new DOM element
			 *  const newEl = document.createElement('div');
			 *  // ...
			 *  return newEl;
			 *
			 *  // Return an HTML string for a completely different layout.
			 *  // Use `data-*` attributes to make the module recognize some elements:
			 *  // `data-states` - Where to append state `<option>` elements (or just write yours)
			 *  // `data-selectors` - Where to append selectors
			 *  // `data-input` - Input element which is used to add new selectors
			 *  // `data-add` - Element which triggers the add of a new selector on click
			 *  // `data-sync-style` - Element which triggers the sync of styles (visible with `componentFirst` enabled)
			 *  // `data-selected` - Where to print selected selectors
			 *  return `
			 *    <div class="my-sm-header">
			 *     <div>${labelHead}</div>
			 *     <div>
			 *       <select data-states>
			 *         <option value="">${labelStates}</option>
			 *       </select>
			 *     </div>
			 *    </div>
			 *    <div class="my-sm-body">
			 *      <div data-selectors></div>
			 *      <input data-input/>
			 *      <span data-add>Add</span>
			 *      <span data-sync-style>Sync</span>
			 *    </div>
			 *    <div class="my-sm-info">
			 *      <div>${labelInfo}</div>
			 *      <div data-selected></div>
			 *    </div>
			 * `;
			 * }
			 */
			render?: any;
		}

		interface BlinkStorageManager extends StorageManagerConfig {
			id?: string;
		}
		interface BlinkEditorConfig
			extends Omit<EditorConfig, 'canvas' | 'domComponents' | 'assetManager' | 'storageManager'> {
			canvas?: VisualEditor.BlinkCanvasComponentsConfig;
			domComponents?: VisualEditor.BlinkDomComponentsConfig;
			assetManager?: VisualEditor.BlinkAssetManager;
			colorPicker?: any;
			//selectorManager?:VisualEditor.BlinkSelectorManager
			projectData?: any;
			storageManager?: VisualEditor.BlinkStorageManager;
		}

		type PanelCommands = CommandNames[keyof CommandNames];

		type PanelIdNames = PanelIds[keyof PanelIds];
	}
	namespace BlinkJSTemplate {
		function init(config: VisualEditor.BlinkEditorConfig): VisualEditor.BlinkEditor;
		const blinkStorageAttributes: VisualEditor.editorStorageObject;
	}
}
export { };
