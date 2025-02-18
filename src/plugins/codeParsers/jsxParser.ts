import type { Component } from "grapesjs";

/*interface Props {
    className: string;
    children: JSXObject[] | string;
}

export type JSXObject = {
    $$typeof:symbol;
    type: string;
    key?: unknown;
    ref?: any;
    props: Props;
    _owner?: any;
    tagName?: string;
    //_store: Store;
}*/
interface JSXObject {
    type: string;
    props: {
        className?: string;
        children?: JSXObject | JSXObject[] | string;
    };
}


// Simplified and typed version of createComponent
function createComponent(editor: VisualEditor.BlinkEditor, jsxObject: JSXObject): Component {
    // Assuming Component type is compatible or you have a way to map JSXObject to Component
    const componentType = filterComponentTypes(editor, jsxObject.type) ?? 'defaultType';
    const attributes: Record<string, string> = jsxObject.props.className ? { class: jsxObject.props.className } : {};

    let components: Component[] = [];

    if (typeof jsxObject.props.children === 'string') {
        //@ts-expect-error
        return editor.DomComponents.addComponent({
            type: 'textnode', // Adjust based on your type system
            content: jsxObject.props.children,
            attributes,
        });
    } else if (Array.isArray(jsxObject.props.children)) {
        components = jsxObject.props.children.map(child => createComponent(editor, child));
    } else if (jsxObject.props.children) {
        components.push(createComponent(editor, jsxObject.props.children as JSXObject));
    }

    // Add the component with the resolved type, attributes, and children to the editor
    //@ts-expect-error
    return editor.DomComponents.addComponent({
        type: componentType,
        attributes,
        components,
    });
}

// Helper function to match JSX types to GrapesJS component types
function filterComponentTypes(editor: VisualEditor.BlinkEditor, type: string): string | undefined {
    // Implement logic based on your system to map JSX types to your GrapesJS component types
    return editor.DomComponents.getType(type) ? type : undefined;
}
// Transform JSX to GrapesJS components
export function transformJSXToComponents2(editor: VisualEditor.BlinkEditor, jsx: JSXObject | JSXObject[]): Component[] {
    if (Array.isArray(jsx)) {
        return jsx.map(item => createComponent(editor, item));
    } else {
        return [createComponent(editor, jsx)];
    }
}

export function transformJSXToComponents(editor: VisualEditor.BlinkEditor, jsxObject: JSXObject | JSXObject[]): Component | Component[] {
    if (Array.isArray(jsxObject)) {
        // Handle arrays of JSXObjects (e.g., from a map function)
        return jsxObject.flatMap(item => transformJSXToComponents(editor, item));
    } else {
        const { type, props } = jsxObject;
        const componentType = filterComponentTypes(editor, type) ?? 'defaultType';
        const attributes = props.className ? { class: props.className } : {};
        let components: Component[] = [];

        if (typeof props.children === 'string') {
            // Handle text nodes
            components.push({
                type: 'textnode',
                content: props.children,
            });
        } else if (Array.isArray(props.children)) {
            // Recursively transform arrays of children
            components = props.children.flatMap(child => 
                Array.isArray(child) ? transformJSXToComponents(editor, child) : transformJSXToComponents(editor, child as JSXObject)
            );
        } else if (props.children) {
            // Handle single JSXObject child
            components.push(transformJSXToComponents(editor, props.children as JSXObject) as Component);
        }

        // Return the constructed component
        return {
            type: componentType,
            attributes,
            components: components.length ? components : undefined,
        };
    }
}