import type { BlinkEditor } from '../../../editorTypes';
import { defaultToolbar } from '../../../toolbar/toolbar';
//Existing categories to choose from
import { blockCategories } from '../../interfaces';

//Create Block
export default function blockTemplate(editor: BlinkEditor) {
	//Block for the ui
	const block = {
		name: 'Tableblock',
		label: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
      </svg>
      <span>Table</span>
      `,
		content: {
			type: 'Table'
		}
	};

	function editorScript(props: any) {
		let id = this.id;
		const myTrait = props.fileO;
		const initLib = function (file) {
			if (myTrait.length == 0) {
				window.test = 0;
				new gridjs.Grid({
					columns: ['Name', 'Email', 'Phone Number'],
					pagination: props.pagination,
					sort: props.sort,
					search: props.search,
					fixedHeader: props.fixedHeader,
					height: '400px',
					width: '500px',
					data: [
						['John', 'john@example.com', '(353) 01 222 3333'],
						['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
						['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
						['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
						['Afshin', 'afshin@mail.com', '(353) 22 87 8356']
					],
					style: {
						table: {
							width: 'auto'
						}
					}
				}).render(document.getElementById(id));
			} else {
				setTimeout(() => {
					new gridjs.Grid({
						columns: file[0],
						pagination: props.pagination,
						sort: props.sort,
						search: props.search,
						fixedHeader: props.fixedHeader,
						height: '400px',
						width: '500px',
						data: file.splice(1),
						style: {
							table: {
								'border-collapse': 'collapse',
								'border-spacing': 0,
								width: 'auto'
							}
						}
					}).render(document.getElementById(id));
				}, 500);
			}
		};
		if (props.changeTable == 'dataTable') {
			if (typeof gridjs == 'undefined') {
				props.content = ``;
				const script = document.createElement('script');
				script.onload = initLib;
				script.src = 'https://unpkg.com/gridjs/dist/gridjs.umd.js';
				document.body.appendChild(script);
				const scriptCss = document.createElement('link');
				scriptCss.href = 'https://unpkg.com/gridjs/dist/theme/mermaid.min.css';
				scriptCss.rel = 'stylesheet';
				document.head.appendChild(scriptCss);
				initLib(myTrait);
			} else {
				props.content = ``;
				initLib(myTrait);
			}
		}
	}
	//Create the type of block first, this is the functional portion ie
	// these block will work in the editor but they are not a draggable icon yet
	//these are bare min defaults there are more component options like styling, scripts, etc
	editor.Components.addType('Table', {
		model: {
			defaults: {
				toolbar: defaultToolbar,
				pagination: false,
				sort: false,
				search: false,
				fixedHeader: false,
				changeTable: 'dataTable',
				fileO: [],
				content: ``,
				tagName: 'div',
				traits: [
					{
						name: 'id'
					},
					{
						type: 'checkbox',
						name: 'pagination',
						changeProp: true
					},
					{
						type: 'checkbox',
						name: 'sort',
						changeProp: true
					},
					{
						type: 'checkbox',
						name: 'search',
						changeProp: true
					},
					{
						type: 'checkbox',
						name: 'fixedHeader',
						changeProp: true
					},
					{
						type: 'select',
						name: 'changeTable',
						changeProp: true,
						options: [
							{ value: 'dataTable', name: 'Data Table' },
							{ value: 'htmlTable', name: 'Basic Table' }
						]
					},
					{
						type: 'fileOpener',
						name: 'fileO',
						label: 'Select File',
						changeProp: true
					}
				],
				script: editorScript,
				//resizable : true, allow block to be reziable via mouse cursor
				//components:[], array of children blocks if required can be json or html string
				style: {
					display: 'inline-block',
					width: 'auto'
				},
				'script-props': [
					'pagination',
					'sort',
					'search',
					'fixedHeader',
					'changeTable',
					'content',
					'fileO'
				]
				//script: function editorScript(props: any) {
				//  console.log("hello world");
				//},
				//use this to add functionality to the editor
				//this function will only run outside the editor ie when api is called
			},
			init(this: BlinkEditor['Components']) {
				//when block initializes do something
			},

			//useful if we need to update the block based on the user changing traits/option the props will contain prev,current, and trait name
			updated(this: BlinkEditor['Components'], property: any, value: any, prevValue: any) {
				//console.log(`These properties have been updated ${property} ${prevValue} ${value}`);
				//
				const fileValue = this.get('fileO');
				if (this.get('changeTable') == 'htmlTable') {
					if (fileValue.length != 0) {
						let box = `
    <table border="1px solid black" style="display:block">
    <thead>
    ${fileValue[0]
			.map((val) => {
				return `
            <th scope="col">${val}</th>
        `;
			})
			.join('')}
    </thead>
     <tbody>
     ${fileValue
				.map((val, index) => {
					if (index === 0) return;
					else if (index === fileValue.length - 1) return;
					return `
            <tr>
                ${val
									.map((sub_val) => {
										return `
                        <td>${sub_val}</td>
                    `;
									})
									.join('')}
            </tr>
        `;
				})
				.join('')}
    </tbody>
    </table>
    `;
						this.set({ content: box }, { fileO: fileValue });
					} else {
						this.set({
							content: `<table border="1px solid black" style="display:block">
                        <thead>
                            <th>Header 1</th>
                            <th>Header 2</th>
                            <th>Header 3</th>
                            <th>Header 4</th>
                        </thead>
                         <tbody>
                            <tr>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            </tr>
                            <tr>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            </tr>
                            <tr>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            </tr>
                            <tr>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            <td>Body of table</td>
                            </tr>
                        </tbody>
                        </table>`
						});
					}
				} else {
					this.set({ content: `` });
				}
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
