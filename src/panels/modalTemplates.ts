import { html, render } from "lit-html";
//import type { BlinkEditor } from "../editorTypes";

const defaultButton = html`
<div class="flex justify-center text-xs my-5">
                <a href="/settings" class="inline-flex items-center px-3 py-2 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-secondary-accent-blue hover:bg-secondary-accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent-blue">
                Let's do this
                </a>
            </div>
`;

export function modalSmall(editor: VisualEditor.BlinkEditor, title = {logo:'',main:'',sub:''}, content? : string, button = defaultButton, width? : string) {
    editor.Modal.setTitle(/*html*/ `
        <div class="flex justify-center">
            ${title.logo}
        </div>
        <div class="flex flex-col">          
            <div class="ml-2 text-base font-semibold text-center" >
                    ${title.main}
            </div>
            <div class="text-muted text-center text-sm my-1">
                    ${title.sub}
            </div>
        </div>
    `);
    const contentContainer = html`
        <style>
            
            .blink-mdl-header {
                border-bottom: none;
            }
        </style>
    
        <div class="my-2 text-sm"> 
            <div class="rounded-md bg-gray-100 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <!-- Heroicon name: solid/information-circle -->
                        <svg class="h-5 w-5 text-secondary-accent-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-between">
                        <p class="text-sm text-gray-500">
                        ${content}
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
        
        ${button}
        
    `;
    const contentBody = document.createElement('div');
    render(contentContainer,contentBody);
    editor.Modal.setContent(contentBody);
    editor.Modal.open();
    document.querySelector<HTMLElement>('.blink-mdl-dialog')!.style.cssText = "max-width: 460px!important; background:white;";
}
