import type { BlinkEditor } from "../editorTypes";
//import feather from 'feather-icons'
import {html,render} from "lit-html"
//import {createLitElement} from "./utilities";

//const html = (str : TemplateStringsArray | any) => {return str}

export function createPopUpToolbar(){
  const toolbar = document.querySelector('#blink-tools')
  const optionPanel = document.createElement('div')
  optionPanel.id = "optionPanelCustom"
  const innerContainer = document.createElement('div')
  //innerContainer.id = "innerOptionPanel"

  optionPanel.appendChild(innerContainer)
  toolbar?.insertBefore(optionPanel,toolbar.childNodes[0])
  optionPanel.classList.add('invisible', 'opacity-0', 'optionsPanel')
}

//!switch to LIT/
export function popUpTraits(editor: BlinkEditor, open : boolean) {
    const topPositionOffset = 22
    const toolBarParent = document.querySelector('.blink-toolbar') as HTMLElement
    const toolbar = document.querySelector('#optionPanelCustom') as HTMLElement
    const innerContainer = document.querySelector('#optionPanelCustom div') as HTMLElement
    
    toolbar.classList.add('pt-5');

    const content = html`   
        <div hidden class="dynamicBlock flex justify-center mb-3">
            <i class="h-4 w-4 mr-1" data-feather="box"></i>
            <button class="mt-auto mb-auto w-36 text-left">Save as Dynamic Block</button>
        </div>

        <div hidden class="duplicateContentBlock flex justify-center mb-3">
            <i class="h-4 w-4 mr-1" data-feather="copy"></i>
            <button class="mt-auto mb-auto w-36 text-left">Duplicate Block</button>
        </div>

        <div class="deleteContentBlock flex justify-center mb-3">
            <i class="h-4 w-4 mr-1" data-feather="trash"></i>
            <button class="mt-auto mb-auto w-36 text-left">Delete Block</button>
        </div>
    `
    render(content,innerContainer);
    //innerContainer.innerHTML = content
    //feather.replace()
    
    const blockData = editor.getSelected()

    document.querySelector('#optionPanelCustom div .dynamicBlock button')?.addEventListener("click", () => {
        editor.Commands.run('store-dynamic-block', {blocks : blockData})
    })

    document.querySelector('#optionPanelCustom div .duplicateContentBlock button')?.addEventListener("click", () => {
        editor.Commands.run('tlb-clone')
    })

    document.querySelector('#optionPanelCustom div .deleteContentBlock button')?.addEventListener("click", () => {
        editor.Commands.run('tlb-delete')
    })
    

    if (document.querySelector('#optionPanelCustom')?.classList.contains('invisible') && open) {
        toolbar?.classList.remove('invisible', 'opacity-0')
        toolbar.classList.add('opacity-100')
        //console.log(toolbar.style.top)
        toolbar.style.top = (parseInt(toolBarParent.style.top.toString()) + topPositionOffset).toString() + 'px'
    } else {
        toolbar?.classList.add('invisible', 'opacity-0')
        toolbar?.classList.remove('opacity-100')
    }
}


