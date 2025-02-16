/* eslint-disable @typescript-eslint/ban-ts-comment */
import type Component from 'grapesjs'
//import type { BlinkEditor } from "../editorTypes";
import { defaultToolbar } from "../toolbar/toolbar"
//import { modalStyles } from '../design/styles/tailwind'
import { imageStyle, cardHeadertextStyle, cardSubtextStyle, cardtextStyle } from '../design/styles/componentStyles';


declare global {
  interface Window {
    dataLayer: any;
  }
}

/*function include(file: string) {
  const script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0)!.appendChild(script);
}
*/


const columnComponents = {
  type: 'single-column',
  toolbar: defaultToolbar,
  resizable: true,
  components: {
    type: 'card',
    components: [{
      type: 'image',
      style: imageStyle

    },
    {
      type: 'text',
      style: cardHeadertextStyle,
      content: 'Title'
    },
    {
      type: 'text',
      style: cardSubtextStyle,
      content: 'Subtitle'
    },
    {
      type: 'text',
      style: cardtextStyle,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
    }
    ]
  },
  style: {
    'padding-right': '15px',
    'padding-left': '15px'
  }
}

const boxIcon = /*html*/
  `<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 20 20" fill="currentColor">
<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
</svg>`

export function addDomComponents(editor: VisualEditor.BlinkEditor) {

  //Update Existing components
  editor.Components.addType('link', {

    model: {
      updated(this: typeof Component, property: any, value: any, prevValue: any) {

        if (property === "data-search" && value != '') {
          //@ts-ignore
          console.log('look here', property, value, this.attributes);
        }
      },
      defaults: {
        'script-props': ['data-search'],
        toolbar: defaultToolbar,
        droppable: true,
        content: 'Insert your text here',
        traits: [
          {
            name: 'id',
          },
          {
            name: 'title',
            label: 'Title',
            placeholder: 'Title good for SEO/Accesibility'
          },
          {
            label: 'Link to',
            name: 'href',
            placeholder: 'eg https://www.example.com',
            value: 'https://www.example.com',
          },
          {
            name: 'target',
            label: 'Target',
            type: 'select',
            options: [
              { id: '_blank', name: 'New window' },
              { id: '_self', name: 'This window' },
            ]
          },
          {
            name: 'rel',
            label: 'Rel Attribute'
          },
          {
            name: 'data-search',
            label: 'Query Parameters',
            type: 'text',
            changeProp: true,
          }
        ]
      },
    },
  })
  //Update Existing components
  editor.DomComponents.addType('text', {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 4V7H10.5V19H13.5V7H19V4H5Z"/>
      </svg>
      `,
        content:/*html*/`Insert your text here`,
        toolbar: defaultToolbar,
        resizable: true, //{ratioDefault: 1},
        /*style:{
          'font-family': 'Helvetica, sans-serif',
        }*/
      },
    },
  })



  //Update Existing components
  editor.DomComponents.addType('image', {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M22 4H14L12 2H6C4.9 2 4.01 2.9 4.01 4L4 16C4 17.1 4.9 18 6 18H22C23.1 18 24 17.1 24 16V6C24 4.9 23.1 4 22 4ZM2 6H0V11H0.01L0 20C0 21.1 0.9 22 2 22H20V20H2V6ZM11.5 9L7 15H21L17.5 10.5L15 13.51L11.5 9Z" />
      </svg>
      `,
        toolbar: defaultToolbar,
        traits: [
          {
            name: 'id',
          },
          {
            name: 'alt',
          },
          {
            name: 'loading',
          },
          {
            name: 'title',
            label: 'Title',
            placeholder: 'Title good for SEO/Accesibility'
          },
          {
            label: 'Image Source',
            name: 'src',
            placeholder: 'eg https://www.example.com'
          },
        ]
      },

    },


  })

  editor.DomComponents.addType("map", {
    model: {
      defaults: {
        icon:/*html*/`
      <svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
      </svg>
      `
      }
    }
  })


  editor.DomComponents.addType("video", {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"/>
      </svg>
      `
      }
    }
  })

  editor.DomComponents.addType("tooltip", {
    model: {
      defaults: {
        icon:/*html*/
          `
      <svg height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 4C22 2.9 21.1 2 20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H18L22 22V4Z" />
      </svg>
      `
      }
    }
  })

  editor.DomComponents.addType("lory-slider", {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <path d="M29,2H3C1.3,2,0,3.3,0,5v16c0,1.7,1.3,3,3,3h26c1.7,0,3-1.3,3-3V5C32,3.3,30.7,2,29,2z M7.7,14.3c0.4,0.4,0.4,1,0,1.4  C7.5,15.9,7.3,16,7,16s-0.5-0.1-0.7-0.3l-2-2c-0.4-0.4-0.4-1,0-1.4l2-2c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4L6.4,13L7.7,14.3z   M27.7,13.7l-2,2C25.5,15.9,25.3,16,25,16s-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.3-1.3l-1.3-1.3c-0.4-0.4-0.4-1,0-1.4  s1-0.4,1.4,0l2,2C28.1,12.7,28.1,13.3,27.7,13.7z"/>
      <circle cx="16" cy="28" r="2"/>
      <circle cx="10" cy="28" r="2"/>
      <circle cx="22" cy="28" r="2"/>
      </svg>
      `
      }
    }
  })

  editor.DomComponents.addType("typed", {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 7V4H15.5V7H10.5V19H7.5V7H2.5ZM12.5 9H21.5V12H18.5V19H15.5V12H12.5V9Z"/>
      </svg>
      `
      }
    }
  })

  editor.DomComponents.addType("tabs", {
    model: {
      defaults: {
        icon:/*html*/
          `
      <svg height="15" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><rect height="5" width="5" x="19" y="4"/><path d="M26,9h5V7c0-1.7-1.3-3-3-3h-2V9z"/><rect height="5" width="5" x="12" y="4"/></g><path d="M11,11c-0.6,0-1-0.4-1-1V4H4C2.3,4,1,5.3,1,7v18c0,1.7,1.3,3,3,3h24c1.7,0,3-1.3,3-3V11H11z M7,9H4C3.4,9,3,8.6,3,8  s0.4-1,1-1h3c0.6,0,1,0.4,1,1S7.6,9,7,9z"/>
      </svg>
      `
      }
    }
  })

  editor.DomComponents.addType("custom-code", {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8 12L9.4 16.6L8 18L2 12L8 6L9.4 7.4L4.8 12ZM19.2 12L14.6 16.6L16 18L22 12L16 6L14.6 7.4L19.2 12Z" />
      </svg>
      `
      }
    }
  })

  // custom-code

  //Ecommerce Component
  editor.Components.addType('ecommerce', {
    model: {
      defaults: {
        toolbar: defaultToolbar,
        draggable: false,
        content: `<div data-blink-type=ecommerce></div>`
      }
    }
  })



  editor.Components.addType('googleAnalytics', {
    model: {
      defaults: {
        toolbar: defaultToolbar,
        //draggable:false,
        content: ``,
        traits: [{
          changeProp: true,
          type: 'text', // If you don't specify the type, the `text` is the default one
          name: 'googleId', // Required and available for all traits
          label: 'Google Analytics Id', // The label you will see near the input
          // label: false, // If you set label to `false`, the label column will be removed
          placeholder: 'Place your google analytics tracking id here', // Placeholder to show inside the input
        }],
        'script-export': function placeTag(props: any) {

          function includeJs(file: string) {
            const script = document.createElement('script');
            script.src = file;
            script.type = 'text/javascript';
            script.defer = true;
            document.getElementsByTagName('head').item(0)!.appendChild(script);
          }
          includeJs(`https://www.googletagmanager.com/gtag/js?${props.googleId}`);
          window.dataLayer = window.dataLayer || [];
          // eslint-disable-next-line prefer-rest-params
          function gtag(...params: any) { window.dataLayer.push(...params); }
          gtag('js', new Date());

          gtag('config', props.googleId);


        },
        "script-props": ["googleId"]
      }
    }
  })

  editor.Components.addType('googleTagManager', {
    model: {
      //@ts-ignore
      init(this: Component) {
        //console.log(this,"has been initialized");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
      },
      /*view:{
        init() {
          console.log('Local hook: view.init');
        },
        onRender() {
          console.log('Local hook: view.onRender');
        },
      },*/

      defaults: {

        toolbar: defaultToolbar,
        //draggable:false,
        content: ``,
        traits: [{
          changeProp: true,
          type: 'text', // If you don't specify the type, the `text` is the default one
          name: 'googleId', // Required and available for all traits
          label: 'Google Tag Manager Id', // The label you will see near the input
          // label: false, // If you set label to `false`, the label column will be removed
          placeholder: 'Place your google tag manager id here', // Placeholder to show inside the input
        }],
        'script-export': function placeTag(props: any) {

          (function (w: any, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
              'gtm.start':
                new Date().getTime(), event: 'gtm.js'
            });
            const f = d.getElementsByTagName(s)[0],
              j: any = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode!.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', props.googleId);

        },
        "script-props": ["googleId"]
      }
    }
  })

  //Modal Component



  // Define a new custom component
  editor.Components.addType('box', {
    model: {

      init(this: typeof Component) {
        //@ts-ignore
        this.addTrait!(
          [
            // { name: "data-href", type: "text", label: "Link" }
          ]
        )
      },
      /*updated(this : Component, property:any, value:any, prevValue:any) { 
        console.log(property)
        if(property === "data-href" && value != ''){
          this.attributes!.script = function(props : any){
            const box = this as HTMLElement;
            box.addEventListener('click',()=>{
              location.href = props['data-href'];
            })
            
          }
        }
        else if (property === "data-href" && value == ''){
          this.attributes!.script = '';
        }
        
      },*/
      defaults: {
        //'script-props':['data-href','id'],
        icon: boxIcon,
        toolbar: [...defaultToolbar],
        //script,
        content: /*html*/`<div> </div>`,
        resizable: true,
        // Add some style, just to make the component visible
        style: {
          //'box-sizing': 'border-box',
          display: 'flex',
          'flex-direction': 'column',
          //'flex-shrink': '0',
          'min-height': '200px',
          //'margin-top': '20px',
          //position: 'relative'
        }
      }
    },

    view: {
      events: {
        //@ts-expect-error
        click: (e: { preventDefault: () => any }) => {
          e.preventDefault();

          //console.log(e);
        },
      },
      //@ts-expect-error
      onRender({ el }: { editor: VisualEditor.BlinkEditor, el: HTMLElement, model: any }) {
        //console.log(el);
        el.addEventListener('click', (ev: Event) => {
          ev.preventDefault();

        })
        //el.setAttribute('onclick','');
      }
    },
  })

  const innerGridElement = { type: "box" };



  editor.Components.addType("grid", {
    model: {
     
      init(this: typeof  Component) {
        //@ts-expect-error
        this.addTrait!(
          [
            {
              type: 'select',
              name: 'columns',
              changeProp: true,
              options: [
                { name: '1', value: 'repeat(1, minmax(0, 1fr))' },
                { name: '2', value: 'repeat(2, minmax(0, 1fr))' },
                { name: '3', value: 'repeat(3, minmax(0, 1fr))' },
                { name: '4', value: 'repeat(4, minmax(0, 1fr))' },
                { name: '5', value: 'repeat(5, minmax(0, 1fr))' },
                { name: '6', value: 'repeat(6, minmax(0, 1fr))' },
              ]
            },
            {
              name: "gridGap",
              type: 'number',
              placeholder: '0-10',
              changeProp: true,
              min: 0, // Minimum number value
              max: 10, // Maximum number value
              step: 0.5 // Number of steps


            }
          ],
          {
            at: 0
          }
        )
      },
      //@ts-ignore
      updated(this: Component, property: any, value: any, prevValue: any) {
        //property is rows
        //value is selected
        //prevvalue is last value
        if (property === "columns") {
          //value
          const currentStyle = this.getStyle!();
          currentStyle["grid-template-columns"] = value;
          this.setStyle!(currentStyle);
        } else if (property === "gridGap") {
          const currentStyle = this.getStyle!();
          currentStyle["gap"] = `${value}rem`;
          this.setStyle!(currentStyle);
        }
      },
      defaults: {
        icon:/*html*/`
      <svg  height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9 11H4V5H9V11ZM9 18H4V12H9V18ZM10 18H15V12H10V18ZM21 18H16V12H21V18ZM10 11H15V5H10V11ZM16 11V5H21V11H16Z" />
      </svg>
      `,
        toolbar: defaultToolbar,
        style: {
          display: "grid",
          gap: "0.5rem",
          "grid-template-columns": "repeat(3, minmax(0, 1fr))"
        },
        components: [
          innerGridElement, innerGridElement, innerGridElement, innerGridElement, innerGridElement, innerGridElement
        ]
      }
    }
  })

  editor.Components.addType('card', {
    model: {
      defaults: {
        toolbar: defaultToolbar,
        //script,
        content: /*html*/`<div data-blink-type='card'> </div>`,
        // Add some style, just to make the component visible
        style: {
          /*'box-sizing': 'border-box',
          display: 'flex',
          'flex-direction': 'column',
          'flex-shrink': '0',
          height: '200px',
          'margin-top': '20px',
          position: 'relative'*/
          'display': 'flex',
          'flex-direction': 'column',
          'position': 'relative',
          'margin-top': '30px',
          'text-align': 'center',
          'line-height': 'normal',
          'height': 'auto',
          'min-height': '20px',
          'min-width': '20px',
          'overflow': 'hidden',

        }
      }
    }
  })



  // Define a new custom component
  editor.Components.addType('single-column', {
    model: {
      defaults: {
        toolbar: defaultToolbar,
        resizable: true,
        //script,
        content: `<div data-blink-type='single-column'> </div>`,
        // Add some style, just to make the component visible
        style: {
          /*margin: '15px',
          'flex-grow': '1',
          'width': 'auto',
          'height': 'auto',
          'padding-top': '20px',
          'padding-bottom': '20px',
          'padding-right': '20px',
          'padding-left': '20px',
          display: 'flex',
          'flex-direction': 'column',*/
          'display': 'flex',
          'flex-direction': 'column',
          'line-height': 'normal',
          'width': 'calc(50% - 10px)',
          'margin-left': '0px'


        }
      }
    }
  })


  editor.Components.addType('columns', {
    model: {
      defaults: {
        toolbar: defaultToolbar,
        resizable: true,
        icon:/*html*/`
      <svg height="15"  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 18H9V5H4V18ZM10 18H15V5H10V18ZM16 18V5H21V18H16Z" />
      </svg>
      `,
        label: 'Container',
        content: '<div> </div>',
        /*traits: [
          {
            type: 'customTrait',
            name: 'customTrait',
            label: 'Custom Trait',
          },
        ],*/
        components: {
          //script,
          content: `<div data-blink-type='columns'> </div>`,
          toolbar: defaultToolbar,
          components: [columnComponents, columnComponents, columnComponents],
          // Add some style, just to make the component visible
          style: {
            display: 'flex',
            'flex-direction': 'row', //was row before
            //'flex-wrap': 'wrap',
            //'box-sizing': 'border-box',
            //'min-height': '250px',
            //'justify-content': 'space-around',
            //flexMobileQuery
          }
        },
        style: {
          'display': 'flex',
          'flex-direction': 'column',
          //'position': 'relative',
          //'margin-top': '20px',
        }
      }
    }
  })

  editor.Components.addType('section', {
    model: {
      defaults: {
        icon:/*html*/`
      <svg height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3 11V5H22V11H3ZM3 19H9V12H3V19ZM10 19H22V12H10V19Z" />
      </svg>
      `,
        label: 'Section',
        toolbar: defaultToolbar,
        content: '<section> </section>',
        components: [
          {
            type: "text",
            content: ` I am a section! My content keeps from getting too wide, so that it's easy to read even on big screens.`,
            style: {
              'text-align': 'center',
              //'font-family': 'Helvetica, sans-serif',
              //'font-size': '16px'
            }
          },
          {
            type: 'text',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur`,
            style: {
              'text-align': 'center',
              //'font-family': 'Helvetica, sans-serif',
              //'font-size': '16px'
            }
          }
        ], /*{
        
        type:'text',
        content : `
        I am a section! My content keeps from getting too wide, so that it's easy to read even on big screens.
        \\\\n


        
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur
        `,
        style:{
          'text-align':'center',
          'font-family': 'Helvetica, sans-serif',
          'font-size': '16px'
        }
      },*/
        style: {
          display: 'flex',
          "flex-direction": 'column',
          "padding-bottom": '50px',
          "padding-top": '50px',
          "padding-left": '20px',
          "padding-right": '20px'

        }
      }
    }
  })


  //TODO enable functionality in canvas
  editor.DomComponents.addType('modal', {
    model: {
      defaults: {
        tagName: 'dialog',
        traits: [
          {
            name: 'open',
            text: 'open',
            type: 'checkbox',
            //value:true,
            full: true,
            /*command: (e) => {
              const component = e.getSelected();
              if (component) {
                const toggleTrait = component.getTrait('open');
                const getVal = toggleTrait.props();
                if (getVal.value) {
                  //getVal.value = false;
                  toggleTrait.set({
                    value: false
                  })
                  //component.setAttributes({open:false});
                } else {
                  //getVal.value = true;
                  toggleTrait.set({
                    value: true
                  })
                  //component.setAttributes({open:false});
                }
              }
              //e.getSelected()?.setAttributes({open:false});
            }*/
          }
        ],
        /*attributes: {
          open: true
        },*/
        components: [
          {
            type: "form",
            attributes: {
              method: "dialog"
            },

            components: [
              {
                type: "button",
                text: 'Close',
                attributes: {
                  type: ''
                }

              }
            ]

          }
        ]
      },

    },
    
    view: {
      //tagName:'dialog',
      events: {
        click: 'innerModalClick'
      },
      init({model}){
        //model.setAttributes({open:true});
        console.log('init view',model.getAttributes().open)
        if(model.getAttributes().open){

        }
      },
      onRender({model}){
        console.log('on render',model.getAttributes().open)
      },
      innerModalClick(ev: Event) {
        //editor.Components.getById(this.cid)
        const component = this.model; //.getById(this.cid);

        if (component) {
          const getVal = component.getTrait('open').props();
          if (getVal.value) {
            component.getTrait('open').set({
              value: false
            });
            component.setAttributes({ open: false });
          } else {
            component.getTrait('open').set({
              value: true
            });
            component.setAttributes({ open: true });
          }

        }
      }
    }
  });
}