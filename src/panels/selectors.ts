/* eslint-disable @typescript-eslint/ban-ts-comment */
//m.attributes.selectors.models[0].attributes.active = false

//import type { BlinkEditor } from "../editorTypes";


//TODO set some defaults to selectors here if required
export default function ToggleClassSelectors(editor: VisualEditor.BlinkEditor, options = {}, dev = false) {

    //@ts-ignore
    editor.Commands.add("toggle-classes", (editor: VisualEditor.BlinkEditor) => {
        const Rules = editor.Css.getRules()
        Rules.forEach((vals: any) => {
            const selectors = vals.attributes.selectors._byId
            for (const keys in selectors) {

                if (selectors[keys].attributes.type == 1) {
                    selectors[keys].attributes.active = false;
                }
            }

        });

    });
}
