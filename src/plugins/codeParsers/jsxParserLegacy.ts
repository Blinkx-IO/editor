//import type { BlinkEditor} from "../editorTypes";
//import type {Component, ComponentConfig } from "grapesjs";
interface Props {
    className: string;
    children: JSXObject[] | string;
}

/*interface Store {
}*/

export type JSXObject = {
    $$typeof:symbol;
    type: string;
    key?: unknown;
    ref?: any;
    props: Props;
    _owner?: any;
    tagName?: string;
    //_store: Store;
}

//Potential to add this as a utility
//TODO add component type
function filterComponentTypes(editor : VisualEditor.BlinkEditor, component : JSXObject | any){
    const filtered = editor.Components.getTypes().filter((types)=>types.name == component.type);

    if (filtered.length == 0)return;
    else return filtered[0].name;
}

const createComponent = (editor : VisualEditor.BlinkEditor, jsxChildren : JSXObject)=>{
    const filtered = filterComponentTypes(editor,jsxChildren);
    //TODO add component type
    let comp : any = {
        type:'box',
    };

    if (filtered)comp.type = filtered;

    //Put this in a separate function
    if(jsxChildren.props.className)comp.attributes = {class :jsxChildren.props.className};
    if(typeof(jsxChildren.props.children) === 'string'){
        comp.content = jsxChildren.props.children;
        comp.type = 'text';
    }
    if(jsxChildren.props.children && typeof(jsxChildren.props.children) !== 'string'){
        if(Array.isArray(jsxChildren.props.children))comp.components=filterChildren(editor,jsxChildren.props.children);
        else{
            //child components
            comp = createComponent(editor,jsxChildren.props.children);
        }
    }
    

    return comp;
    
}

function filterChildren(editor : VisualEditor.BlinkEditor,children : JSXObject[]){
    
    const filterJSXChildren = children.map((jsxChildren)=>{
        
        if(Array.isArray(jsxChildren)){
            //TODO add component type
            const comps : any[] = [];
            jsxChildren.forEach((vals)=>{
                //console.log(vals)
                comps.push(createComponent(editor,vals));
              /*return {
                  components:createComponent(vals)
                }*/
            })
            return {components:comps};
        }else{
            return createComponent(editor,jsxChildren);
        }

    })
    //console.log(filterJSXChildren);
    return filterJSXChildren;
}
//TODO add component type
export function transformJSX(editor : VisualEditor.BlinkEditor, component:JSXObject | any){
    const jsxComponent = component as JSXObject;

    const filtered = filterComponentTypes(editor,jsxComponent);
    //Warn user they have not defined the type so they will get box as the default type
    let newType = 'box';
    if (filtered)newType = filtered;
    //TODO add component type
    const transformed : any  ={
        type:newType,
    }
    if(jsxComponent.props.className)transformed.attributes= {class: jsxComponent.props.className};
    if (jsxComponent.props.children && typeof(jsxComponent.props.children) !== 'string'){
        if(Array.isArray(jsxComponent.props.children))transformed.components = filterChildren(editor,jsxComponent.props.children);
        else transformed.components = createComponent(editor,jsxComponent.props.children);
    }

    return transformed;
}