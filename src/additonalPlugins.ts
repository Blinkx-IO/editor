/* eslint-disable @typescript-eslint/ban-ts-comment */
//import GrapesTouch from 'grapesjs-touch';
import { blockCategories } from './blocks/interfaces';
import basicBlocks from './blocks/contentblocks/basicblocks';
import codeBlocks from './blocks/contentblocks/codeblocks';
import appBlocks from './blocks/contentblocks/appblocks';
import formBlocks from './blocks/contentblocks/forms/index';
import CustomCode from 'grapesjs-custom-code';
import PostCSS from 'grapesjs-parser-postcss';
//import Tabs from "grapesjs-tabs";
//import "grapesjs-lory-slider";
//import Typed from "grapesjs-typed";
import BgLayer from 'grapesjs-style-bg';
import Tooltip from 'grapesjs-tooltip';

import RteExtensions from './plugins/rte';
import styleFilter from './plugins/filters';
import LineBlock from './blocks/contentblocks/Line-block';
//import LinkBlock from './blocks/contentblocks/Link-block';
import TableBlock from './blocks/contentblocks/Table-block';
//import BgLayer from "../plugins/backgroundLayers";

const additionalPlugins = [/*LinkBlock,*/ LineBlock, TableBlock] as ((editor: VisualEditor.BlinkEditor) => void)[];
function setUpPlugins() {
	return [
		//"blink-basic-blocks",
		//@ts-ignore
		basicBlocks,
		//"blink-code-blocks",
		//@ts-ignore
		codeBlocks,
		//Tooltip Block
		
		(editor: VisualEditor.BlinkEditor) =>
		//@ts-expect-error
			Tooltip(editor, {
				blockTooltip: {
					category: blockCategories.advanced,
					media: '',
					label: `
                <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4Z" />
                </svg>
                Tooltip
                `
				}
			}),
		//Form Blocks
	
		(editor: VisualEditor.BlinkEditor) => {
			formBlocks(editor);
		},
		//formBlocks,
		
		BgLayer,
		
		styleFilter,
		//RTE
		
		(editor: VisualEditor.BlinkEditor) => {
			RteExtensions(editor, {
				list: true,
				indentOutdent: true,
				extra: true,
				actions: true,
				maxWidth: '1200px'
				/*fontColor:{
                    fontColor: true,
                    hilite: true,
                    fontName: defaultFonts
                }*/

				//undoredo:true
			});
		},
		//Script Editor
		
		
		//Custom Code Block
		
		(editor: VisualEditor.BlinkEditor) =>
		//@ts-expect-error
			CustomCode(editor, {
				//@ts-ignore
				blocks: ['custom-code'],
				blockCustomCode: {
					category: blockCategories.advanced,
					media: '',
					label: /*html*/ `
                <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8 12L9.4 16.6L8 18L2 12L8 6L9.4 7.4L4.8 12ZM19.2 12L14.6 16.6L16 18L22 12L16 6L14.6 7.4L19.2 12Z" />
                </svg>
                Custom Code
                `
				}
			}),
		//Tabs Block
		/*(editor: VisualEditor.BlinkEditor) =>
        Tabs(editor, {
            tabsBlock: {
                category: blockCategories.advanced,
                media: "",
                label: `
                <svg style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g>
                        <rect height="5" width="5" x="19" y="4"/>
                        <path d="M26,9h5V7c0-1.7-1.3-3-3-3h-2V9z"/>
                        <rect height="5" width="5" x="12" y="4"/>
                    </g>
                    <path d="M11,11c-0.6,0-1-0.4-1-1V4H4C2.3,4,1,5.3,1,7v18c0,1.7,1.3,3,3,3h24c1.7,0,3-1.3,3-3V11H11z M7,9H4C3.4,9,3,8.6,3,8  s0.4-1,1-1h3c0.6,0,1,0.4,1,1S7.6,9,7,9z"/>
                </svg>
                Tabs
                `,
            },
        }),*/
		
		PostCSS,
		
		appBlocks,
		//GrapesTouch,
		...additionalPlugins
	];
}
function setUpPlugInOpts() {
	return {
		//@ts-ignore
		'grapesjs-tooltip': {
			blockTooltip: {
				category: blockCategories.advanced
			}
		},
		//@ts-ignore
		'grapesjs-tabs': {
			tabsBlock: {
				category: blockCategories.advanced
			}
		}
	};
}

export { setUpPlugInOpts, setUpPlugins };
