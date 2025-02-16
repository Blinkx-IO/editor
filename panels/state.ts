/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { browser } from '$app/environment';
//import type { VisualEditor.BlinkEditor } from '../editorTypes';

const toggledLayer = () => document.getElementById('toggledEditorLayer') as HTMLElement;
const wrapper = () => document.querySelector('#editor-wrapper') as HTMLElement;
const closeItems = () => toggledLayer()!.querySelectorAll('.closeLayer') as NodeListOf<HTMLElement>;
//Default styles
export const editorWidths = {
	topPane: `top:3.9rem;`, //`top:3.2rem;`, //editor body
	canvas: `width: 74.5%; left:3%;`,
	leftPanel: `width : 2.5%`,
	rightPanel: `width: 20%`,
	leftSlidePane: `left:2.5%;`,
	leftPanelContainer: 'width:auto;',
	breadCrumbs: 'width: 74%; left:3%;'
};

/**
 * Widths for Pinned Sizes
 */
export const pinnedWidths = {
	leftPanelContainer: () => {
		if (screen.width >= 1900) return 'width:19%;';
		else if (screen.width >= 1500 && screen.width < 1900) return 'width:20%;';
		else return 'width:16%;';
	},
	canvas: 'width :69%; left : 0%;', //left18 width 59.5
	breadCrumbs: 'width: 68.5%; left: 16%;',
	rightPanelContainer: 'width:0px' //display none with a timeout
};
//e0e5ee
//padding top and left 5px
const canvasStateWidths = {
	leftClosedRightOpen: 'width :74.5%; left:3%;', //left 3
	bothClosed: 'width:94.5%; left:3%;', //left 3
	leftOpenRightClosed: () => {
		if (screen.width >= 1500) return 'width:79.5%; left:18%;';
		else return 'width:77%; left:20%;';
	}, //77 20
	bothOpen: () => {
		if (screen.width >= 1500 /*&& screen.width < 1900*/) return 'width:59.5%;left:18%;';
		else return 'width:57%;left:20%;';
	}
};

export const canvasGutterClasses = {
	innerCanvas: ['pb-[90px]'], //["pb-[78px]"],
	canvas: ['pl-1', 'pr-[15px]']
};

export const editorPanels = () => {
	if (browser) {

		return {
			leftPanelContainer: document.getElementById('left-panel') as HTMLElement,
			leftSlidePane: document.getElementById('leftSlideOutMenu') as HTMLElement,
			innerCanvas: document.getElementById('editorCanvas') as HTMLElement,
			canvas: document.getElementById('editor-container') as HTMLElement,
			leftPanel: document.querySelector('.panel__left') as HTMLElement,
			rightPanel: document.querySelector('.panel__right') as HTMLElement,
			topPanel: document.getElementById('top-panel') as HTMLElement,
			editorBody: document.getElementById('editorBody') as HTMLElement,
			breadCrumbs: document.getElementById('breadcrumbs') as HTMLElement, //breadcrumbsContainer
			breadCrumbsContainer: document.getElementById('breadcrumbsContainer') as HTMLElement,
			contextMenu: document.getElementById('context-menu') as HTMLElement
		};
	}
};

/*const initialWidths = {
	topPane : editorPanels().topPanel.style,
	leftSlidePane : editorPanels().leftSlidePane.style,
}*/
//!Move this to svelte component
export function resizeCanvas(editor: VisualEditor.BlinkEditor) {
	//panel either on or off
	const checkState = (dataset: string) => {
		if (dataset == 'on' || dataset == 'true') {
			return true;
		} else {
			return false;
		}
	};
	//Left Panel State
	const left = checkState(toggledLayer()!.dataset.pinnedState!);
	//Right Panel State
	//@ts-ignore
	const right = checkState(editorPanels().rightPanel.dataset.toggledState!);
	//toggledLayer().dataset.pinnedState
	//note breadcrumbs must follow the width of the canvas

	//check left and right to determine canvas size

	//if left is closed and right is open
	if (!left && right) {
		//@ts-ignore
		editorPanels().canvas.style.cssText = canvasStateWidths.leftClosedRightOpen;
		//@ts-ignore
		editorPanels().breadCrumbsContainer.style.cssText = canvasStateWidths.leftClosedRightOpen;
	}
	//if left is closed and right is closed
	else if (!left && !right) {
		//@ts-ignore
		editorPanels().canvas.style.cssText = canvasStateWidths.bothClosed;
		//@ts-ignore
		editorPanels().breadCrumbsContainer.style.cssText = canvasStateWidths.bothClosed;
	}
	//if left is open and right is open
	else if (left && right) {
		//@ts-ignore
		editorPanels().canvas.style.cssText = canvasStateWidths.bothOpen();
		//@ts-ignore
		editorPanels().breadCrumbsContainer.style.cssText = canvasStateWidths.bothOpen();
	}
	//if left is open and right is closed
	else if (left && !right) {
		//@ts-ignore
		editorPanels().canvas.style.cssText = canvasStateWidths.leftOpenRightClosed();
		//@ts-ignore
		editorPanels().breadCrumbsContainer.style.cssText = canvasStateWidths.leftOpenRightClosed();
	}

	setTimeout(() => {
		editor.refresh();
	}, 300);
}

export type state = 'true' | 'false';
//!Move this to svelte component
function enablePinElements(editor: VisualEditor.BlinkEditor) {
	if (browser) {
		const pinLayers = toggledLayer()!.querySelectorAll('.pinLayer') as NodeListOf<HTMLElement>;

		pinLayers.forEach((ele) => {
			ele.addEventListener('click', () => {
				pinPanel(editor);
			});
		});
	}
}

//!Move this to svelte component
function enableCloseElements(editor: VisualEditor.BlinkEditor) {
	if (browser) {
		const closeItems = toggledLayer()!.querySelectorAll('.closeLayer') as NodeListOf<HTMLElement>;
		closeItems!.forEach((elem) => {
			elem.addEventListener('click', () => {
				closeLeftPanel(editor);
				//const command = elem.dataset.Command as string;
				//editor.Commands.stop(command);
				const pinnedState = toggledLayer()!.dataset.pinnedState as state;
				if (pinnedState === 'true') {
					//
					//set styles
					//editorPanels().canvas.style.cssText = editorWidths.canvas;
					//@ts-ignore
					editorPanels().leftPanelContainer.style.cssText = editorWidths.leftPanelContainer;
					toggledLayer()!.dataset.pinnedState = 'false';

					resizeCanvas(editor);
				}
				editor.refresh();
			});
		});
	}
}

//!Move this to svelte component
function toggleRightPanel(open: boolean, editor: VisualEditor.BlinkEditor /*_panel : HTMLElement*/) {
	if (browser) {
		if (open) {
			//open
			//@ts-ignore
			editorPanels().rightPanel.dataset.toggledState = 'on';
			//panel rights width
			//transform: translateX(20vw);
			//@ts-ignore
			editorPanels().rightPanel.querySelector<HTMLElement>('.right_tab_left')!.style.transform = '';

			//set canvas function

			//editorPanels().rightPanel.querySelector<HTMLElement>('.right_tab_right')!.style.width = "";
			//editorPanels().rightPanel.style.cssText = editorWidths.rightPanel;

			//setTimeout(() => {
			//panel.style.display = "";
			//}, 400);
			//transform: translate(20vw, 0px);
		} else {
			//close
			//@ts-ignore
			editorPanels().rightPanel.dataset.toggledState = 'off';
			//@ts-ignore
			editorPanels().rightPanel.querySelector<HTMLElement>('.right_tab_left')!.style.transform =
				'translateX(20vw)';
			//editorPanels().rightPanel.querySelector<HTMLElement>('.right_tab_right')!.style.width = "100%";
			//editorPanels().rightPanel.style.cssText =`    width:50px;`;

			//setTimeout(() => {
			///panel.style.display = "none";
			//}, 400);
		}
		resizeCanvas(editor);
	}
}

//TODO add types for states
function openLeftPanel(editor: VisualEditor.BlinkEditor) {
	//console.log("Toggle State");

	const state = toggledLayer()!.dataset.toggledState;
	if (wrapper()!.dataset.load !== 'initial')
		if (state == 'off') {
			toggledLayer()!.classList.remove('hidden');
			toggledLayer()!.dataset.toggledState = 'on';
			//@ts-ignore
			if (editorPanels().rightPanel.dataset.toggledState == 'on') {
				//@ts-ignore
				editor.stopCommand('show-styles');
				//@ts-ignore
				editor.Panels.getButton('panel-utilities', 'show-style')!.set('active', 0);
				toggleRightPanel(false, editor);
			} else {
				editor.refresh();
			}
		}

	//resizeCanvas(editor);
	//editor.refresh();
	//data-toggled-state="off"
	//Take the left panel active data*
}
//!Move this to svelte component
function closeLeftPanel(editor: VisualEditor.BlinkEditor, ignoreActive = false) {
	const state = toggledLayer()!.dataset.toggledState;
	const pinned = toggledLayer()!.dataset.pinnedState;
	if (wrapper()!.dataset.load !== 'initial')
		if (state == 'on' && pinned == 'false') {
			toggledLayer()!.classList.add('hidden');
			toggledLayer()!.dataset.toggledState = 'off';
			//@ts-ignore
			const activePanel = editorPanels().leftPanelContainer.querySelector(
				'.blink-pn-active'
			) as HTMLElement;
			if (activePanel && !ignoreActive) activePanel.click();

			editor.refresh();
		}
	//resizeCanvas(editor);
}
//!Move this to svelte component
//TODO add types for states
function pinPanel(editor: VisualEditor.BlinkEditor) {
	const pinnedState = toggledLayer()!.dataset.pinnedState as state;

	if (pinnedState === 'true') {
		//
		//set styles
		//editorPanels().canvas.style.cssText = editorWidths.canvas;
		//@ts-ignore
		editorPanels().leftPanelContainer.style.cssText = editorWidths.leftPanelContainer;
		//editorPanels().breadCrumbs.style.cssText = editorWidths.breadCrumbs;
		toggledLayer()!.dataset.pinnedState = 'false';
		//editor.refresh();
		resizeCanvas(editor);
	} else {
		//editorPanels().canvas.style.cssText = pinnedWidths.canvas;
		//@ts-ignore
		editorPanels().leftPanelContainer.style.cssText = pinnedWidths.leftPanelContainer();
		//editorPanels().breadCrumbs.style.cssText = pinnedWidths.breadCrumbs;
		toggledLayer()!.dataset.pinnedState = 'true';
		resizeCanvas(editor);
		//editor.refresh();
	}
	//resizeCanvas(editor);
	editor.refresh();
	//data-pinned-state
	//state close open
	//widths
}

export {
	toggledLayer,
	pinPanel,
	enablePinElements,
	enableCloseElements,
	openLeftPanel,
	closeLeftPanel,
	toggleRightPanel,
	wrapper,
	closeItems
};
