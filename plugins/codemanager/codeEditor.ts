/* eslint-disable @typescript-eslint/ban-ts-comment */
//import type {BlinkEditor} from "../../editorTypes";
function setCodeViewer(){
    //
}


export function createCodeEditor(editor : VisualEditor.BlinkEditor){

    interface attributes{
        id:string
    }

    interface compOpts{
        toArray():rawComponent[];
    }
    interface components{
        attributes:attributes;
        type:string;
        style:string;
        script:string;
        components:compOpts;
        "custom-name"?:string;

    }

    interface rawComponent{
        toJSON():components;
        
    }

    function parseType(type : string, child? : string){
        if (type == undefined)return ``;
        let tag = 'div';
        let inner = '';
        let inferredType = type;
        if(child){
            inner = child;
        }

        if (type === "image"){
            tag = 'img';
        }
        if(type === "textnode"){
            inferredType= "text";
        }
        
        return `<${tag} data-blink-type='${inferredType.toLowerCase()}'>${inner}</${tag}>`
    }

    function mapTag(components : rawComponent[]){
        return components.map((values)=>{
            let element = ``;
            if (values.toJSON().components){
                //keep looping through children
                const childComponents = values.toJSON().components.toArray();
                element = parseType(values.toJSON().type,mapTag(childComponents).join(''));
                /*element = childComponents.map(vals => {
                    return parseType(
                        values.toJSON().type,
                        mapTag(childComponents).join('')
                    );//check here
                }).join('');*/
                //element = parseType(values.toJSON().type,mapTag());
            }else{
                element = parseType(values.toJSON().type);
            }
            return element;
        })
    }

    function parseComponents(editor:VisualEditor.BlinkEditor){
        //@ts-ignore
        const components : rawComponent[] = editor.getComponents().toArray();

        //editor.Components.getComponents().toArray()[0].toJSON()
        const mappedResult = mapTag(components);

        //console.log(mappedResult);

    }


    //TODO switch to the render container for element binding
    //const pfx = editor.getConfig().stylePrefix;
    //const modal = editor.Modal;
    ///const commands = editor.Commands;
    //@ts-ignore
    const codeViewer = editor.CodeManager.getViewer('CodeMirror'); //.clone();
    //const pnm = editor.Panels;
    const container = document.createElement('div');
    const btnEdit = document.createElement('button');
    
    const codeSlider = document.getElementById('bottom-code-panel') as HTMLElement;
    const closeButton = codeSlider.querySelector(".close-slider") as HTMLElement;
    
    //These setting come from CodeMirror
    codeViewer.set({
        codeName: 'htmlmixed',
        readOnly: 0,
        theme:'lucario',
        autoBeautify: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        lineWrapping: true,
        styleActiveLine: true,
        smartIndent: true,
        indentWithTabs: true
    });

    //console.log(codeViewer);
    //code-options
    //TODO Modify this to split HMTL, CSS, JS
    btnEdit.textContent = 'Save';
    //btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.className = "border bg-gray-200 border-gray-300 hover:border-gray-400 hover:bg-gray-200 rounded-md text-sm py-2 px-2 mb-2 mr-2";
    
    //Modify this for code grab, export etc
    btnEdit.onclick = function() {
        const code = codeViewer.editor.getValue();
        //console.log(code, editor.getJs())
        
        //Clear canvas
        editor.DomComponents.getWrapper().set('content', '');
        
        //Set content html
        editor.setComponents(code) //.trim());
        //modal.close(); close slider

        //strip all the js
        //let temp = editor.DomComponents.getWrapper().find("#itfl")[0]
        //temp.attributes.script = ""
        codeSlider.style.height  = "0vh";
        btnEdit.classList.add("hidden");
    };

//TODO move this to commands, and upgrade to the codeviewer to monaco
editor.Commands.add('html-edit', {
    //@ts-ignore
    run: function(editor : BlinkEditor, sender : any) {
        //sender && sender.set('active', 0);
        let viewer = codeViewer.editor;
        //parseComponents(editor);
        if(btnEdit){
            btnEdit.classList.remove("hidden");
        }
        //modal.setTitle('Edit code');
        if (!viewer) {
            const txtarea = document.createElement('textarea');
            const styleBlock = document.createElement("div");
            styleBlock.innerHTML =/*html*/`
                <style>

                    .blink-mdl-content {
                        padding: 0!important;
                    }
                    .CodeMirror{
                        height: 82vh!important;
                        margin-bottom:10px;
                        padding-bottom:30px;
                    }

                    #bottom-code-panel{
                        background:#2b3e50;
                    }

                    .blink-mdl-dialog {
                        max-width: 90vw!important;
                    }

                </style>
            `;
            const buttonFlexContainer = document.createElement('div');
            container.append(styleBlock);
            buttonFlexContainer.append(btnEdit);
            buttonFlexContainer.style.cssText =`
                position: fixed;
                bottom: 20px;
                z-index: 40;
                right: 30px;
            `;
            buttonFlexContainer.classList.add("flex","justify-end");
            container.appendChild(txtarea);
            container.appendChild(buttonFlexContainer);
            codeViewer.init(txtarea);
            viewer = codeViewer.editor;
        }

        //split these with components
        const InnerHtml = editor.getHtml();
        const Css = editor.getCss();
        
        //modal.setContent('');
        //modal.setContent(container);

        //TODO set this as separate containers
        codeSlider.appendChild(container);
        
        //TODO change this to tabs
        codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
        
        codeSlider.style.height = "90vh";
        //modal.open();
        closeButton.addEventListener("click",()=>{
            codeSlider.style.height  = "0vh";
            btnEdit.classList.add("hidden");
            //btnEdit.remove();
        });
        
        //Refresh the code editor
        viewer.refresh();
    }
});


editor.Keymaps.add('html-edit', '⌘+shift+e, ctrl+shift+e', 'html-edit');


editor.Panels.addButton('options',
//@ts-ignore    
[
        {
            id: 'edit',
            className: 'fa fa-edit',
            command: 'html-edit',
            attributes: {
                title: 'Edit'
            }
        }
    ]
);
}