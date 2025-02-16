/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {BlinkEditor} from "../../../editorTypes";
import {defaultToolbar} from "$visualeditor/toolbar/toolbar";
//Existing categories to choose from
import {blockCategories} from "../../interfaces";

//Create Block
export default function blockTemplate(editor : BlinkEditor){

    //Block for the ui
    const block = {
        name :'Default Block',
        label : 'svg goes here',
        content:{
            type:"customType"
        }
        
    }
    //Create the type of block first, this is the functional portion ie
    // these block will work in the editor but they are not a draggable icon yet
    //these are bare min defaults there are more component options like styling, scripts, etc
    editor.Components.addType('customType',{
        model:{
            defaults:{
                toolbar: defaultToolbar,
                content:'<div><p>Default content</p></div>',
                icon:'Insert an html icon here svgs are pretty good',
                //resizable : true, allow block to be reziable via mouse cursor
                //components:[], array of children blocks if required can be json or html string
                //styles:'display:flex;'
                //styles:'css goes here string or object',
                //'script-props':['data-value'],
                //use this to add functionality to the editor
                //script:function editorScript(props:any){}
                //this function will only run outside the editor ie when api is called
                //'script-export':function scriptExport(props:any){},
                /**
                 * traits:[
                 * {
                    link : '',
                    label :'Link',
                    placeholder : 'eg www.google.com'
                    }
                 * ]
                 */
            },
            init(this : BlinkEditor['Components']){
                //when block initializes do something
                console.log(this,`${this} block has been enabled`)
            },
            //useful if we need to update the block based on the user changing traits/option the props will contain prev,current, and trait name
            updated(this : BlinkEditor['Components'], property:'traits' | 'status', value:any, prevValue:any){
                //console.log(`These properties have been updated ${property} ${prevValue} ${value}`)
                //console.log(`The current value is ${property}`);
                //value --> if trait, state hover,click etc, style changes 
                console.log(property)
                if(property == 'traits'){
                    console.log(property,prevValue,value);
                    
                    this.

                    //@ts-ignore
                    this.setTraits([{title: 'my custom title'}])
                    //this.replaceWith('<div>Some new content goes here</div>');
                }
               
                //
            }
        },
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
        category: blockCategories.basic,
    });
}

//This script will need to be imported to the visualeditor.ts file as a plugin to be enabled