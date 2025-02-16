import {blockCategories} from "../interfaces";
//import type { BlinkEditor} from "../../editorTypes";
import {contentBlock} from "./model";

const mapBlock = new contentBlock(
    "map-block",
    /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
    </svg>
    <span>Map</span>`,
    {
        type: "map",
        style: {
            height: "350px",
        },
    },
);
const videoBlock = new contentBlock(
    "video-block",
    /*html*/ `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z"/>
</svg>
 <span>Video</span>`,
    {
        type: "video",
        style: {
            height: "250px",
        },
    },
);
const tableBlock = new contentBlock("table-block", '<i class="fas fa-table"></i>', {
    type: "table",
    style: {
        height: "auto",
    },
});

const text_basic = new contentBlock(
    "text",
    /*html*/`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4V7H10.5V19H13.5V7H19V4H5Z"/>
    </svg>
    <span>Text</span>
    `,
    {
        type:"text",
        style:{
            height:"auto"
        }
    }
)

/*const linkBlock = new contentBlock(
    "link",
    `link`,
    {
        type:"link"
    }
)*/

const ecom_block = new contentBlock(
    "ecommerce",
    /*html*/ `<i class="fas fa-lock locked-block"></i>
  <svg class='svg-essentials' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
  Ecommerce`,
    {
        type: "ecommerce",
        style: {
            height: "auto",
        },
    },
);

const boxBlock = new contentBlock(
    "Box",
    /*html*/ `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
    </svg>
    Box
    `,
    {
        type: "box",
    },
);
const columnsBlock = new contentBlock(
    "Columns",
    /*html*/ `
    <svg  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M4 18H9V5H4V18ZM10 18H15V5H10V18ZM16 18V5H21V18H16Z" />
    </svg>
    Columns
    `,
    {
        type: "columns",
    },
);

const gridBlock = new contentBlock(
    "grid",
    /*html*/ `
    <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 11H4V5H9V11ZM9 18H4V12H9V18ZM10 18H15V12H10V18ZM21 18H16V12H21V18ZM10 11H15V5H10V11ZM16 11V5H21V11H16Z" />
    </svg>
     Grid
     `,
    {
        type: "grid",
    },
);

const sectionBlock = new contentBlock(
    "section",
    /*html*/ `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3 11V5H22V11H3ZM3 19H9V12H3V19ZM10 19H22V12H10V19Z" />
  </svg>    
  <span>Section</span>
  `,
    {
        type: "section",
    },
);

const imageBlock = new contentBlock(
    "image",
    /*html*/ `
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 4H14L12 2H6C4.9 2 4.01 2.9 4.01 4L4 16C4 17.1 4.9 18 6 18H22C23.1 18 24 17.1 24 16V6C24 4.9 23.1 4 22 4ZM2 6H0V11H0.01L0 20C0 21.1 0.9 22 2 22H20V20H2V6ZM11.5 9L7 15H21L17.5 10.5L15 13.51L11.5 9Z" />
    </svg>
    <span>Image</span>`,
    {
        type: "image",
        style:{

        }
    },
);

const buttonBlock = new contentBlock(
    "button",
    /*html */`
    <svg viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5V11.24C7.79 10.43 7 9.06 7 7.5C7 5.01 9.01 3 11.5 3C13.99 3 16 5.01 16 7.5C16 9.06 15.21 10.43 14 11.24V7.5C14 6.12 12.88 5 11.5 5C10.12 5 9 6.12 9 7.5ZM14.3 13.61L18.84 15.87C19.37 16.09 19.75 16.63 19.75 17.25C19.75 17.31 19.74 17.38 19.73 17.45L18.98 22.72C18.87 23.45 18.29 24 17.54 24H10.75C10.34 24 9.96 23.83 9.69 23.56L4.75 18.62L5.54 17.82C5.74 17.62 6.02 17.49 6.33 17.49C6.39 17.49 6.44111 17.4989 6.49222 17.5078C6.51778 17.5122 6.54333 17.5167 6.57 17.52L10 18.24V7.5C10 6.67 10.67 6 11.5 6C12.33 6 13 6.67 13 7.5V13.5H13.76C13.95 13.5 14.13 13.54 14.3 13.61Z" />
    </svg>
    <span>Button</span>
    `,
    {
        text: "Learn More",
        type:"button",
        style:{
            background:"#0094fa",
            padding:"10px",
            "font-size":"14px",
            color:"#fff",
            border:"2px solid #0094fa",
            "border-radius":"5px",
            "margin-left":"auto",
            "margin-right":"auto"
        }
    }
)

const linkBlock = {
    name: 'link',
    label: ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
    <path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clip-rule="evenodd" />
  </svg>
  <span>Link</span>
  `,
    content: {
        type: 'link'
    }
};
const blocks = [
    boxBlock,
    columnsBlock,
    gridBlock,
    sectionBlock,
    text_basic,
    imageBlock,
    mapBlock,
    videoBlock,
    buttonBlock,
    linkBlock
    //ecom_block,
];

export default function (editor: VisualEditor.BlinkEditor){
    blocks.forEach((block) => {
        editor.BlockManager.add(block.name, {
            label: block.label,
            content: block.content || '',
            category: blockCategories.basic,
        });
    });
}
