//import type {BlinkEditor} from "../editorTypes";
export function addCustomStyleTraits(editor : VisualEditor.BlinkEditor){
    
    /*editor.StyleManager.addType('my-custom-prop', {
        create({ props, change }) {
          console.log(props,change,"create method");
          const el = document.createElement('div');
          el.innerHTML = '<input type="range" class="my-input" min="10" max="50"/>';
          const inputEl = el.querySelector('.my-input');
          inputEl.addEventListener('change', event => change({ event })); // change will trigger the emit
          inputEl.addEventListener('input', event => change({ event, complete: false }));
          return el;
        },
        emit({ props, updateStyle }, { event, complete }) {
            console.log(props,updateStyle,'emit method')
          const { value } = event.target;
          const valueRes = value + 'px';
          // Pass a string value for the exact CSS property or an object containing multiple properties
          // eg. updateStyle({ [props.property]: valueRes, color: 'red' });
          updateStyle(valueRes, { complete });
        },
        update({ value, el }) {
            console.log(value,el, 'updateMethod')
          el.querySelector('.my-input').value = parseInt(value, 10);
        },
        
        templateInput: (...params) => {console.log(params)}
        ,
        destroy() {
          // In order to prevent memory leaks, use this method to clean, eventually, created instances, global event listeners, etc.
        }
     })
     //editor.StyleManager.createType('my-custom-prop');*/

     editor.StyleManager.addType("pretty-margin",{
        view:{
            templateInput: () => ``,

            setValue(value: any){
                //
                console.log(value);
            },

            onRender(){
                const { ppfx, em, model } : any = this;
                console.log('render method',ppfx,em,model)
            },

            destroy() {
                const { gp } : any = this;
                console.log(gp);
                gp && gp.destroy();
            }
        }
     })
}


