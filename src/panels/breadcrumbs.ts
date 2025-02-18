/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import type {BlinkEditor} from "../editorTypes";
//import { editorPanels } from "../controller/state";

function createElement(html: string){
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content //.childNodes;
}

export default function breadCrumbs(editor: VisualEditor.BlinkEditor, config: {}) {
    
    const generateQuerySelector = (el : HTMLElement) => {
        
        let str = el.dataset.gjsType;//el.tagName.toLowerCase();
       
        if(el.dataset.gjsType === "wrapper")str='body';
        //str += el.dataset.gjsType  ?  el.dataset.gjsType  : "";
        el.className.length &&
            el.className.split(/\s/).forEach((cls : string) => {
                str +=
                    cls != "gjs-selected" &&
                    cls != "cke_editable" &&
                    cls != "cke_editable_inline" &&
                    cls != "cke_contents_ltr" &&
                    cls != "cke_show_borders"
                        ? "." + cls
                        : "";
            });
        const parentElement = el.parentNode as HTMLElement;
        
        return createElement(`${generateTree(parentElement)} 
        <div class="crumbCard">    
            <div class="crumb">
                <div class="crumbBg">
                    <span class="crumbText">
                        ${str}
                    </span>
                    <div class="crumbArrow"></div>
                    
                </div>
            </div>
        </div>
        `);
    };

    const generateTree = (el : HTMLElement) : string => {
        
        if (el.tagName.toLowerCase() === "html")
            return  /*html*/`
            <div class="crumbCard">    
                <div class="crumb">
                    <div class="crumbBg">
                    <span class="crumbText">
                        body
                    </span>
                    <div class="crumbArrow"></div>
                    </div>
                </div>
            </div>
            `; 
        if (el.tagName.toLowerCase() === "wrapper" || el.dataset.gjsType === "wrapper")
            return  /*html*/`
            <div class="crumbCard">
                <div class="crumb">
                    <div class="crumbBg">
                        <span class="crumbText">
                            body
                        </span>
                        <div class="crumbArrow"></div>
                    </div>
                </div>
            </div>
            `; 
        if (el.dataset.gjsType){
            //template checker
            let typeName = el.dataset.gjsType;
            if(el.dataset.gjsType === "wrapper")typeName='body';
            const parentElement = el.parentNode as HTMLElement;
            return (
                generateTree(parentElement) +
                /*html*/ `
                <div class="crumbCard">
                    <div class="crumb">
                        <div class="crumbBg">
                            <span class="crumbText">
                                ${typeName}
                            </span>
                            <div class="crumbArrow"></div>
                        </div>
                    </div>
                </div>
                `
            );
        }else{
            return ``;
        }
        
    };
    //replace with render
    //const $ : any = editor.$;
    //const pfx = editor.Config.stylePrefix;

    editor.on("component:selected", (model: { getEl: () => HTMLElement; }) => {
       
        const breadCrumbs = document.getElementById('breadcrumbs') as HTMLElement;
        //const breadcrumbs = $(`#breadcrumbs`);
        //editorPanels.breadCrumbs = document.getElementById('breadcrumbs') as HTMLElement;
        //TODO replace with a template or lit
        breadCrumbs.innerHTML = `<hr class="breadCrumbTopLine">`;
        /*breadcrumbs.html(`
            <hr class="breadCrumbTopLine">  
        `);*/
        try {
            breadCrumbs.append(generateQuerySelector(model.getEl()));
        } catch (error) {
            console.warn(error)
        }
        
        breadCrumbs.querySelectorAll("span").forEach((elem)=>{
            elem.addEventListener("click", function (e : any) {
                const doc = editor.Canvas.getDocument();
                editor.select(doc.querySelector(e.currentTarget.innerText.trim()));
            });
        })
        
        

        
    });
}
