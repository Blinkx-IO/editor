import {blockCategories} from "../interfaces";
import {contentBlock} from "./model";
//import type { BlinkEditor } from "../../editorTypes";

const modal_block = new contentBlock(
    "modal",
    /*html*/ `<svg xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 0 16 16">
    <path  d="M0 1v14h16V1H0zm15 13H1V4h14v10zm0-11h-1V2h1v1z"/>
    </svg>
     Modal`,
    {
        type: "modal",
    },
);

const blocks = [modal_block];

export default function (editor:VisualEditor.BlinkEditor){
    blocks.forEach((block) => {
        editor.BlockManager.add(block.name, {
            label: block.label,
            content: block.content ?? '',
            category: blockCategories.advanced,
        });
    });
}
