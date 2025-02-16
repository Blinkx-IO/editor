//import type {BlinkEditor} from "../../editorTypes";

export default function addStyleProps(editor :VisualEditor.BlinkEditor){

    editor.StyleManager.addProperty('background',
    {
        name:"border-top-width",
        type:"integer",
        property:"border-top-width",
        units:['px','%','em']
        
    },
    
    )

}