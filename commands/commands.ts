/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-types */
//import {saveDynamicBlock} from "../controller/dynamicBlocks";
//import {popUpTraits} from "../controller/magnetpanels";
//import {html} from "lit-html";
//import type {cssStyles} from "./interfaces";
import {
	closeLeftPanel,
	openLeftPanel,
	type state,
	editorPanels,
	toggleRightPanel
} from '../panels/state';
//import {createLitElement} from "../controller/utilities";
//import type {BlinkEditor} from "../editorTypes";
import { browser, dev } from '$app/environment';
import { createSliceBlock } from '$visualeditor/blocks/contentblocks/slice';
const popupHtml = `<div id="popup" class="inset-0 flex items-center justify-center z-10">
<div class="bg-white w-1/3 p-6 shadow-lg rounded">

  <h2 class="text-xl font-bold mb-4">Enter Name of Splice</h2>

  <input type="text" id="spliceName" placeholder="Untitled" class="border border-gray-300 rounded px-4 py-2 mb-4 w-full">

  <div class="flex justify-end">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 saveBtn">
      Save
    </button>
    <button onclick="editor.Modal.close();" class="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
      Cancel
    </button>
  </div>

</div>
</div>`;

//!TODO replace with Svelte state
const wrapper = () => {
	if (browser) {

		return document.querySelector('#editor-wrapper') as HTMLElement
	} else return
};

function expandEditor() {
	if (browser && document.fullscreenElement == null) {
		//movePanel(defaultPanels[6],editor,"fullscreen")
		//console.log("Expanding");
		//@ts-ignore
		wrapper().requestFullscreen();
	} else {
		//movePanel(defaultPanels[6],editor,"default")
		if (browser) document.exitFullscreen();
		//console.log("Exit Fullscreen");
	}
}

//TODO add temp styling
function openModal(
	editor: VisualEditor.BlinkEditor,
	title: string,
	content: string | HTMLTableElement | HTMLElement,
	additonalCallback?: CallableFunction,
	style?: any //cssStyles,
) {
	editor.Modal.setTitle(title);
	editor.Modal.setContent(content);

	const currentModal = document.querySelector('.blink-mdl-container .blink-mdl-dialog');
	currentModal?.classList.add('w-80');

	if (additonalCallback) {
		additonalCallback();
	}

	editor.Modal.open();
}

//Possible reuse of the magnet panels
function editOption(editor: any, selected: any) {

	openModal(
		editor,
		'magnetPanels',
		`
        `
	);

	if (document.querySelector('.popUpEditor') == null) {
		//const popUp = document.createElement('div')
		//popUp.classList.add('popUpEditor')
		//wrapper.appendChild(popUp)
		//.blink-mdl-container
	} else {
		//
	}
}

/**
 *
 * @param editor
 * @returns {HTMLElement}
 */
function getRowElement(editor: VisualEditor.BlinkEditor): HTMLElement {
	return editor.getContainer()!.closest('.editor-row') as HTMLElement;
}

function getPanelArea(container: HTMLElement, target: string) {
	return container.querySelector(target) as HTMLElement;
}

interface Sender {
	id: string;
	label: string;
	tagName: string;
	className: string;
	command: string;
	context: string;
	buttons: any[];
	attributes: object;
	options: object;
	active: boolean;
	dragDrop: boolean;
	togglable: boolean;
	runDefaultCommand: boolean;
	stopDefaultCommand: boolean;
	disable: boolean;
}

export const leftPanelConfig = (target: string, callBack?: Function) => {
	const toggledLayer = document.getElementById('toggledEditorLayer') as HTMLElement;
	const pinnedState = toggledLayer.dataset.pinnedState as state;
	return {
		randomFunc() {
			console.log('wow');
		},
		run(editor: VisualEditor.BlinkEditor, sender: Sender) {
			const panelElement = getPanelArea(getRowElement(editor), target);
			panelElement.style.display = '';
			openLeftPanel(editor);
			if (callBack) callBack();
			//console.log(sender);
			//sender.togglable = true;
			//editor.stopCommand(sender.id);
			//data-current-panel="blocks"
		},
		stop(editor: VisualEditor.BlinkEditor, sender: Sender) {
			const panelElement = getPanelArea(getRowElement(editor), target);
			panelElement.style.display = 'none';
			closeLeftPanel(editor, true);
		}
	};
};
const defaultPaneltConfig = (target: string, runCallback?: Function, stopCallback?: Function) => {
	return {
		run(editor: VisualEditor.BlinkEditor, _sender: any) {
			const panelElement = getPanelArea(getRowElement(editor), target);
			//TODO switch this to a smooth transition

			if (runCallback) {
				runCallback(editor, panelElement);
				panelElement.style.display = '';
			} else {
				panelElement.style.display = '';
			}
		},
		stop(editor: VisualEditor.BlinkEditor, _sender: any) {
			const panelElement = getPanelArea(getRowElement(editor), target);
			//TODO switch this to a smooth transition

			if (stopCallback) {
				stopCallback(editor, panelElement);
				panelElement.style.display = 'none';
			} else {
				panelElement.style.display = 'none';
			}
		}
	};
};

const rightPanelRunCallback = (editor: VisualEditor.BlinkEditor, panel: HTMLElement) => {
	const isActive = pannelIsActive(editor, 'panel-utilities');
	if (isActive) {
		//show element
		//console.log('show');
		toggleRightPanel(isActive, editor /*panel*/);
	} else {
		//do nothing
	}
};

const rightPanelStopCallback = (editor: VisualEditor.BlinkEditor, panel: HTMLElement) => {
	const isActive = pannelIsActive(editor, 'panel-utilities');
	if (isActive) {
		//do nothing
	} else {
		//hide the element
		//console.log('hide');
		toggleRightPanel(isActive, editor /*panel*/);
	}
};

//TODO Potential to add this to the extended object
function pannelIsActive(editor: VisualEditor.BlinkEditor, panelId: string) {
	const checkPanels = editor.Panels.getPanel(panelId)!
		.toJSON()
		.buttons.toJSON()
		.filter((tabs: { active: boolean }) => tabs.active);
	if (checkPanels.length == 0) {
		return false;
	} else {
		return true;
	}
}

/**
 * Initialize Commands for the style editor .layers-container
 */
export function setCommands(editor: VisualEditor.BlinkEditor) {
	// Define commands layers-container
	//editor.Commands.add("show-layers", toggleLeftPanelOptions);
	//@ts-ignore
	editor.Commands.add('show-layers', leftPanelConfig('.layers-container'));
	//@ts-ignore
	editor.Commands.add('show-blocks', leftPanelConfig('#content-blocks'));
	//@ts-ignore
	editor.Commands.add('show-pages', leftPanelConfig('#pages-container'));
	//editor.Commands.extend("show-blocks",()=>console.log("wow"));
	//@ts-ignore
	editor.Commands.add('show-editor-config', leftPanelConfig('#configEditor'));



	editor.Commands.add(
		'show-styles',
		//@ts-ignore
		defaultPaneltConfig('#stlyeSelectorContainer', rightPanelRunCallback, rightPanelStopCallback)
	);

	editor.Commands.add(
		'show-traits',
		//@ts-ignore
		defaultPaneltConfig('.traits-container', rightPanelRunCallback, rightPanelStopCallback)
	);
	editor.Commands.add(
		'show-ai',

		//@ts-ignore

		defaultPaneltConfig('#ai-prompt', rightPanelRunCallback, rightPanelStopCallback)
	);


	//editor.Commands.add('show-component-css',defaultPaneltConfig('#component-css', rightPanelRunCallback, rightPanelStopCallback));
	//component-css


	//@ts-ignore
	editor.Commands.add('expand-screen', (_editor: VisualEditor.BlinkEditor) => {
		//console.log(editor, "Has expanded");
		expandEditor();
	});
	//@ts-ignore
	editor.Commands.add('tlb-edit', (editor: VisualEditor.BlinkEditor) => {
		//console.log(editor);

		editOption(editor, editor.getSelected());
	});


	editor.Commands.add('edit-table-data', {
		//@ts-expect-error
		run: (editor: VisualEditor.BlinkEditor, _sender: any) => {
			if (dev) console.log('Run edit table data command')
			//table-data-container
			const container = document.getElementById('table-data-container');
			container!.style.display = 'flex';


		},
		//@ts-expect-error
		stop: (editor: VisualEditor.BlinkEditor, _sender: any) => {
			if (dev) console.log('Stop edit table data command')
			//Hide the component
			const container = document.getElementById('table-data-container');
			container!.style.display = 'none';
		}
	})

	/*
	editor.Commands.add('tlb-slice', (editor: VisualEditor.BlinkEditor) => {
		const css: [{}] = [{}];

		function getComponentById(editor: VisualEditor.BlinkEditor, componentId: string) {
			const component = editor.DomComponents.getById(componentId);
			return component || null;
		}

		function spliceStyles(editor: VisualEditor.BlinkEditor, id: string) {
			const slices = getComponentById(editor, id).components();
			const style = getComponentById(editor, id).styleToString();
			if (slices.length > 0) {
				//@ts-ignore
				css[id] = style;
				slices.forEach((child: { styleToString: () => any; ccid: any; components: () => { (): any; new(): any; length: number; }; }) => {
					const childStyle = child.styleToString();
					const childId = child.ccid;
					//@ts-ignore
					css[childId] = childStyle;

					if (child.components().length > 0) {
						console.log(child);
						spliceStyles(editor, childId);
					}
				});
			} else {
				//@ts-ignore
				css[id] = style;
			}
		}

		spliceStyles(editor, editor.getSelected()!.ccid);
		css.shift();

		editor.Modal.open();
		const box = document.createElement('div');
		box.innerHTML = popupHtml;
		const spliceBtn = box.querySelector('.saveBtn');
		const spliceName = box.querySelector('#spliceName');
		spliceBtn?.addEventListener('click', async () => {
			//@ts-ignore
			console.log('hello');
			//check the db if name exists and if they don't provide a name write splice-[name of block]
			const request = await fetch('/content/splice', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data: 'Test'
				})
			});
			if (request.ok) {
				//console.log(await request.json());
			}
			//@ts-ignore
			createSliceBlock(editor, spliceName?.value, editor.getSelected()?.toJSON(), css);
			editor.Modal.close();
			//@ts-ignore
		});
		editor.Modal.setContent(box);
		const currentModal = document.querySelector('.blink-mdl-container .blink-mdl-dialog');
		currentModal?.classList.add('w-90');
		currentModal?.classList.add('bg-transparent');

		//spliceBtn?.addEventListener
	});
	*/

	editor.Commands.add('set-device-desktop', {
		run: (editor: { setDevice: (device: string) => any }) => editor.setDevice('Desktop')
	});
	editor.Commands.add('set-device-mobile', {
		run: (editor: { setDevice: (device: string) => any }) => editor.setDevice('Mobile')
	});
	editor.Commands.add('set-device-mobile-iphone', {
		run: (editor: { setDevice: (device: string) => any }) => editor.setDevice('Mobile-Iphone')
	});
	editor.Commands.add('set-device-tablet', {
		run: (editor: { setDevice: (device: string) => any }) => editor.setDevice('Tablet')
	});

	editor.Commands.add('canvas-clear', {
		run: () => {
			if (confirm('Are you sure you want to clear the canvas?')) {
				editor.DomComponents.clear();
			}
		}
	});

	editor.Commands.add('show-data-parser', {
		getRowEl(editor: {
			getContainer: () => {
				(): any;
				new(): any;
				closest: {
					(editorRow: string): any;
					new(): any;
				};
			};
		}) {
			return editor.getContainer().closest('.editor-row');
		},
		getLayersEl(row: { querySelector: (container: string) => any }) {
			return row.querySelector('#data-parser');
		},

		run(editor: any, sender: any) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = '';
		},
		stop(editor: any, sender: any) {
			const lmEl = this.getLayersEl(this.getRowEl(editor));
			lmEl.style.display = 'none';
		}
	});

	editor.Commands.add('secondary-menu', {
		run: () => {
			editorPanels()!.contextMenu!.classList.remove('hidden');
			const x = editorPanels()!.contextMenu!.dataset.xPosition;
			const y = editorPanels()!.contextMenu!.dataset.yPosition;
			editorPanels()!.contextMenu!.style.cssText = `
                position:fixed;
                left:${x}px;
                top:${y}px;
            `;
		},
		stop: () => {
			editorPanels()!.contextMenu!.classList.add('hidden');
		}
	});


}
