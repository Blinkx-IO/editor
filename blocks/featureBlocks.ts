//import type {BlinkEditor} from "../editorTypes";
const heroComponent = [
    {
        type: "box",
        style: {
            "min-height": "700px",
            "background-image":
                "url(https://cdn.blinkcms.com/templates/assets/gradientBackground.jfif)",
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "left-top",
        },
        attributes: {
            id: "i3hh",
        },
        components: [
            {
                type: "typed",
                attributes: {
                    id: "i8g7",
                },
                style: {
                    "padding-top": "175px",
                    "font-size": "40px",
                    color: "white",
                    "font-family": "Helvetica, sans-serif",
                    "text-align": "center",
                },
                strings: ["Say something great  here..."],
                "type-speed": "75",
                "start-delay": "10",
                "back-delay": "704",
                loop: true,
                "loop-count": "1",
                scriptUpdated: 1,
            },
            {
                type: "text",
                attributes: {
                    id: "iz8j",
                },
                style: {
                    color: "white",
                    "font-family": "Helvetica, sans-serif",
                    "text-align": "center",
                },
                components: [
                    {
                        type: "textnode",
                        removable: false,
                        draggable: false,
                        highlightable: 0,
                        copyable: false,
                        content:
                            "It is a long established fact that a reader will not be distracted by the readable content ",
                        _innertext: false,
                    },
                    {
                        type: "text",
                        removable: false,
                        draggable: false,
                        highlightable: 0,
                        copyable: false,
                        editable: false,
                        selectable: false,
                        hoverable: false,
                        components: [
                            {
                                type: "textnode",
                                removable: false,
                                draggable: false,
                                highlightable: 0,
                                copyable: false,
                                content: "of a page when looking at its layout.",
                                _innertext: false,
                            },
                        ],
                        _innertext: true,
                    },
                ],
            },
            {
                type: "custom-code",
                droppable: 1,
                attributes: {
                    id: "isxs",
                },
                style: {
                    "text-align": "center",
                    "padding-top": "20px",
                },
                components: [
                    {
                        type: "button",
                        attributes: {
                            type: "button",
                            id: "izta",
                        },
                        style: {
                            "margin-left": "auto",
                            "margin-right": "auto",
                            "padding-left": "25px",
                            "padding-right": "25px",
                            "padding-top": "15px",
                            "padding-bottom": "15px",
                            color: "black",
                            "font-family": "Helvetica, sans-serif",
                            "text-align": "center",
                            "font-size": "14px",
                            "background-color": "rgb(239, 239, 239)",
                        },
                        text: "Get Started!",
                        components: [
                            {
                                type: "textnode",
                                content: "Get Started!",
                            },
                        ],
                    },
                ],
                "custom-code-plugin__code": "<button></button>",
                "custom-name": "Box",
            },
        ],
    },
];

const footerComponent = [
    {
        tagName: "footer",
        classes: ["footer-under"],
        attributes: {
            id: "footer",
        },
        //mediaText:`(max-width: 768px)`,
        style: {
            "background-color": "#363436",
            position: "relative",
            "min-height": "500px",
            "padding-top": "100px",
            "padding-bottom": "100px",
            color: "#eee",
        },
        components: [
            {
                classes: ["container-width"],
                style: {
                    display: "block",
                    width: "90%",
                    "max-width": "1150px",
                    "margin-right": "auto",
                    "margin-left": "auto",
                },
                components: [
                    {
                        style: {
                            display: "flex",
                            "justify-content": "space-around",
                            "align-items": "center",
                        },
                        classes: ["footer-container"],
                        components: [
                            {
                                style: {
                                    display: "block",
                                },
                                classes: ["foot-lists"],
                                attributes: {
                                    id: "i6pq2d",
                                },
                                components: [
                                    {
                                        classes: ["foot-list"],
                                        style: {
                                            width: "200px",
                                            display: "inline-block",
                                        },
                                        components: [
                                            {
                                                type: "text",
                                                classes: ["foot-list-title"],
                                                style: {
                                                    "margin-bottom": "10px",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "8px",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "About us",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                classes: ["foot-list-item"],
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Contact",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Events",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Company",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Jobs",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Blog",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        classes: ["foot-list"],
                                        style: {
                                            width: "200px",
                                            display: "inline-block",
                                        },
                                        components: [
                                            {
                                                type: "text",
                                                classes: ["foot-list-title"],
                                                style: {
                                                    "margin-bottom": "10px",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "8px",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Services",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Education",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Partner",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Community",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Forum",
                                                    },
                                                ],
                                            },
                                            /*{
                        "type": "text",
                        "classes": ["foot-list-item"],
                        "style" : {
                            'font-size':'0.8em',
                            'padding-top':'0.5px',
                            'padding-bottom':'6.4px',
                            'font-family': 'Helvetica, sans-serif',
                        },
                        "components": [{
                            "type": "textnode",
                            "content": "Download"
                        }]
                    },*/
                                            {
                                                type: "text",
                                                classes: ["foot-list-item"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "6.4px",
                                                    "font-family": "Helvetica, sans-serif",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Upgrade",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        classes: ["clearfix"],
                                    },
                                ],
                            },
                            {
                                classes: ["form-sub"],
                                components: [
                                    {
                                        classes: ["foot-form-cont"],
                                        style: {
                                            width: "300px",
                                        },
                                        components: [
                                            {
                                                type: "text",
                                                classes: ["foot-form-title"],
                                                style: {
                                                    "margin-bottom": "10px",
                                                    "padding-top": "0.5px",
                                                    "padding-bottom": "16px",
                                                    "font-size": "2em",
                                                    color: "white",
                                                    "text-align": "center",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Subscribe",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "text",
                                                classes: ["foot-form-desc"],
                                                style: {
                                                    "font-size": "0.8em",
                                                    color: "white",
                                                    "line-height": "20px",
                                                    "text-align": "center",
                                                    "margin-bottom": "15px",
                                                },
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content:
                                                            "Subscribe to our newsletter to receive exclusive offers and the latest news",
                                                    },
                                                ],
                                            },
                                            {
                                                type: "input",
                                                style: {
                                                    width: "100%",
                                                    "margin-bottom": "15px",
                                                    "padding-top": "7px",
                                                    "padding-bottom": "7px",
                                                    "padding-right": "10px",
                                                    "padding-left": "10px",
                                                    "font-size": "13.3333px",
                                                    color: "white",
                                                },
                                                void: true,
                                                classes: ["sub-input"],
                                                attributes: {
                                                    type: "text",
                                                    name: "name",
                                                    placeholder: "Name",
                                                },
                                            },
                                            {
                                                type: "input",
                                                void: true,
                                                style: {
                                                    width: "100%",
                                                    "margin-bottom": "15px",
                                                    "padding-top": "7px",
                                                    "padding-bottom": "7px",
                                                    "padding-right": "10px",
                                                    "padding-left": "10px",
                                                    "font-size": "13.3333px",
                                                    color: "white",
                                                },
                                                classes: ["sub-input"],
                                                attributes: {
                                                    type: "text",
                                                    name: "email",
                                                    placeholder: "Email",
                                                },
                                            },
                                            {
                                                type: "button",
                                                style: {
                                                    background: "#000000",
                                                    width: "100%",
                                                    "margin-bottom": "15px",
                                                    "padding-top": "7px",
                                                    "padding-bottom": "7px",
                                                    "padding-right": "10px",
                                                    "padding-left": "10px",
                                                    color: "white",
                                                },
                                                classes: ["sub-btn"],
                                                attributes: {
                                                    type: "button",
                                                },
                                                text: "Submit",
                                                components: [
                                                    {
                                                        type: "textnode",
                                                        content: "Submit",
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                classes: ["copyright"],
                style: {
                    position: "absolute",
                    top: "452px",
                    width: "100%",
                    "background-color": "rgba(0, 0, 0, 0.15)",
                    "font-size": "0.75em",
                    //"padding-bottom":"12px",
                    color: "rgba(238, 238, 238, 0.5)",
                    bottom: "0",
                },
                components: [
                    {
                        classes: ["container-width"],
                        style: {
                            width: "90%",
                            "max-width": "1150px",
                            "margin-left": "auto",
                            "margin-right": "auto",
                            display: "flex",
                        },
                        components: [
                            {
                                type: "text",
                                style: {
                                    //"width":"50%",
                                    "flex-grow": "1",
                                    "padding-top": "5px",
                                    "padding-bottom": "5px",
                                },
                                classes: ["made-with"],
                                components: [
                                    {
                                        type: "textnode",
                                        removable: false,
                                        draggable: false,
                                        highlightable: 0,
                                        copyable: false,
                                        content: "\n              made with Blink",
                                        _innertext: false,
                                    },
                                ],
                            } /*{
                "type": "text",
                "classes": ["foot-social-btns"],
                "style":{
                    "flex-grow":"1"
                },
                "components": {
                    type:"social-blocks"
                    "type": "textnode",
                    "content": "facebook twitter linkedin mail"
                }
            }, {
                "classes": ["clearfix"]
            }*/,
                        ],
                    },
                ],
            },
        ],
    },
];

const socialStyle = {
    width: "50px",
    height: "50px",
};

const socialComponent = [
    {
        //Instagram
        //type:'svg',
        components: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`,
        style: socialStyle,
    },
    {
        //Facebook
        components: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`,
        style: socialStyle,
    },
    {
        //Twitter
        components: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>`,
        style: socialStyle,
    },
    {
        //Linkedin
        components: `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
        style: socialStyle,
    },
];

export function addfeatureBlocks(editor: VisualEditor.BlinkEditor) {
    editor.Components.addType("footer", {
        model: {
            defaults: {
                label: "Footer",
                components: footerComponent,
            },
        },
    });

    editor.Components.addType("hero-image", {
        model: {
            defaults: {
                label: "Hero Image",
                components: heroComponent,
                imageAssets: ["https://cdn.blinkcms.com/templates/assets/gradientBackground.jfif"],
                featureBlock: true,
            },
        },
    });

    editor.Components.addType("social-blocks", {
        model: {
            defaults: {
                label: `Social Widget`,
                components: socialComponent,
                style: {
                    display: "flex",
                    "justify-content": "center",
                },
            },
        },
    });
}
