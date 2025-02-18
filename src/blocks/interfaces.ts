/* eslint-disable @typescript-eslint/ban-types */
import type { Collection, Model } from 'backbone';

//TODO Stop depending on this file

/**
 * Block Categories for the editor
 */
export const blockCategories = {
	basic: 'Essentials',
	advanced: 'Code Elements',
	forms: 'Forms',
	charts: 'Charts',
	apps: 'Apps',
	duplicates: 'Splices'
};

/**
 * CSS Style Interface
 */
export interface cssStyles {
	height?: string;
	display?: string;
	position?: string;
	'text-align'?: string;
	margin?: string;
	'flex-direction'?: string;
	'padding-top'?: string;
	'padding-left'?: string;
	'padding-right'?: string;
	'padding-bottom'?: string;
	'font-family'?: 'Helvetica, sans-serif' | string;
	float?: 'left' | 'right' | 'none';
	'background-imgage'?: string;
}

/**
 * The visual block editor
 */

export type html = string;

type GrapesEvent =
	| ComponentEvent
	| BlockEvent
	| AssetEvent
	| KeymapEvent
	| StyleManagerEvent
	| StorageEvent
	| CanvasEvent
	| SelectorEvent
	| RichTextEditorEvent
	| ModalEvent
	| CommandEvent
	| GeneralEvent;

type ComponentEvent =
	| 'component:create'
	| 'component:mount'
	| 'component:add'
	| 'component:remove'
	| 'component:clone'
	| 'component:update'
	| 'component:update:{propertyName}'
	| 'component:styleUpdate'
	| 'component:styleUpdate:{propertyName}'
	| 'component:selected'
	| 'component:deselected'
	| 'component:toggled';

type BlockEvent =
	| 'block:add'
	| 'block:remove'
	| 'block:drag:start'
	| 'block:drag'
	| 'block:drag:stop';

type AssetEvent =
	| 'asset:add'
	| 'asset:remove'
	| 'asset:upload:start'
	| 'asset:upload:end'
	| 'asset:upload:error'
	| 'asset:upload:response';

type KeymapEvent = 'keymap:add' | 'keymap:remove' | 'keymap:emit' | 'keymap:emit:{keymapId}';

type StyleManagerEvent =
	| 'styleManager:update:target'
	| 'styleManager:change'
	| 'styleManager:change:{propertyName}';

type StorageEvent =
	| 'storage:start'
	| 'storage:start:store'
	| 'storage:start:load'
	| 'storage:load'
	| 'storage:store'
	| 'storage:end'
	| 'storage:end:store'
	| 'storage:end:load'
	| 'storage:error'
	| 'storage:error:store'
	| 'storage:error:load';

type CanvasEvent =
	| 'canvas:dragenter'
	| 'canvas:dragover'
	| 'canvas:drop'
	| 'canvas:dragend'
	| 'canvas:dragdata';

type SelectorEvent = 'selector:add';

type RichTextEditorEvent = 'rte:enable' | 'rte:disable';

type ModalEvent = 'modal:open' | 'modal:close';

type CommandEvent =
	| 'run:{commandName}'
	| 'stop:{commandName}'
	| 'run:{commandName}:before'
	| 'stop:{commandName}:before'
	| 'abort:{commandName}';

type GeneralEvent = 'canvasScroll' | 'undo' | 'redo' | 'load';

/**
 * Used to initialize the visual editor.
 */
interface Config {
	/** Indicate where to init the editor. You can also pass an HTMLElement **/
	container: string | HTMLElement;
	/** Base element of a template represented as a JSON in string format **/
	components?: string | null;
	/** Turns off the inline styling option by default **/
	avoidInlineStyle?: number;
	/** Assets contain the relevant links to various media types**/
	assets?: string | null;
	//** The styles set for the style panel in the visual block editor **/
	style?: string | null;
	/** The html body of the template **/
	html?: string | null;
	/** Additional plugins to include in the editor like custom charts, tables, ecommerce etc **/
	plugins: Array<string> | Array<void>;
	/** Options to set for each included plugin **/
	pluginsOpts: object; //TODO update this
	/** The panel for the layer manager**/
	layerManager: object; //TODO update this
	/** Manages all panels within the editor **/
	panels: PanelsConfig;
	canvas?: CanvasConfig;
	/** The block manager for all content blocks, it determines the placement and categorization of all blocks**/
	blockManager: BlockManagerConfig;
	/** Asset manager **/
	assetManager: AssetManagerConfig | object;
	/** Used to determine remote or local storage configuration**/
	storageManager: StorageManagerConfig;
	/**Get the content for the canvas directly from the element
	 *As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`
	 **/
	fromElement: boolean;
	/** Width of the editor */
	width: string;
	/** Height of the editor */
	height: string;
	/** The Selector Manager allows to assign classes and
	 * different states (eg. :hover) on components.
	 * Generally, it's used in conjunction with Style Manager
	 * but it's not mandatory **/
	selectorManager: SelectorManagerConfig;
	/** **/
	traitManager: TraitManagerConfig;
	/** **/
	deviceManager: DeviceManagerConfig;
	/** The Style Manager allows users to style the elements within the visual editor canvas **/
	styleManager: StyleManagerConfig;
}

interface subFunctions {
	getLayersEl?(prop: any): any;
	getRowEl?(prop: any): any;
	run?(editor: any, sender: any): any;
	stop?(editor: any, sender: any): any;
	getStyleEl?(editor: any, sender: any): any;
	any?(prop: any): void;
}

interface Commands {
	add(name: string, val?: any, ...props: Array<subFunctions>): void | any;
	stop(command: string, options?: object): void | any;
	run(command: string, options?: object): void | any;
}
interface Canvas {
	getConfig(): CanvasConfig | object;
	getElement(): HTMLElement;
	getFrameEl(): HTMLIFrameElement;
	getWindow(): Window;
	getDocument(): HTMLDocument;
	getBody(): HTMLBodyElement;
	getWrapperEl(): HTMLElement;
	setCustomBadgeLabel(f: Function): void;
	hasFocus(): boolean;
	scrollTo(el: HTMLElement | object, opts?: boolean | GrapesScrollIntoViewOptions): void;
}

interface GrapesScrollIntoViewOptions extends ScrollIntoViewOptions {
	force?: boolean;
}

interface AssetManager {
	add(asset: string | object | Array<string> | Array<object>, opts?: object): object;
	get(src: string): object;
	getAll(): Array<object>;
	getAllVisible(): Array<object>;
	remove(src: string): AssetManager;
	store(noStore: boolean): object;
	load(data?: object): object;
	getContainer(): HTMLElement;
	getAssetsEl(): HTMLElement;
	render(assets: Array<object>): HTMLElement;
	addType(id: string, definition: object): object;
	getType(id: string): object;
	getTypes(): Array<object>;
}

interface StorageManager {
	add(
		asset: string | object | Array<string> | Array<object>,
		opts?: object
	): object | Array<string> | Array<object>;
	opts?: object | any;
	get(src: string, opts?: object | Array<string> | Array<object>): object;
}

interface BlockManager {
	getConfig(): BlockManagerConfig | object;
	onLoad(): void;
	add(id: string, opts: BlockOptions): void;
	get(id: string): object;
	getAll(): Array<object>;
	getAllVisible(): Array<object>;
	remove(id: string): object;
	getCategories(): Array<object> | Array<any> | any;
	getContainer(): HTMLElement;
	render(): HTMLElement;
}

interface Components {
	addType(name: string, opts: ComponentType): void;
}

interface ComponentType {
	model: {
		defaults: ComponentConfig;
	};
}

export interface ComponentConfig {
	/**Default Component attributes ie id, class etc */
	attributes?: object; //{id: "itzl"}
	badgable?: boolean; //true
	classes?: object; //r {length: 0, models: Array(0), _byId: {…}, _events: {…}, _listenId: "l981", …}
	/**Set Child Components of this component */
	components?: object | Array<object> | any; //r {length: 1, models: Array(1), _byId: {…}, opt: {…}, _listenId: "l815", …}
	/**HTML Content of component if TYPE is not set */
	content?: string | HTMLElement; //"<div> </div>"
	/** Allows component to be duplicated, true by default */
	copyable?: boolean; //
	/**Drag mode either transition or absolute, none for default */
	dmode?: '';
	/**Component is draggable true by default */
	draggable?: boolean;
	/**Component is droppable true by default */
	droppable?: true;
	/**Component is editable false by default */
	editable?: boolean;
	/**Determines if the block is a featured block */
	featureBlock?: boolean;
	/**Component is highlightable true by default */
	highlightable?: boolean;
	/**Component is hoverable true by default */
	hoverable?: boolean;
	/**Component Icon */
	icon?: string;
	/**Used in conjunction with feature blocks/dynamic blocks to set thumbnail image in menu */
	imageAssets?: Array<string>;
	/**Label of the component */
	label?: string;
	/**Component is layerable true by default */
	layerable?: boolean;
	/**Name of the component */
	name?: string;
	/**Open by default 1 by default*/
	open?: number;
	//TODO look into
	propagate?: string;
	/**Removable, true by default */
	removable?: boolean;
	/**Component is resizable false by default */
	resizable?: boolean;
	//**Script to run when component is added */
	script?: string;
	'script-export'?: string;
	'script-props'?: string;
	/**Component is selectable true by default*/
	selectable?: boolean;
	/**Component is allowed to be styled true by default */
	stylable?: boolean;
	/**Component styleable required */
	'stylable-require'?: string;
	/**Style of the component */
	style?: string | object;
	/**Style Signature */
	'style-signature'?: string;
	/**Name of the html tag ie div, img, p*/
	tagName?: string;
	/** Toolbar options for the component, use defaultToolbar unless overide is required*/
	toolbar?: Array<object> | any;
	/**Specific traits for this component*/
	traits?: object; //r {length: 2, models: Array(2), _byId: {…}, em: r, _listenId: "l810", …}
	/**Type name of the component set by default in the add function*/
	type?: string;
	/**Trigger styling */
	unstylable?: string | boolean;
	//**Don't overide leave false*/
	void?: boolean;
	//React JSX property
	$$typeof?: any;
}

/**
 * Panels that modify the canvas of the visual editor
 */
export interface Panel {
	/**Id to reference for later usage */
	id: string;
	/** The html element to place the panel within */
	el: string;
	/**Make the panel resizeable */
	resizable?: {
		/**Maximum dimension */
		maxDim: number;
		/**Minumum dimension */
		minDim: number;
		/**Top handler */
		tc: number;
		/**Left handler */
		cl: number;
		/**Right handler */
		cr: number;
		/**Bottom handler */
		bc: number;
		/**
		 * Being a flex child we need to change `flex-basis` property
		 * instead of the `width` (default)
		 */
		keyWidth: string;
	};
	/**The buttons to include in a panel */
	buttons?: Array<{
		/** Unique id of the button */
		id: string;
		/** The html representation of the button*/
		label?: string | HTMLElement;
		/** The command to execute when the button is pressed */
		command?: string | Function;
		active?: boolean;
		togglable?: boolean;
		className?: string;
		context?: string;
	}>;
}

interface BlockOptions {
	label: string;
	toolbar?: any;
	content: string | object | undefined;
	category?: string | object;
	attributes?: object;
	activate?: boolean;
	select?: boolean;
	//Array<object>
}

interface SelectorManager {
	getConfig(): SelectorManagerConfig | object;
	add(name: string | Array<string>, opts: SelectorOptions | object): Model | Array<object>;
	addClass(classes: Array<string> | string): Array<Object>;
	get(name: Model | Array<object>, type: string): Model | Array<object>;
	getAll(): Collection<Model>;
}

interface SelectorOptions {
	label?: string;
	type?: string;
}

interface CssComposer {
	load(data: object): object;
	store(noStore: boolean): object;
	add(selectors: Array<Object>, state: string, width: string, opts: object): object;
	get(selectors: Array<Object>, state: string, width: string, ruleProps: object): object | null;
	getAll(): Collection<Model>;
	clear(): CssComposer;
	setRule(): Object;
	getRule(): Object;
}

interface Modal {
	open(opts?: ModalOptions): Modal;
	close(): Modal;
	isOpen(): Boolean;
	setTitle(title: string): Modal;
	getTitle(): string;
	setContent(content: HTMLElement | string): Modal;
	getContent(): string;
}

interface ModalOptions {
	title?: HTMLElement | string;
	content?: HTMLElement | string;
}

interface stylePropList {
	/**CSS Style property name */
	value: string;
	/** Meant for styling in the styles manager */
	className?: string;
	name?: string;
	title?: string;
}
type stylePropTypes =
	| 'radio'
	| 'select'
	| 'integer'
	| 'composite'
	| 'slider'
	| 'bg'
	| 'pretty-margin';

interface styleProps {
	/**Name of the style property to display */
	name?: string;
	/**CSS property to use */
	property?: string;
	buildProps?: any;
	/**Display type in the style manager */
	type?: stylePropTypes;
	/**Default option to be selected */
	defaults?: string | number;
	/**List of all styling options if more than one ie margin-left, margin-right etc */
	list?: Array<stylePropList>;
	properties?: Array<object>;
	min?: number;
	max?: number;
	step?: number;
	id?: string;
}

/**Sectors that make up the style manager settings */
export interface StyleSectors {
	/**Name of the sector */
	name: string;
	/** List of all the options for the sector ie float, margin, padding etc*/
	buildProps?: Array<string>;
	/**Properties for all stylinh options to include in the sector */
	properties?: Array<styleProps>;
	/**Start open, defaults to false */
	open?: boolean;
}

/**
 * Configuration Interface
 */

interface EditorConfig {
	stylePrefix?: string;
	components?: string;
	style?: string;
	fromElement?: boolean;
	noticeOnUnload?: boolean;
	showOffsets?: boolean;
	showOffsetsSelected?: boolean;
	forceClass?: boolean;
	height?: string;
	width?: string;
	log?: Array<'debug' | 'info' | 'warning' | 'error'> | Array<string>;
	baseCss?: string;
	protectedCss?: string;
	canvasCss?: string;
	defaultCommand?: string;
	showToolbar?: boolean;
	allowScripts?: boolean;
	showDevices?: boolean;
	devicePreviewMode?: boolean;
	mediaCondition?: string;
	tagVarStart?: string;
	tagVarEnd?: string;
	keepEmptyTextNodes?: boolean;
	jsInHtml?: boolean;
	nativeDnD?: boolean;
	multipleSelection?: boolean;
	exportWrapper?: boolean;
	wrappesIsBody?: boolean;
	avoidInlineStyle?: boolean;
	avoidDefaults?: boolean;
	clearStyles?: boolean;
	container?: HTMLElement | string;
	undoManager?: object;
	assetManager?: AssetManagerConfig | object;
	canvas?: CanvasConfig | object;
	layers?: object;
	storageManager?: StorageManagerConfig | object;
	rte?: RichtTextEditorConfig | object;
	domComponents?: DomComponentsConfig | object;
	modal?: ModalConfig | object;
	codeManager?: CodeManagerConfig | object;
	panels?: PanelsConfig | object;
	commands?: CommandsConfig | object;
	cssComposer?: CssComposerConfig | object;
	selectorManager?: SelectorManagerConfig | object;
	deviceManager?: DeviceManagerConfig | object;
	styleManager?: StyleManagerConfig | object;
	blockManager?: BlockManagerConfig | object;
	traitManager?: TraitManagerConfig | object;
	textViewCode?: string;
	keepUnusedStyles?: boolean;
	multiFrames?: boolean;
}

interface AssetManagerConfig {
	assets?: Array<object>;
	noAssets?: string;
	stylePrefix?: string;
	upload?: boolean;
	uploadName?: string;
	headers?: object;
	params?: object;
	credentials?: RequestCredentials;
	multiUpload?: boolean;
	autoAdd?: boolean;
	uploadText?: string;
	addBtnText?: string;
	customFetch?: Function;
	uploadFile?: Function;
	embedAsBase64?: boolean;
	handleAdd?: Function;
	dropzone?: boolean;
	openAssetsOnDrop?: number;
	dropzoneContent?: string;
	modalTitle?: string;
	inputPlaceholder?: string;
}

interface CanvasConfig {
	stylePrefix?: string;
	scripts?: Array<string>;
	styles?: Array<string>;
	customBadgeLabel?: Function;
	autoscrollLimit?: number;
	notTextable?: Array<string>;
}

interface StyleManagerConfig {
	stylePrefix?: string;
	sectors?: Array<StyleSectors>;
	appendTo?: HTMLElement | string;
	textNoElement?: string;
	hideNotStylable?: boolean;
	highlightChanged?: boolean;
	highlightComputed?: boolean;
	showComputed?: boolean;
	clearProperties?: boolean;
	avoidComputed?: Array<string>;
}

interface BlockManagerConfig {
	appendTo?: HTMLElement | string;
	blocks: Array<object>;
}

interface RichtTextEditorConfig {
	stylePrefix?: string;
	adjustToolbar?: boolean;
	actions?: Array<string>;
}

interface TraitManagerConfig {
	stylePrefix?: string;
	appendTo?: HTMLElement | string;
	labelContainer?: string;
	labelPlhText?: string;
	labelPlhRef?: string;
	optionsTarget?: Array<object>;
	textNoElement?: string;
}

interface StorageManagerConfig {
	/** Prefix identifier that will be used inside storing and loading **/
	id?: string;
	/** Store data automatically **/
	autosave?: boolean;
	/** Autoload stored data on init **/
	autoload?: boolean;
	/** Type of the storage **/
	type?: 'local' | 'remote';
	/** If autosave enabled, indicates how many changes are necessary before store method is triggered **/
	stepsBeforeSave?: number;
	/** Enable/Disable storing of components in JSON format **/
	storeComponents?: boolean;
	/** Enable/Disable storing of rules in JSON format **/
	storeStyles?: boolean;
	/** Enable/Disable storing of components as HTML string **/
	storeHtml?: boolean;
	/** Enable/Disable storing of rules as CSS string **/
	storeCss?: boolean;
	/** **/
	checkLocal?: boolean;
	/** **/
	params?: object;
	/** **/
	headers?: object;
	/** **/
	urlStore?: string;
	/** **/
	urlLoad?: string;
	/** **/
	contentTypeJson?: boolean;
	/** **/
	credentials?: RequestCredentials;

	/** **/
	beforeSend?(jqXHR: any, settings: object): void;
	/** **/
	onComplete?(jqXHR: any, status: any): void;
}

interface DomComponentsConfig {
	stylePrefix?: string;
	wrapperId?: string;
	wrapperName?: string;
	wrapper?: DomComponentsWrapperConfig;
	components?: Array<object>;
	imageCompClass?: string;
	oAssetsOnCreate?: boolean;
	storeWrapper?: boolean;
	voidElements?: Array<string>;
}

interface DomComponentsWrapperConfig {
	removable?: boolean;
	copyable?: boolean;
	draggable?: boolean;
	// TODO: Type custom blocks and components
	components?: Array<object>;
	traits?: Array<object>;
	stylable?: Array<string>;
}

interface ModalConfig {
	stylePrefix?: string;
	title?: string;
	content?: string;
	backdrop?: boolean;
}

interface CodeManagerConfig {
	stylePrefix?: string;
	inlineCss?: boolean;
}

interface PanelsConfig {
	stylePrefix?: string;
	defaults?: Array<object>;
	em?: object;
	delayBtnsShow?: number;
}

interface CommandsConfig {
	ESCAPE_KEY?: number;
	stylePrefix?: string;
	defaults?: Array<object>;
	em?: object;
	firstCentered?: boolean;
	newFixedH?: boolean;
	minComponentH?: number;
	minComponentW?: number;
}

interface CssComposerConfig {
	stylePrefix?: string;
	staticRules?: string;
	rules?: Array<string>;
}

interface SelectorManagerConfig {
	stylePrefix?: string;
	appendTo?: HTMLElement | string;
	selectors?: Array<string>;
	label?: string;
	statesLabel?: string;
	selectedLabel?: string;
	states?: Array<object>;
}

interface DeviceManagerConfig {
	devices?: Array<object>;
	deviceLabel?: string;
}

/**
 * Configuration Interface End
 */

interface LogOptions {
	ns?: string;
	level?: 'debug' | 'info' | 'warning' | 'error';
}
