import type { cssStyles } from "../interfaces";

export interface contentB {
    name: string;
    label: string;
    content: {
        /**
         * Block Type
         */
        type: string;
        style: cssStyles;
    };
    resizeable?: boolean;
}

//TODO redo this as an interface
export class contentBlock {
    name: string;
    label: string;

    content:
        | {
              text?:string;
              type: string; //Block Type
              style?: Record<string,string>
          }
        | undefined;

    constructor(
        name: string,
        label: string,
        content:
            | {
                  text?:string;
                  type: string; //Block Type
                  //Block Type
                  style?: Record<string,string>;
              }
            | undefined,
    ) {
        this.name = name;
        this.label = label;
        this.content = content;
    }
}