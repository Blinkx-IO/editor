//import type {SectorOptions as StyleSectors,Property, PropertyOptions} from "grapesjs";
//import {property} from "lit/decorators";

const positionRequirements = {position:['sticky','relative','absolute','fixed']};
const displayRequirements = {display:['grid','flex']};

const defaultIntegerUnits = ["px", "%", "em", "rem"];

const layoutStyle = /** General Styles **/ {
    name: "Layout",
    open: false,
    buildProps: ["display"],
    properties: [
        {
            property: "display",
            type: "select",
            //default: 'block',
            options: [
                {
                    value: "block",
                },
                {
                    value: "initial",
                },
                {
                    value: "inherit",
                },
                {
                    value: "grid",
                },
                {
                    value: "table",
                },
                {
                    value: "inline",
                },
                {
                    value: "inline-block",
                },
                {
                    value: "flex",
                },
                {
                    value: "none",
                },
            ],
        },
        {
            name: "Direction",
            property: "flex-direction",
            type: "radio",
            default: "row",
            options: [
                {
                    value: "row",
                    name: "Row",
                    className: "icons-flex icon-dir-row",
                    title: "Row",
                },
                {
                    value: "row-reverse",
                    name: "Row reverse",
                    className: "icons-flex icon-dir-row-rev",
                    title: "Row reverse",
                },
                {
                    value: "column",
                    name: "Column",
                    title: "Column",
                    className: "icons-flex icon-dir-col",
                },
                {
                    value: "column-reverse",
                    name: "Column reverse",
                    title: "Column reverse",
                    className: "icons-flex icon-dir-col-rev",
                },
            ],
        },
        {
            name: "Justify",
            property: "justify-content",
            type: "radio",
            default: "flex-start",
            requires:displayRequirements,
            options: [
                {
                    value: "flex-start",
                    className: "icons-flex icon-just-start",
                    title: "Start",
                },
                {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-just-end",
                },
                {
                    value: "space-between",
                    title: "Space between",
                    className: "icons-flex icon-just-sp-bet",
                },
                {
                    value: "space-around",
                    title: "Space around",
                    className: "icons-flex icon-just-sp-ar",
                },
                {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-just-sp-cent",
                },
            ],
        },
        {
            name: "Align",
            property: "align-items",
            type: "radio",
            default: "center",
            requires:displayRequirements,
            options: [
                {
                    value: "flex-start",
                    title: "Start",
                    className: "icons-flex icon-al-start",
                },
                {
                    value: "flex-end",
                    title: "End",
                    className: "icons-flex icon-al-end",
                },
                {
                    value: "stretch",
                    title: "Stretch",
                    className: "icons-flex icon-al-str",
                },
                {
                    value: "center",
                    title: "Center",
                    className: "icons-flex icon-al-center",
                },
            ],
        },
    ],
};

const spacingStyle = {
    name: "Spacing",
    open: false,
    buildProps: ["margin", "padding", "gap", "Grid Columns"],
    properties: [
        {
            property: "margin",
            properties: [
                {
                    name: "Top",
                    property: "margin-top",
                },
                {
                    name: "Right",
                    property: "margin-right",
                },
                {
                    name: "Bottom",
                    property: "margin-bottom",
                },
                {
                    name: "Left",
                    property: "margin-left",
                },
            ],
        },
        {
            property: "padding",
            properties: [
                {
                    name: "Top",
                    property: "padding-top",
                },
                {
                    name: "Right",
                    property: "padding-right",
                },
                {
                    name: "Bottom",
                    property: "padding-bottom",
                },
                {
                    name: "Left",
                    property: "padding-left",
                },
            ],
        },
        //TODO dynamically only show on grid & flex
        {
            property: "gap",
            type: "integer",
            units: defaultIntegerUnits,
            requires:displayRequirements,
        },
        {
            property: "grid-template-columns",
            name: "Grid Columns",
            id: "Grid Columns",
            requires:displayRequirements,
            type: "select",
            options: [
                {value: "repeat(1,minmax(0,1fr))", name: "1"},
                {value: "repeat(2,minmax(0,1fr))", name: "2"},
                {value: "repeat(3,minmax(0,1fr))", name: "3"},
                {value: "repeat(4,minmax(0,1fr))", name: "4"},
                {value: "repeat(5,minmax(0,1fr))", name: "5"},
                {value: "repeat(6,minmax(0,1fr))", name: "6"},
                {value: "repeat(7,minmax(0,1fr))", name: "7"},
                {value: "repeat(8,minmax(0,1fr))", name: "8"},
                {value: "repeat(9,minmax(0,1fr))", name: "9"},
                {value: "repeat(10,minmax(0,1fr))", name: "10"},
                {value: "repeat(11,minmax(0,1fr))", name: "11"},
                {value: "repeat(12,minmax(0,1fr))", name: "12"},
            ],
        },
    ],
};

const sizeStyle = {
    name: "Size",
    open: false,
    buildProps: ["width", "height", "min-width", "max-width", "min-height", "max-height"],
};



const positionStyle = {
    name: "Position",
    open: false,
    buildProps: ["position", "top", "right", "left", "bottom"],
    properties: [
        {
            property: "position",
            label: "position",
            id: "position",
            type: "select",
            options: [
                {
                    value: "static",
                    name: "static",
                },
                {
                    value: "sticky",
                    name: "sticky",
                },
                {
                    value: "relative",
                    name: "relative",
                },
                {
                    value: "absolute",
                    name: "absolute",
                },
                {
                    value: "fixed",
                    name: "fixed",
                },
            ],
        },
        {
        property:"top",
        requires:positionRequirements
        },
        {
        property:"right",
        requires:positionRequirements
        },
        {
            property:"left",
            requires:positionRequirements
        },
        {
            property:"bottom",
            requires:positionRequirements
        },
        {
            property: "z-index",
        },
    ],
};

const typeStyle = {
    name: "Typography",
    open: false,
    buildProps: [
        "font-family",
        "font-size",
        "font-weight",
        "letter-spacing",
        "color",
        "line-height",
        "text-transform",
        "text-align",
        "text-decoration",
        "text-shadow",
        "text-overflow"
    ],
    properties: [
        {
            name: "Font",
            property: "font-family",
            type:'select',
            default:'',
            //onChange:(e)=>{console.log('change', e)},            
            options: [
                {
                    name:'Arial',
                    value:'Arial, Helvetica, sans-serif'
                },
                {
                    name:'Arial Black',
                    value:'Arial Black, Gadget, sans-serif'
                },
                {
                    name:'Brush Script MT',
                    value:'Brush Script MT, sans-serif'
                },
                {
                    name:'Comic Sans MS',
                    value:'Comic Sans MS, cursive, sans-serif'
                },
                {
                    name:"Courier New",
                    value:"Courier New, Courier, monospace"
                },
                {
                    name:"Georgia",
                    value:"Georgia, serif"
                },
                {
                    name:"Helvetica",
                    value:"Helvetica, sans-serif"
                },
                {
                    name:"Impact",
                    value:"Impact, Charcoal, sans-serif"
                },
                {
                    name:"Lato",
                    value:"'Lato', sans-serif"
                },
                {
                    name:"Lucida Sans Unicode",
                    value:"Lucida Sans Unicode, Lucida Grande, sans-serif"
                },
                {
                    name:"Old Standard TT",
                    value:"'Old Standard TT', serif"
                },
                {
                    name:"Open Sans",
                    value:"'Open Sans', sans-serif"
                },
                {
                    name:"Oxygen",
                    value:"'Oxygen', sans-serif"
                },
                {
                    name:"Merriweather",
                    value:"Merriweather, serif"
                },
                {
                    name:"Montserrat",
                    value:"Montserrat, sans-serif"
                },
                {
                    name:"Poppins",
                    value:"'Poppins', sans-serif"
                },
                {
                    name:"PT Sans",
                    value:"'PT Sans', sans-serif"
                },
                {
                    name:"Raleway",
                    value:"'Raleway', sans-serif"
                },
                {
                    name:"Roboto",
                    value:"'Roboto', sans-serif"
                },
                {
                    name:"Spectral",
                    value:"'Spectral', serif"
                },
                {
                    name:"Tahoma",
                    value:"Tahoma, Geneva, sans-serif"
                },
                {
                    name:"Times New Roman",
                    value:"Times New Roman, Times, serif"
                },
                {
                    name:"Trebuchet MS",
                    value:"Trebuchet MS, Helvetica, sans-serif"
                },
                {
                    name:"Verdana",
                    value:"Verdana, Geneva, sans-serif"
                },
                {
                    name:"Work Sans",
                    value:"'Work Sans', sans-serif"
                }

            ]
        },
        {
            name: "Weight",
            property: "font-weight",
        },
        {
            name: "Font color",
            property: "color",
        },
        {
            name: "Text Transform",
            property: "text-transform",
            type: "select",
            default: "none",
            options: [
                {
                    value: "none",
                    name: "none",
                },
                {
                    value: "capitalize",
                    name: "capitalize",
                },
                {
                    value: "uppercase",
                    name: "uppercase",
                },
                {
                    value: "lowercase",
                    name: "lowercase",
                },
            ],
        },
        {
            property: "text-align",
            type: "radio",
            default: "left",
            options: [
                {
                    value: "left",
                    name: "Left",
                    className: "fa fa-align-left",
                },
                {
                    value: "center",
                    name: "Center",
                    className: "fa fa-align-center",
                },
                {
                    value: "right",
                    name: "Right",
                    className: "fa fa-align-right",
                },
                {
                    value: "justify",
                    name: "Justify",
                    className: "fa fa-align-justify",
                },
            ],
        },
        {
            property: "text-decoration",
            type: "radio",
            default: "none",
            options: [
                {
                    value: "none",
                    name: "None",
                    className: "fa fa-times",
                },
                {
                    value: "underline",
                    name: "underline",
                    className: "fa fa-underline",
                },
                {
                    value: "line-through",
                    name: "Line-through",
                    className: "fa fa-strikethrough",
                },
            ],
        },
        {
            property: "text-shadow",
            properties: [
                {
                    name: "X position",
                    property: "text-shadow-h",
                },
                {
                    name: "Y position",
                    property: "text-shadow-v",
                },
                {
                    name: "Blur",
                    property: "text-shadow-blur",
                },
                {
                    name: "Color",
                    property: "text-shadow-color",
                },
            ],
        },
        {   property:"text-overflow",
            type:'select',
            options:[
                {value:"initial",
                name:"initial"},
                {value:"ellipsis",
                name:"ellipsis"},
                {value:"clip",
                name:"clip"},
               
                {value:"revert",
                name:"revert"},
                {value:"unset",
                name:"unset"}
            ],
            full:true          
        }
    ],
};

const customStyle = {
    name: "Custom Style",
    open: false,
    buildProps: ["transition", "perspective", "transform"],
    properties: [
        {
            property: "z-index",
        },
        {
            property: "transition",
            properties: [
                {
                    name: "Property",
                    property: "transition-property",
                },
                {
                    name: "Duration",
                    property: "transition-duration",
                },
                {
                    name: "Easing",
                    property: "transition-timing-function",
                },
            ],
        },
        {
            property: "transform",
            properties: [
                {
                    name: "Rotate X",
                    property: "transform-rotate-x",
                },
                {
                    name: "Rotate Y",
                    property: "transform-rotate-y",
                },
                {
                    name: "Rotate Z",
                    property: "transform-rotate-z",
                },
                {
                    name: "Scale X",
                    property: "transform-scale-x",
                },
                {
                    name: "Scale Y",
                    property: "transform-scale-y",
                },
                {
                    name: "Scale Z",
                    property: "transform-scale-z",
                },
            ],
        },
    ],
};

const backgroundStyle = {
    name: "Backgrounds",
    open: false,
    buildProps: ["background-color", "background"/*"background-layer-type"*/],
    properties: [
        /*{
            type: "composite",
            full: true,
            property: "background-image",
            separator:',',
            toStyle(values, { name }) {
                
                console.log(values,name)

                if(values['background-image'])return { 'background-image': `url(${values['background-image']})` };
            },
            fromStyle(style, { property, name } ) {
                console.log(style)
                //if(values['background-image'])return { 'background-image': `url(${values['background-image']})` };
            },
            properties: [
                {
                    property: "background-image",
                    type:"file",
                    extend:"background-image"
                },
                {
                    name: "Linear Gradient",
                    property: "background-image-color",
                    label: "Linear Gradient",
                    type: "color-linear",
                    defaults: "none",
                    full: true,
                    extend: "background-image",
                    /*onChange({property,from,to}){
                console.log(property.getStyle(), property.getParent());
                
            },
            fromStyle(style, {property, name}){
                //console.log(style)
            },
            toStyle(values, {name}) {
                //console.log(values,name)
            }
                },
            ],
        },*/
        
        //typeBgAttach,
        //typeBgPos,
        //typeBgRepeat,
        //typeBgSize,
    ],
};

/*
function changeProps(props: any): void {
    console.log(...props);
}*/

const borderStyle = {
    name: "Borders",
    open: false,
    buildProps: [
        //"Border Width",
        //"border-top-width",
        //"border-bottom-width",
        //"border-right-width",
        //"border-left-width",

        "border-width",
        // "Border Width",
        "border-color",
        "border-style",
        "border-radius",
        //"Borders",
        //!TODO Create Properties
        "outline"
    ],
    properties: [
        /*{
            name: "Border Width",
            id: "Border Width",
            type: "integer",
            property: "border-width",
            units: defaultIntegerUnits,
        },*/
        /*{ //image choose your image
            name:'Background 1',
            property:'background-image'
        },*/
        /*{
            property:"border-width",
            name:"Border Width",
            id:"Border Width",
            type:"default"
        },*/
        {
            property: "border-radius",
            properties: [
                {
                    name: "Top-Left",
                    property: "border-top-left-radius",
                    default:'0'
                },
                {
                    name: "Top-Right",
                    property: "border-top-right-radius",
                    default:'0'
                },
                {
                    name: "Bottom-Left",
                    property: "border-bottom-left-radius",
                    default:'0'
                },
                {
                    name: "Bottom-Right",
                    property: "border-bottom-right-radius",
                    default:'0'
                },
            ],
        },
        {
            //name: "Borders",
            //id: "Borders",
            property: "border-width",
            type: "composite",
            properties: [
                {
                    name: "Top",
                    type: "integer",
                    property: "border-top-width",
                    units: defaultIntegerUnits,
                    default:'0'
                },
                {
                    name: "Right",
                    type: "integer",
                    property: "border-right-width",
                    units: defaultIntegerUnits,
                    default:'0'
                },

                {
                    name: "Bottom",
                    type: "integer",
                    property: "border-bottom-width",
                    units: defaultIntegerUnits,
                    default:'0'
                },
                {
                    name: "Left",
                    type: "integer",
                    property: "border-left-width",
                    units: defaultIntegerUnits,
                    default:'0'
                },
            ],
        },
        {
            property:'border-style',
            default:'none'
        }
    ],
};

const effectsStyle = {
    name: "Effects",
    open: false,
    buildProps: [
        "opacity",
        "box-shadow",
        "cursor",
        "overflow",
        "object-fit",
        "object-position",
        "transition",
        "perspective",
        "transform",
    ],
    properties: [
        {
            type: "slider",
            property: "opacity",
            default: 1,
            step: 0.01,
            max: 1,
            min: 0,
        },
        {
            property: "box-shadow",
            properties: [
                {
                    name: "X position",
                    property: "box-shadow-h",
                },
                {
                    name: "Y position",
                    property: "box-shadow-v",
                },
                {
                    name: "Blur",
                    property: "box-shadow-blur",
                },
                {
                    name: "Spread",
                    property: "box-shadow-spread",
                },
                {
                    name: "Color",
                    property: "box-shadow-color",
                },
                {
                    name: "Shadow type",
                    property: "box-shadow-type",
                },
            ],
        },
        {
            property: "transition",
            properties: [
                {
                    name: "Property",
                    property: "transition-property",
                },
                {
                    name: "Duration",
                    property: "transition-duration",
                },
                {
                    name: "Easing",
                    property: "transition-timing-function",
                },
            ],
        },
        {
            property: "transform",
            properties: [
                {
                    name: "Rotate X",
                    property: "transform-rotate-x",
                    default:'rotateX(0deg)'
                },
                {
                    name: "Rotate Y",
                    property: "transform-rotate-y",
                    default:'rotateY(0deg)'
                },
                {
                    name: "Rotate Z",
                    property: "transform-rotate-z",
                    default:'rotateZ(0deg)'
                },
                {
                    name: "Scale X",
                    property: "transform-scale-x",
                    default:'scaleX(1)'
                },
                {
                    name: "Scale Y",
                    property: "transform-scale-y",
                    default:'scaleY(1)'
                },
                {
                    name: "Scale Z",
                    property: "transform-scale-z",
                    default:'scaleZ(1)'
                }
            ],
        },
        {
            property: "cursor",
            type: "select",
        },
        {
            property: "overflow",
            type: "select",
        },
        {
            property: "object-fit",
            type: "select",
            options: [
                {value: "contain"},
                {value: "cover"},
                {value: "fill"},
                {value: "none"},
                {value: "scale-down"},
            ],
        },
        {
            property: "object-position",
            type: "select",
            options: [
                {value: "bottom"},
                {value: "center"},
                {value: "left"},
                {value: "left bottom"},
                {value: "left top"},
                {value: "right"},
                {value: "right bottom"},
                {value: "right top"},
                {value: "top"},
            ],
        },
    ],
};

const filterEffects = {
    name: "Filters",
    open: false,
    properties: [
        {extend: "filter"},
        //{extend:'filter', name:"backdrop-filter"}
    ],
};

export const defaultStyles = [
    layoutStyle,
    spacingStyle,
    sizeStyle,
    positionStyle,
    typeStyle,
    backgroundStyle,
    borderStyle,
    effectsStyle,
    filterEffects,
];
