//TODO prerender as much as possible as svelte components

const undoManagerPanel = {
	id: 'undo-manager' as const,
	el: '#undo-manager',
	buttons: [
		{
			id: 'undo',
			className: 'undo-button',
			command: 'core:undo',

			attributes: { title: 'Undo' },
			togglable: false,
			label: /*html*/ ` 
            <svg 
            class="hover:text-gray-400 active:text-gray-100"
            title="Undo"
            width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 8C9.85 8 7.45 8.99 5.6 10.6L2 7V16H11L7.38 12.38C8.77 11.22 10.54 10.5 12.5 10.5C16.04 10.5 19.05 12.81 20.1 16L22.47 15.22C21.08 11.03 17.15 8 12.5 8Z" />
            </svg>
            `
		},
		{
			id: 'redo',
			className: 'redo-button',
			togglable: false,
			command: 'core:redo',

			attributes: { title: 'Redo' },
			label: /*html*/ `
            <svg 
            class="hover:text-gray-400 active:text-gray-100"
            title="Redo"
            height="24"
            width="24"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8C6.85001 8 2.92001 11.03 1.54001 15.22L3.90001 16C4.95001 12.81 7.95001 10.5 11.5 10.5C13.45 10.5 15.23 11.22 16.62 12.38L13 16H22V7L18.4 10.6Z"/>
            </svg>
            `
		}
	] as const
} satisfies VisualEditor.Panel;


//Code editor, toggle lines
const editAction = {
	id: 'edit-actions' as const,
	el: '.panel__edit-actions',
	buttons: [
		{
			id: 'edit-code',
			className: 'bts-edit-code',
			label: /*html*/ `
            <svg title="Edit Code" class="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8 12L9.4 16.6L8 18L2 12L8 6L9.4 7.4L4.8 12ZM19.2 12L14.6 16.6L16 18L22 12L16 6L14.6 7.4L19.2 12Z" />
            </svg>
            `,

			attributes: { title: 'Edit Code' },
			command: 'edit-code',
			togglable: true

		},
		/*{
			id: 'edit-table-data',
			className: 'btn-edit-table-data',
			label: `<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M32,56H224a0,0,0,0,1,0,0V192a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56A0,0,0,0,1,32,56Z" fill="#fff" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="32" x2="224" y1="104" y2="104"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="32" x2="224" y1="152" y2="152"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="88" x2="88" y1="104" y2="200"/></svg>`,
			attributes: { title: 'Edit Table Data' },
			command: 'edit-table-data'
		},*/
		{
			id: 'sw-visibility',
			active: true, // active by default

			attributes: { title: 'Toggle Grid' },
			className: 'btn-toggle-borders',
			label: /*html*/ `
            <svg title="Toggle Grid" class="h-6 w-6" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 5H9V3H7V5ZM7 13H9V11H7V13ZM9 21H7V19H9V21ZM11 17H13V15H11V17ZM13 21H11V19H13V21ZM3 21H5V19H3V21ZM5 17H3V15H5V17ZM3 13H5V11H3V13ZM5 9H3V7H5V9ZM3 5H5V3H3V5ZM13 13H11V11H13V13ZM19 17H21V15H19V17ZM21 13H19V11H21V13ZM19 21H21V19H19V21ZM21 9H19V7H21V9ZM11 9H13V7H11V9ZM19 5V3H21V5H19ZM11 5H13V3H11V5ZM17 21H15V19H17V21ZM15 13H17V11H15V13ZM17 5H15V3H17V5Z" />
            </svg>
            `,
			togglable: true,
			command: 'sw-visibility' // Built-in command
		}
	] as const
} satisfies VisualEditor.Panel



const basicAction = (title: string, themePreference: themePreference): VisualEditor.Panel => {
	return {
		id: 'basic-actions' as const,
		el: '.panel__basic-actions'
	};
};

/*const rightPanel: VisualEditor.Panel = {
	id: "layers",
	el: ".panel__right",
	resizable: {
		maxDim: 350,
		minDim: 200,
		tc: 0,
		cl: 1,
		cr: 0,
		bc: 0,
		keyWidth: "flex-basis",
	},
};*/
//Top Middle
const devicePanel = {
	id: 'panel-devices' as const,
	el: '.panel__devices',
	buttons: [
		{
			attributes: { title: 'Desktop' },
			id: 'device-desktop',
			label:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 14H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4a2 2 0 0 0-2-2z"></path></svg>',
			command: 'set-device-desktop',
			active: true,
			togglable: false
		},
		{
			attributes: { title: 'Tablet' },
			id: 'device-tablet',
			label: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 tablet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>`,
			command: 'set-device-tablet',
			togglable: false
		},
		{
			attributes: { title: 'Mobile' },
			id: 'device-mobile',
			label:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 18H7V4h9m-4.5 18c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4-21h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1z"></path></svg>',
			command: 'set-device-mobile',
			togglable: false
		}
	] as const
} satisfies VisualEditor.Panel;

//Top right
const statusGroup = {
	id: 'panel-status' as const,

	el: '.panel__status'
	//buttons:[]
	/*buttons: [
		{
			//@ts-ignore
			id: 'itemStatus',
			label: createLitElement(statusButton)!
		}
	]*/
} satisfies VisualEditor.Panel;

//Left side with blocks/layers
const leftPanelGroup = {
	id: 'panel__left' as const,
	el: '.panel__left',
	buttons: [
		{
			id: 'show-blocks',
			active: false,
			attributes: { title: 'Add Blocks' },
			label: /*html*/ `
            <svg title="Add Blocks" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect />
            <path d="M28,14H18V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v10H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h10v10c0,1.104,0.896,2,2,2  s2-0.896,2-2V18h10c1.104,0,2-0.896,2-2S29.104,14,28,14z"/>
            </svg>
            `,
			command: 'show-blocks',
			togglable: true
		},
		{
			id: 'show-layers',
			active: false,
			attributes: { title: 'Layers' },
			label: /*html*/ `
            <svg title="Layers"  style="enable-background:new 0 0 30 30;" version="1.1" viewBox="0 0 30 30" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g>
                <g>
                <path d="M26,9c0-0.419-0.259-0.776-0.625-0.924l-9.459-4.854h-0.018C15.627,3.085,15.325,3,15,3s-0.627,0.085-0.898,0.222h-0.018    L4.625,8.076C4.259,8.224,4,8.581,4,9c0,0.416,0.255,0.772,0.617,0.923v0.02l9.474,4.838l0.009-0.004    C14.372,14.915,14.674,15,15,15s0.628-0.085,0.9-0.223l0.009,0.004l9.474-4.838v-0.02C25.745,9.772,26,9.416,26,9z"/>
                </g>
                </g>
                <path d="M25.375,14.076l-1.851-0.95c-2.905,1.487-6.87,3.511-6.916,3.528C16.093,16.884,15.553,17,15,17  c-0.555,0-1.096-0.117-1.613-0.348c-0.044-0.016-4.005-2.038-6.911-3.526l-1.851,0.95C4.259,14.224,4,14.581,4,15  c0,0.416,0.255,0.772,0.617,0.923v0.02l9.474,4.838l0.009-0.004C14.372,20.915,14.674,21,15,21s0.628-0.085,0.9-0.223l0.009,0.004  l9.474-4.838v-0.02C25.745,15.772,26,15.416,26,15C26,14.581,25.741,14.224,25.375,14.076z"/>
                <path d="M25.375,20.076l-1.851-0.95c-2.905,1.487-6.87,3.511-6.916,3.528C16.093,22.884,15.553,23,15,23  c-0.555,0-1.096-0.117-1.613-0.348c-0.044-0.016-4.005-2.038-6.911-3.526l-1.851,0.95C4.259,20.224,4,20.581,4,21  c0,0.416,0.255,0.772,0.617,0.923v0.02l9.474,4.838l0.009-0.004C14.372,26.915,14.674,27,15,27s0.628-0.085,0.9-0.223l0.009,0.004  l9.474-4.838v-0.02C25.745,21.772,26,21.416,26,21C26,20.581,25.741,20.224,25.375,20.076z"/>
            </svg>
            `,
			command: 'show-layers',
			// Once activated disable the possibility to turn it off
			togglable: true
		},
		{
			id: 'show-pages',
			active: false,
			attributes: { title: 'Page Settings' },
			label: /*html*/ `
            <svg title="Page Settings" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title/>
            <path d="M14,10a2,2,0,0,1-2-2V2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V10Z" fill="currentColor"/>
            <path d="M14,7a1,1,0,0,0,1,1h5a1,1,0,0,0-.29-.71l-5-5A1,1,0,0,0,14,2Z" fill="currentColor"/>
            </svg>
            `,
			command: 'show-pages',
			togglable: true
		},
		/*
		{
			id: 'show-ecommerce',
			active: false,
			attributes: { title: 'Ecommerce' },
			label:  `
			<svg title="Eccommerce" id="ecomDisabled" enable-background="new 0 0 500 500" version="1.1" viewBox="0 0 500 500"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<path clip-rule="evenodd" 
			d="M259.086,372.654c0-7.994-1.368-15.624-3.912-22.716h53.156  c-2.449,7.092-3.817,14.722-3.817,22.716c0,37.621,30.521,68.142,68.143,68.142c37.607,0,68.142-30.521,68.142-68.142  c0-37.613-30.534-68.143-68.142-68.143H222.744c-9.99,0-18.17-8.181-18.17-18.172c0-9.988,8.18-18.168,18.17-18.168h156.273  c16.44,0,30.608-9.637,37.059-23.621c2.46-5.269,49.526-112.573,49.526-112.573c1.269-2.912,2.449-5.812,2.449-9.176  c0-9.99-8.181-18.171-18.172-18.171H166.227l-7.632-23.528c-3.54-12.636-13.442-21.898-26.706-21.898H54.662  c-12.536,0-22.713,10.177-22.713,22.713s10.177,22.713,22.713,22.713h47.699c8.083,0,14.897,5.271,17.267,12.449l38.339,195.968  c-20.984,11.543-35.164,33.983-35.164,59.606c0,37.621,30.523,68.142,68.142,68.142  C228.555,440.796,259.086,410.275,259.086,372.654z M213.658,372.654c0,12.536-10.177,22.712-22.714,22.712  c-12.536,0-22.713-10.176-22.713-22.712s10.177-22.716,22.713-22.716C203.481,349.938,213.658,360.118,213.658,372.654z   M395.366,372.654c0,12.536-10.176,22.712-22.711,22.712c-12.537,0-22.717-10.176-22.717-22.712s10.18-22.716,22.717-22.716  C385.19,349.938,395.366,360.118,395.366,372.654z" 
			fill="currentColor" fill-rule="evenodd"/>
			</svg>
			`,
			command:'show-ecommerce',
			togglable: false
		},
		*/
		//Settings
		/*{
			id: 'show-data-parser',
			active: false,
			label: `
			<svg style="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<g id="info"/><g id="icons">
				<path d="M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7   L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7   l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9   c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7   C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z" id="settings"/>
				</g>
			</svg>
			`,
			command: 'show-editor-config',
			togglable: true
		}*/
	] as const
} satisfies VisualEditor.Panel;
//Top right
const rightPanelGroup = {
	id: 'panel-switcher' as const,
	el: '.panel__switcher',
	//resizable:true,
	buttons: [
		/*{
			id: "fullscreen",
			className: "btn-expand",
			label: '<i class="fas fa-expand"></i>',
			command: "expand-screen",
			context: "fullscreen", // For grouping context of buttons from the same panel
		},*/
		{
			attributes: { title: 'Preview' },
			id: 'preview',
			className: 'btn-preview',
			label: /*html*/ ` 
                <button title="Preview" class="bg-transparent shadow-sm text-sm text-secondary-accent-blue hover:text-secondary-accent-blue-500 hover:bg-transparent border py-1 px-2 rounded-md border-secondary-accent-blue hover:border-secondary-accent-blue-500">Preview</button>
            `,
			command: 'preview',
			context: 'preview' // For grouping context of buttons from the same panel
		}
	] as const
} satisfies VisualEditor.Panel;
const aiPanel =
	{
		id: 'show-ai' as const,
		attributes: { title: 'Ai' },
		active: false,
		togglable: true,
		command: 'show-ai',
		label: /*html*/ `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
<span class="text-[13px]">AI</span>
`
	} as const
//Panel on the right
const utilitiesPanel = {
	id: 'panel-utilities' as const,
	el: '.panel__utilities',
	/*resizable:{
		//appendTo: document.querySelector<HTMLElement>('.right_tab_left')!,

		updateTarget(el, rect, opts) {
			console.log('updateTarget', el, rect, opts);
		},
	},*/
	buttons: [
		{
			id: 'show-style',
			attributes: { title: 'Style' },
			active: false,
			label: /*html*/ `
            <svg title="Style" class="h-6 w-6" viewBox="0 0 24 24"xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.37 3.29L20.71 4.63C21.1 5.02 21.1 5.65 20.71 6.04L11.75 15L9 12.25L17.96 3.29C18.35 2.9 18.98 2.9 19.37 3.29ZM4 17C4 15.34 5.34 14 7 14C8.66 14 10 15.34 10 17C10 19.21 8.21 21 6 21C4.49 21 2.92 20.22 2 19C2.84 19 4 18.31 4 17Z"/>
            </svg>
            <span class="text-[11px]">Design</span>
            `,
			command: 'show-styles',
			togglable: true
		},
		{
			id: 'show-traits',
			attributes: { title: 'Options' },
			active: false,
			label: /*html*/ `
            <svg title="Options" class="h-6 w-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15 9H17V7H21V5H17V3H15V9ZM7 9V11H3V13H7V15H9V9H7ZM13 19V21H11V15H13V17H21V19H13ZM3 19V17H9V19H3ZM21 11V13H11V11H21ZM13 5H3V6.99H13V5Z"/>
            </svg>

            <span class="text-[11px]">Options</span>
            `,
			command: 'show-traits',
			// Once activated disable the possibility to turn it off
			togglable: true
		},
		aiPanel,
		/*{
			id:'show-component-css',
			attributes:{title:'CSS'},
			active:false,
			label:'css',
			togglable:true,
			command:'show-component-css'
		}*/
	] as const
} satisfies VisualEditor.Panel;

//Method to add new panels to editor
//editor.Panels.addPanel()

/**
 * Default Panels that will be initialized on editor load in the order given within the array
 */
export const defaultPanels = (config: { itemTitle: string; themePreference: themePreference }) => {
	return [
		undoManagerPanel,
		//srightPanel,
		devicePanel,
		leftPanelGroup,
		editAction,
		rightPanelGroup,
		utilitiesPanel,
		basicAction(config.itemTitle, config.themePreference),
		statusGroup
	] as Array<VisualEditor.Panel>;
};

export type PanelIds = {
	editActionsPanel: typeof editAction.id
	undoManagerPanel: typeof undoManagerPanel.id;
	devicePanel: typeof devicePanel.id;
	leftPanelGroup: typeof leftPanelGroup.id;
	rightPanelGroup: typeof rightPanelGroup.id;
	utilitiesPanel: typeof utilitiesPanel.id;
}

export type PanelCommands = {
	editActionsPanel: typeof editAction.buttons[number]['command'];
	undoManagerPanel: typeof undoManagerPanel.buttons[number]['command'];
	devicePanel: typeof devicePanel.buttons[number]['command'];
	leftPanelGroup: typeof leftPanelGroup.buttons[number]['command'];
	rightPanelGroup: typeof rightPanelGroup.buttons[number]['command'];
	utilitiesPanel: typeof utilitiesPanel.buttons[number]['command'];
};
