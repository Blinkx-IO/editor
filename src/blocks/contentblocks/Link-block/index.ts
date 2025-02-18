//import { on } from 'gulp';
//import { ids } from 'webpack';

import { defaultToolbar } from '../../../toolbar/toolbar';
//Existing categories to choose from
import { blockCategories } from '../../interfaces';
import traits from '../forms/traits';

//Create Block
export default function LinkBlock(editor: VisualEditor.BlinkEditor) {
	//Block for the ui
	const block = {
		name: 'link',
		label: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clip-rule="evenodd" />
      </svg>
      <span>Link</span>
      `,
		content: {
			type: 'Linkblock'
		}
	};
	//Create the type of block first, this is the functional portion ie
	// these block will work in the editor but they are not a draggable icon yet
	//these are bare min defaults there are more component options like styling, scripts, etc
	editor.Components.addType('Linkblock', {
		model: {
			defaults: {
				toolbar: defaultToolbar,
				content: 'www.YourLink123.ca',
				tagName: 'a',

				linkName: 'www.YourLink123.ca',
				//resizable : true, allow block to be reziable via mouse cursor
				//components:[], array of children blocks if required can be json or html string
				//styles:'display:flex;'
				//styles:'css goes here string or object',
				//use this to add functionality to the editor
				//this function will only run outside the editor ie when api is called
				//"script-export": function scriptExport(props: any) {},

				traits: [
					{
						name: 'id'
					},
					{
						name: 'href',
						//href: '',
						label: 'Link',
						placeholder: 'eg www.google.com'
					},

					{
						name: 'linkName',
						type: 'text',
						label: 'Name',
						changeProp: true
					}
				]
			},
			//console.log(this.get("traits").where({name: "link"})[0].get("value"));
			/*init(this: BlinkEditor["Components"]) {
                //when block initializes do something
                console.log(this, `${this} block has been enabled`);
            },
            */
			//useful if we need to update the block based on the user changing traits/option the props will contain prev,current, and trait name
			updated(this: VisualEditor.BlinkEditor['Components'], property: any, value: any, prevValue: any) {
				let nameOfLink = this.get('linkName');
				if (nameOfLink == '') {
					this.set({ content: 'www.YourLink123.ca' });
				} else {
					this.set({ content: nameOfLink });
				}
				//
			}
		}
		/**
         * use view to init script on render or modify events
         * view:{
            events: {
                click: (e: {preventDefault: () => any}) => {
                  e.preventDefault();
                 
                  //console.log(e);
                },
            },
            onRender( {el} : {editor : BlinkEditor, el  : HTMLElement, model : any} ) {
                //console.log(el);
                el.addEventListener('click',(ev:Event)=>{
                  ev.preventDefault();
                  
                })
                //el.setAttribute('onclick','');
              }
        }**/
	});

	editor.BlockManager.add(block.name, {
		label: block.label,
		content: block.content,
		category: blockCategories.basic
	});
}

//This script will need to be imported to the visualeditor.ts file as a plugin to be enabled
