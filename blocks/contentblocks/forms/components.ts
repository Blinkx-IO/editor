/* eslint-disable @typescript-eslint/ban-ts-comment */
//import type {BlinkEditor} from "../../../editorTypes";
export const typeForm = "form";
export const typeInput = "input";
export const typeTextarea = "textarea";
export const typeSelect = "select";
export const typeCheckbox = "checkbox";
export const typeRadio = "radio";
export const typeButton = "button";
export const typeLabel = "label";
export const typeOption = "option";

export default function (editor: VisualEditor.BlinkEditor) {
    const domComponents = editor.DomComponents;

    const createOption = (value: string, name: string) => ({
        type: typeOption,
        components: name,
        attributes: {value},
    });

    const idTrait = {
        name: "id",
    };

    const relTrait = {
        name: "rel",
    };

    const forTrait = {
        name: "for",
    };

    const nameTrait = {
        name: "name",
    };

    const placeholderTrait = {
        name: "placeholder",
    };

    const valueTrait = {
        name: "value",
    };

    const requiredTrait = {
        type: "checkbox",
        name: "required",
    };

    const checkedTrait = {
        type: "checkbox",
        name: "checked",
    };

    domComponents.addType(typeForm, {
        isComponent: (el) => el.tagName == "FORM",

        model: {
            defaults: {
                tagName: "form",
                //droppable: ':not(form)',
                //draggable: ':not(form)',
                attributes: {method: "get"},
                icon:/*html*/`
                <svg height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM7 6V10H11V6H7ZM7 12V14H17V12H7ZM7 16V18H17V16H7ZM13 7V9H17V7H13Z" />
                </svg>
                `,
                traits: [
                    idTrait,
                    {
                        type: "select",
                        name: "method",
                        options: [
                            {value: "get", name: "GET"},
                            {value: "post", name: "POST"},
                            {value:"dialog",name:"DIALOG"},
                        ],
                    },
                    {
                        name: "action",
                    },
                    {
                        name:"data-netlify"
                    }
                ],
            },
        },

        view: {
            events: {
                submit: (e: {preventDefault: () => any}) => e.preventDefault(),
            },
        },
    });

    // INPUT
    domComponents.addType(typeInput, {
        isComponent: (el) => el.tagName == "INPUT",

        model: {
            defaults: {
                tagName: "input",
                //draggable: 'form, form *',
                //droppable: false,
                highlightable: false,
                attributes: {type: "text"},
                traits: [
                    nameTrait,
                    idTrait,
                    placeholderTrait,
                    {
                        type: "select",
                        name: "type",
                        options: [
                            {value: "text"},
                            {value: "email"},
                            {value: "password"},
                            {value: "number"},
                            {value:"tel"},
                            {value:"color"},
                            {value : "date"},
                            {value : "time"},
                            {value : "search"},
                            {value : "url"},
                            {value : "image"},
                            {value : "file"},
                            {value: "range"} //TODO add min and max as attributes

                        ],
                    },
                    requiredTrait,
                ],
            },
        },

        extendFnView: ["updateAttributes"],
        view: {
            updateAttributes(this: any) {
                this.el.setAttribute("autocomplete", "off");
            },
        },
    });

    // TEXTAREA
    domComponents.addType(typeTextarea, {
        extend: typeInput,
        isComponent: (el: {tagName: string}) => el.tagName == "TEXTAREA",

        model: {
            defaults: {
                tagName: "textarea",
                attributes: {},
                traits: [nameTrait, placeholderTrait, requiredTrait, idTrait],
            },
        },
    });

    // OPTION
    domComponents.addType(typeOption, {
        isComponent: (el: {tagName: string}) => el.tagName == "OPTION",

        model: {
            defaults: {
                tagName: "option",
                layerable: false,
                //droppable: false,
                //draggable: false,
                highlightable: false,
            },
        },
    });

    // SELECT
    domComponents.addType(typeSelect, {
        extend: typeInput,
        isComponent: (el: {tagName: string}) => el.tagName == "SELECT",

        model: {
            defaults: {
                tagName: "select",
                components: [createOption("opt1", "Option 1"), createOption("opt2", "Option 2")],
                traits: [
                    idTrait,
                    nameTrait,
                    {
                        name: "options",
                        type: "select-options",
                    },
                    requiredTrait,
                ],
            },
        },

        /*view: {
            events: {
                mousedown: (e: {preventDefault: () => any}) => e.preventDefault(),
            },
        },*/
    });

    // CHECKBOX
    domComponents.addType(typeCheckbox, {
        extend: typeInput,
        //@ts-ignore
        isComponent: (el) => el.tagName == "INPUT" && el.type == "checkbox",

        model: {
            defaults: {
                copyable: false,
                attributes: {type: "checkbox"},
                traits: [idTrait, 
                    {type: "select",
                    name: "type",
                    options: [
                        {value: "radio"},
                        {value: "checkbox"},
                    ]},
                    nameTrait, valueTrait, requiredTrait, checkedTrait],
            },
        },

        view: {
            events: {
                click: (e: {preventDefault: () => any}) => e.preventDefault(),
            },

            init(this: any) {
                this.listenTo(this.model, "change:attributes:checked", this.handleChecked);
            },

            handleChecked(this: any) {
                this.el.checked = !!this.model.get("attributes").checked;
            },
        },
    });

    // RADIO
    domComponents.addType(typeRadio, {
        extend: typeCheckbox,
        //@ts-ignore
        isComponent: (el: {tagName: string; type: string}) =>
            el.tagName == "INPUT" && el.type == "radio",

        model: {
            defaults: {
                attributes: {type: "radio"},
                traits: [
                    {type: "select",
                    name: "type",
                    options: [
                        {value: "radio"},
                        {value: "checkbox"},
                    ]},
                    idTrait, nameTrait, valueTrait, requiredTrait, checkedTrait],
            },
        },
    });

    domComponents.addType(typeButton, {
        extend: typeInput,
        isComponent: (el: {tagName: string}) => el.tagName == "BUTTON",

        model: {
            defaults: {
                tagName: "button",
                attributes: {type: "button"},
                text: "Send",
                traits: [
                    idTrait,
                    {
                        name: "text",
                        changeProp: true,
                    },
                    {
                        type: "select",
                        name: "type",
                        options: [{value: "button"}, {value: "submit"}, {value: "reset"}],
                    },
                ],
            },

            init(this: any) {
              //console.log(this);
                const comps = this.components();
                const tChild = comps.length === 1 && comps.models[0];
                const chCnt = (tChild && tChild.is("textnode") && tChild.get("content")) || "";
                const text = chCnt || this.get("text");
                this.set({text});
                this.on("change:text", this.__onTextChange);
                text !== chCnt && this.__onTextChange();
            },

            __onTextChange(this: any) {
                this.components(this.get("text"));
            },
        },

        view: {
            events: {
                click: (e: {preventDefault: () => any}) => e.preventDefault(),
            },
        },
    });

    // LABEL
    domComponents.addType(typeLabel, {
        extend: "text",
        isComponent: (el: {tagName: string}) => el.tagName == "LABEL",

        model: {
            defaults: {
                tagName: "label",
                components: "Label",
                traits: [forTrait],
            },
        },
    });
}
