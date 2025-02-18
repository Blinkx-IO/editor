import {editor} from '../view/visualeditor'

const codeViewer = editor.CodeManager.getViewer('CodeMirror')

export function setCodeViewer(){
    console.log(codeViewer)
    editor.CodeManager.getViewer('CodeMirror').attributes.readOnly = false
    console.log(codeViewer.editor.getValues())
    //codeViewer.attributes.readOnly = false
}

//editor.DomComponents.render()

//editor.DomComponents.getComponents()

//editor.setComponents('')


//editor.CodeManager.getViewers()["CodeMirror"]

//editor.CodeManager.getViewer('CodeMirror').attributes

