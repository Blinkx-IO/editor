//import type {BlinkEditor} from "../editorTypes";
//import {cssStyles} from "./interfaces"

//TODO move this to interface under editor
interface TraitManager {
	addType(name: string, options: object): any | string | HTMLElement;
}

export function setTraits(editor: VisualEditor.BlinkEditor, dev = false) {
	const traitManager: TraitManager = editor.TraitManager;

	//Add new traits
	traitManager.addType('customTrait', {
		// Expects as return a simple HTML string or an HTML element
		createInput({ trait }: any) {
			// Here we can decide to use properties from the trait
			const traitOpts = trait.get('options') || [];
			const options = traitOpts.length
				? traitOpts
				: [
					{ id: 'newField', name: 'New Field' },
					{ id: 'email', name: 'Email' }
				];

			// Create a new element container and add some content
			const el = document.createElement('div');
			el.innerHTML = /*html*/ `
      <select class="href-next__type">
        ${options
					.map((opt: any) => /*html*/ `<option value="${opt.id}">${opt.name}</option>`)
					.join('')}
      </select>
      <div class="href-next__url-inputs">
        <input class="href-next__url" placeholder="Insert URL"/>
      </div>
      <div class="href-next__email-inputs">
        <input class="href-next__email" placeholder="Insert email"/>
        <input class="href-next__email-subject" placeholder="Insert subject"/>
      </div>
    `;

			// Let's make our content interactive
			const inputsUrl = el.querySelector('.href-next__url-inputs') as HTMLElement;
			const inputsEmail = el.querySelector('.href-next__email-inputs') as HTMLElement;
			const inputType = el.querySelector('.href-next__type') as HTMLElement;
			inputType.addEventListener('change', (ev: any) => {
				switch (ev.target.value) {
					case 'height':
						inputsUrl.style.display = '';
						inputsEmail.style.display = 'none';
						break;
					case 'newField':
						inputsUrl.style.display = 'none';
						inputsEmail.style.display = '';
						break;
				}
			});

			return el;
		}
	}),
		traitManager.addType('fileOpener', {
			// Expects as return a simple HTML string or an HTML element
			createInput({ trait }: any) {
				// Create a new element container and add some content
				const el = document.createElement('div');
				el.innerHTML = /*html*/ `
          <form id="csvForm">
              <input class="form-control" id="csvFile" type="file" accept=".csv"/>

              <input style="border: 1px solid black; width: 50%; margin-left: 25%;" type="submit" value="Submit" />

          </form>
          
          
`;
				return el;
			},

			onEvent({ elInput, component, event, trait }) {
				const csvFile = elInput.querySelector('#csvFile');
				const csvForm = elInput.querySelector('#csvForm');

				let final_vals: [string[]] = [];

				csvForm.addEventListener('submit', (e: Event) => {
					e.preventDefault();

					let csvReader = new FileReader();
					const input = csvFile.files[0];

					csvReader.onload = function(evt) {
						const text = evt.target.result;

						if (typeof text === 'string' || text instanceof String) {
							const values = text.split(/[\n]+/);

							values.forEach((val) => {
								final_vals.push(val.split(','));
							});
						}
					};

					csvReader.readAsText(input);
					trait.set('value', final_vals);
				});
				return;
			}
		});
}
