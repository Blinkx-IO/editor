/* eslint-disable @typescript-eslint/ban-ts-comment */
import {blockCategories} from "../interfaces";
//import grapesjs from "grapesjs";
import {contentBlock} from "./model";



const google_analytics_block = new contentBlock(
    "googleAnalytics",
    /*html*/ `<svg height="512px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x31_08-analytics_x2C__google_analytics_x2C__google"><g><g><g><path d="M330.564,166.28H181.438c-8.232,0-14.912,6.699-14.912,14.956v299.06      c0,8.251,6.68,14.954,14.912,14.954h149.127c8.23,0,14.91-6.703,14.91-14.954v-299.06      C345.475,172.979,338.795,166.28,330.564,166.28L330.564,166.28z M330.564,166.28" style="fill:#FFC107;"/><path d="M181.438,315.813H32.313c-8.236,0-14.916,6.698-14.916,14.953v149.53      c0,8.251,6.68,14.954,14.916,14.954h149.125c8.234,0,14.914-6.703,14.914-14.954v-149.53      C196.352,322.511,189.672,315.813,181.438,315.813L181.438,315.813z M181.438,315.813" style="fill:#FFC107;"/><path d="M479.689,16.75H330.564c-8.236,0-14.916,6.698-14.916,14.958v448.588      c0,8.251,6.68,14.954,14.916,14.954h149.125c8.234,0,14.914-6.703,14.914-14.954V31.708      C494.604,23.448,487.924,16.75,479.689,16.75L479.689,16.75z M479.689,16.75" style="fill:#FFA000;"/></g></g></g></g><g id="Layer_1"/></svg>
    Google Analytics`,
    {
        type: "googleAnalytics",
    },
);

const google_tag_manager_block = new contentBlock(
    "googleTagManager",
    /*html*/ `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2469.7 2469.8" style="enable-background:new 0 0 2469.7 2469.8;" xml:space="preserve">
     <g>
         <path fill="#8AB4F8" d="M1449.8,2376L1021,1946.7l921.1-930.5l436.7,436.6L1449.8,2376z"/>
         <path fill="#4285F4" d="M1452.9,527.1L1016.3,90.4L90.5,1016.2c-120.6,120.5-120.7,315.8-0.2,436.4c0.1,0.1,0.2,0.2,0.2,0.2
             l925.8,925.8l428.3-430.3L745,1235.1L1452.9,527.1z"/>
         <path fill="#8AB4F8" d="M2378.7,1016.2L1452.9,90.4c-120.6-120.6-316.1-120.6-436.7,0c-120.6,120.6-120.6,316.1,0,436.6l926.3,925.8
             c120.6,120.6,316.1,120.6,436.6,0c120.6-120.6,120.6-316.1,0-436.6L2378.7,1016.2z"/>
         <circle fill="#246FDB" cx="1231.2" cy="2163.9" r="306"/>
     </g>
     </svg>
    Google Tag Manager`,
    {
        type: "googleTagManager",
    },
);

const blocks = [google_analytics_block,google_tag_manager_block];
 
//@ts-ignore
export default function(editor: VisualEditor.BlinkEditor, options: any) {
    blocks.forEach((block) => {
        editor.BlockManager.add(block.name, {
            label: block.label,
            content: block.content,
            category: blockCategories.apps,
        });
    });
}
