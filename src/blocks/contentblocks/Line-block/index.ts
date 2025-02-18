import type { BlinkEditor } from '../../../editorTypes';
import { defaultToolbar } from '../../../toolbar/toolbar';
import { blockCategories } from '../../interfaces';
//Create Block

export default function LineBlock(editor: BlinkEditor) {
	//Block for the ui
	const block = {
		name: 'line',
		label: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" height="15">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
        <span>Line</span>`,
		content: {
			type: 'Lineblock'
		}
	};
	//Create the type of block first, this is the functional portion ie
	// these block will work in the editor but they are not a draggable icon yet
	//these are bare min defaults there are more component options like styling, scripts, etc
	editor.Components.addType('Lineblock', {
		model: {
			defaults: {
				toolbar: defaultToolbar,
				icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" height="15">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
              </svg>`,
				tagName: 'hr',

				style: {
					border: '1px solid gray',
					margin: '20px 0 20px 0'
				}
			}
		}
	});

	editor.BlockManager.add(block.name, {
		label: block.label,
		content: block.content,
		category: blockCategories.basic
	});
}

//This script will need to be imported to the visualeditor.ts file as a plugin to be enabled
