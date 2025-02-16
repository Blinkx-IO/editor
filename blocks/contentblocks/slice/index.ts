import type { Component, ComponentDefinition } from 'grapesjs';
import { blockCategories } from '../../interfaces';
import { contentBlock } from '../model';
import { defaultToolbar } from '$visualeditor/toolbar/toolbar';
import { dev } from '$app/environment';
//import { func } from 'prop-types';
//import type { BlinkEditor } from "../../editorTypes";

export function createSliceBlock(
	editor: VisualEditor.BlinkEditor,
	sliceName: string,
	sliceBlock: ComponentDefinition,
	css: [{}]
) {
	const sliceLabelName = `Slice-${sliceName}`;
	const sliceIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
	<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
  </svg>`;
	const parentBlock: { block: ComponentDefinition } = {
		//@ts-ignore
		block: {},
		css: css
	};

	const a = JSON.stringify(sliceBlock);
	const slice = JSON.parse(a);
	console.log(slice.attributes.id);
	console.log(slice);

	function toJson(css: string) {
		var cssArray = css.split(';'); // Split the string into an array using the semicolon as a delimiter
		var cssObject = {};

		cssArray.forEach(function (item) {
			var pair = item.split(':'); // Split each item into key-value pair using colon as a delimiter

			//@ts-ignore
			cssObject[pair[0]] = pair[1]; // Assign the key-value pair to the object
		});
		//@ts-ignore
		delete cssObject[''];
		return cssObject;
	}

	function addingCss(slice: any) {
		//@ts-ignore
		if (slice.components && slice.components.length > 0) {
			//@ts-ignore
			slice.style = toJson(css[slice.attributes.id]);
			slice.components.forEach((child: any) => {
				console.log(child);
				if (child.components && child!.components.length > 0) {
					//@ts-ignore
					addingCss(child);
				} else {
					//@ts-ignore
					child.style = toJson(css[child.attributes.id]);
				}
			});
		} else {
			//@ts-ignore
			slice.style = toJson(css[slice.attributes.id]);
		}
	}
	console.log(css);
	addingCss(slice);
	console.log(slice.style);

	/*
	function blockData(sliceBlock: ComponentDefinition, parentBlock: { block: ComponentDefinition }) {
		//@ts-ignore
		if (sliceBlock.components?.length > 0) {
			parentBlock.block = sliceBlock;
			//@ts-ignore

			sliceBlock.components.forEach((child, index) => {
				if (parentBlock.block.components) {
					parentBlock.block.components[index] = child.toJSON();
				} else {
					parentBlock.block.components = child.toJSON();
				}
				console.log(child.toJSON());
				if (child.attributes.components.length > 0) {
					//@ts-ignore
					blockData(child.toJSON(), parentBlock.block.components[index]);
				}
			});
		} else {
			parentBlock.block = sliceBlock;
		}
	}
	*/

	//blockData(JSON.parse, parentBlock);

	const block = {
		name: sliceLabelName,
		label: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
	  </svg>
	  <span>${sliceLabelName}</span>`,
		content: {
			type: sliceLabelName
		}
	};

	editor.Components.addType(sliceLabelName, {
		model: {
			defaults: {
				toolbar: defaultToolbar,
				icon: sliceIcon,
				components: slice.components,
				style: slice.style
			}
		}
	});

	editor.BlockManager.add(block.name, {
		label: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
	  </svg>
	  <span>${sliceLabelName}</span>`,
		content: block.content,
		category: blockCategories.duplicates
	});
}
