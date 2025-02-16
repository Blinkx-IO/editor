/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {html, render} from "lit";
import {choose} from "lit/directives/choose.js";
import type {BlinkEditor} from "../../editorTypes";
import {htmlToElement, htmlToElements} from "./utility";
import {typeBgAttach, typeBgPos, typeBgRepeat, typeBgSize, typeColorLin} from "./properties";
const backgroundTypes = ["image", "color", "gradient"];
const bgUrlRegex = /(?:\(['"]?)(.*?)(?:['"]?\))/;
const backgroundImageParams = [
    {
        label: "Background repeat",
        property: "background-repeat",
        type: "select",
        options: ["repeat", "repeat-x", "repeat-y", "no-repeat"].map((values) => {
            return {id: values, propValue: {name: values}};
        }),
    },
    {
        label: "Background position",
        type: "select",
        property: "background-position",
        options: [
            "left top",
            "left center",
            "left bottom",
            "right top",
            "right center",
            "right bottom",
            "center top",
            "center center",
            "center bottom",
        ].map((values) => {
            return {id: values, propValue: {name: values}};
        }),
    },
    {
        label: "Background attachment",
        property: "background-attachment",
        type: "select",
        options: ["scroll", "fixed", "local"].map((values) => {
            return {id: values, propValue: {name: values}};
        }),
    },
    {
        label: "Background size",
        property: "background-size",
        type: "select",
        options: ["auto", "cover", "contain"].map((values) => {
            return {id: values, propValue: {name: values}};
        }),
    },
];

const placeHolderImage = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6IHJnYmEoMCwwLDAsMC4xNSk7IHRyYW5zZm9ybTogc2NhbGUoMC43NSkiPgogICAgICAgIDxwYXRoIGQ9Ik04LjUgMTMuNWwyLjUgMyAzLjUtNC41IDQuNSA2SDVtMTYgMVY1YTIgMiAwIDAgMC0yLTJINWMtMS4xIDAtMiAuOS0yIDJ2MTRjMCAxLjEuOSAyIDIgMmgxNGMxLjEgMCAyLS45IDItMnoiPjwvcGF0aD4KICAgICAgPC9zdmc+`;

const propertyParameters = (
    property: string,
    label: string,
    properties: {id: string; propValue: {name: string}}[],
) => {
    return {
        type: "composite",
        property,
        label,
        properties,
    };
};


//extend:'background',
//type:'composite',
//label:"background-image",
//property:'background-value',
export default (editor: BlinkEditor) => {
    const typeColor = editor.StyleManager.getType("color");
    const propModel = typeColor.model;
    /*
    editor.StyleManager.addType('color-linear', {
      model: propModel.extend({
          getFullValue() {
              const value = this.get('value');
              const def = this.get('defaults');
              return value ?
                (value === def ? def : `linear-gradient(${value},${value})`) :
                '';
          },
      }),
      view: typeColor.view
    })
    */
    function editImage(event: Event, change: Function) {
        editor.AssetManager.open({
            select(asset, complete) {
                const selected = editor.getSelected();
                if (selected) {
                    //console.log('selected',selected)
                    //selected.addAttributes({src: asset.getSrc()});
                    // The default AssetManager UI will trigger `select(asset, false)` on asset click
                    // and `select(asset, true)` on double-click
                    const el = event.target as any;
                    el.value = asset.getSrc();
                    change({event});

                    complete && editor.AssetManager.close();
                }
            },
        });
    }

    function layerType(event: Event, change: Function) {
        console.log(event, change);

        //switch between image, color, or gradient
    }

    function layerBody(type: "image" | "color" | "gradient",change : Function) {
        return html`
            ${choose(
                type,
                [
                    ["image", () => html`
                        
                            <div>
                                <img class="bg-image-slot w-12 h-12 object-fill" src=${placeHolderImage}>
                            </div>
                            <button @click=${(ev : Event)=> editImage(ev,change)}>
                                Choose Image
                            </button>
                            <div></div>
                        
                    `],
                    ["color", () => html``],
                    ["gradient", () => html``],
                ],
                () => html``,
            )}
        `;
    }

    //use change to toggle attribute change

    editor.StyleManager.addType("background-layer-styles", {
        // Create UI
        create(...obj: { change: Function; }[]) {
            //{props, change}
            //console.time();
            //console.log("obj init", obj);

            const container = document.createDocumentFragment();

            //el.addEventListener("change", (event) => change({event}));
            //el.addEventListener("input", (event) => change({event, partial: true}));
            const el = html`
                <div class="w-full flex flex-col">
                    <div class="flex">
                        <span>Type</span>
                        <div class=" bg-monochromatic-gray px-3 flex justify-between flex-grow">
                            <button
                                class="cursor-pointer hover:opacity-75 active:opacity-25"
                                @click="${(ev: Event) => layerType(ev, obj[0].change)}"
                            >
                                <svg class="h-6 w-6" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M8.5 13.5l2.5 3 3.5-4.5 4.5 6H5m16 1V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z"
                                    ></path>
                                </svg>
                            </button>
                            <button class="cursor-pointer hover:opacity-75 active:opacity-25">
                                <svg class="h-6 w-6" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                                    ></path>
                                </svg>
                            </button>
                            <button class="cursor-pointer hover:opacity-75 active:opacity-25">
                                <svg class="h-6 w-6" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M11 9h2v2h-2V9m-2 2h2v2H9v-2m4 0h2v2h-2v-2m2-2h2v2h-2V9M7 9h2v2H7V9m12-6H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2M9 18H7v-2h2v2m4 0h-2v-2h2v2m4 0h-2v-2h2v2m2-7h-2v2h2v2h-2v-2h-2v2h-2v-2h-2v2H9v-2H7v2H5v-2h2v-2H5V5h14v6z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="bg-body">
                    </div>
                </div>
            `;
           
            render(el, container);
            //Default view should always be the bg image layer
            render(layerBody('image',obj[0].change),container.querySelector<HTMLElement>('.bg-body')!);
            
            // console.timeEnd();
            return container;
        },
        // Propagate UI changes up to the targets
        //@ts-ignore
        emit({props, updateStyle}, {event, partial}) {
            //console.log(props, event.target);
            const {value} = event.target as any; //Value from an input field
            updateStyle(`${value}`, {partial});
        },
        // Update UI (eg. when the target is changed)
        //@ts-ignore
        update({value, el}) {
            //{value, el}
            //el.value = parseInt(value, 10);
            //console.log(obj)
            //includes('url(')
            //REGEX for background 
            //check for a prop of type
            console.log(value);
            const target = el.querySelector(".bg-image-slot") as HTMLImageElement;
            if (!['url()'].includes(value)) {
                
                if (value.includes("url(")) {
                    //
                    const bgUrl = value.match(bgUrlRegex);
                    target.src = bgUrl![1];
                } else {
                    target.src = value;
                }
            }else{
                target.src = placeHolderImage;
            }
            //el.parentNode?.querySelector('img').src = value;
        },
        // Clean the memory from side effects if necessary (eg. global event listeners, etc.)
        destroy() {},
    });
    
    editor.StyleManager.addBuiltIn("background-image", {
        property: "background-image",
        extend: "background-image",
        //@ts-ignore
        onChange({property, from, to}) {
            //console.log(property.getStyle(), property.getParent());
        },
        // onChange(...obj){
        //const props = obj[0];
        //console.log(props.property.toJSON())
        //if(props.property.property == 'background-image-color'){
        //    console.log(props.property)
        // }

        // }
    });
    //editor.Styles.getProperty('backgrounds','background-layer-type').addLayer
    editor.StyleManager.addBuiltIn("extra-background-effect", {
        full: true,
        properties: [typeBgAttach, typeBgPos, typeBgRepeat, typeBgSize],
    });

    editor.StyleManager.addBuiltIn("background-layer-type", {
        type: "stack",
        property: "background-image",
        //id:"background-layer",
        layerSeparator: " ",
        label: "Background Layers",
        full: true,
        fromStyle(style: Record<string,any>, {property, name}: any) {
            //console.log(style,property,name);
            //view.el

            //const check = {'background-image': style['background-image']}
            //console.log(style,property,name, check)
            if (style["background-image"]) {
                //console.log("WOWWOWOWOWO")
                return {
                    "background-layer-styles": style["background-image"],
                };
                //update style layer
                //property.view.el.querySelector('.bg-image-slot').style = `background-image:${style['background-image']}`
            }
            if (name === "background-image" && style["background-layer-styles"]) {
                return {
                    "background-image": `url(${style["background-layer-styles"]})`,
                };
            }
        },
        toStyle(values: Record<string,any>, {name}: any) {
            //background-layer-styles
            if (name == "background-image") {
                return {
                    "background-image": `url(${values["background-layer-styles"]})`,
                };
            }
            //console.log(values,name)
            //console.log('To style event has happend again')
            if (name === "background-layer-type" && values["background-layer-styles"]) {
                console.log("to style is true", values, name);
                return {
                    "background-image": `url(${values["background-layer-styles"]})`,
                };
            }
        },

        properties: [
            {
                property: "background-layer-styles",
                extend: "background",
                type: "background-layer-styles",
                full: true,
                onChange() {
                    console.log("change");
                },
            },
        ],

        /*onChange: ({property, from, to}) => {
            console.log(`Changed property`, property.getName(), {from, to, property});

            //add a layer
        }*/
    });

    /*editor.Styles.addBuiltIn("backg-layer", {
        type: "stack",
        property: "background-l",
        label: "Background Layer",
        //id: "background-layer",
        layerSeparator: " ",
        full: true,
        fromStyle(style, {property, name}) {
            //console.log('values for from style',property,style,name);
            return {
                "background-value": "repeat",
                value: "image",
            };
            const filter = style[name] || '';
            const sep = property.getLayerSeparator();
            return filter ? filter.split(sep).map(input => {
              const { name, value } = property.__parseFn(input);
              return { name, value };
            }) : [];
        },
        toStyle(values, {name}) {
            console.log("values for tostyle function", values, name);
            //return { background : 'blue'}
            return {
                "background-repeat": "repeat",
                "background-position": "left top",
                "background-attachment": "scroll",
                "background-size": "auto",
            };
            //return { [name]: `${values.name}(${values.value})` };
        },
        properties: [
            {
                full: true,
                name: "Type",
                type: "select",
                property: "value",
                default: "image",
                onChange: ({property, from, to}) => {
                    const option = property.getOption();
                    const props = {...(option.propValue || {})};
                    console.log("change value", option);
                    //console.table(props);
                    if (backgroundTypes.includes(props.name)) {
                        console.log("This is the new prop value", props.name);
                    }
                },
                options: backgroundTypes.map((value) => {
                    return {
                        id: value,
                        propValue: {name: value},
                    };
                }),
            },
            {
                type: "composite",
                properties: backgroundImageParams,
                extend: "background",
                //default:"",
                //property:'bg-value'
            },
        ],
        onChange: ({property, from, to}) => {
            console.log(`Changed property`, property.getName(), {from, to, property});

            //add a layer
        },
        //extend:'background'
    });*/
};
