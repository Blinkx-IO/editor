import type { ComponentDefinition } from "grapesjs";

// Define the content interface that matches GrapesJS expectations
export interface BlockContent extends ComponentDefinition {
    type: string;
    style?: Record<string, string>;
    text?: string;
    [key: string]: any; // Index signature for additional properties
}

// Main interface for content blocks
export interface ContentBlock {
    name: string;
    label: string;
    content: BlockContent;
}

// Class implementation
export class contentBlock implements ContentBlock {
    name: string;
    label: string;
    content: BlockContent;

    constructor(name: string, label: string, content: BlockContent) {
        this.name = name;
        this.label = label;
        this.content = content;
    }
}
