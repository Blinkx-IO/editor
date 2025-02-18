const decorationStyle = {
    name: "Decorations",
    open: false,
    buildProps: [
        "opacity",
        "border-radius",
        "border",
        "box-shadow",
        "background-bg",
        "border",
        "border-color",
        "border-style",
        "svg-fill",
    ],
    properties: [
        {
            type: "slider",
            property: "opacity",
            defaults: 1,
            step: 0.01,
            max: 1,
            min: 0,
        },
        {
            property: "border-radius",
            properties: [
                {
                    name: "Top",
                    property: "border-top-left-radius",
                },
                {
                    name: "Right",
                    property: "border-top-right-radius",
                },
                {
                    name: "Bottom",
                    property: "border-bottom-left-radius",
                },
                {
                    name: "Left",
                    property: "border-bottom-right-radius",
                },
            ],
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
            id: "background-bg",
            property: "background",
            type: "bg",
        },
        {
            id: "svg-fill",
            property: "fill",
            name: "Fill",
        },
    ],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const flexStyle = {
    name: "Flex",
    open: false,
    properties: [
        /*{
        name: 'Flex Container',
        property: 'display',
        type: 'select',
        defaults: 'block',
        list: [{
                value: 'block',
                name: 'Disable'
            },
            {
                value: 'flex',
                name: 'Enable'
            }
        ],
    },*/
        /*{
        name: 'Flex Parent',
        property: 'label-parent-flex',
        type: 'integer',
    },*/
        {
            name: "Direction",
            property: "flex-direction",
            type: "radio",
            defaults: "row",
            list: [
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
            defaults: "flex-start",
            list: [
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
            defaults: "center",
            list: [
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
        {
            name: "Flex Children",
            property: "label-parent-flex",
            type: "integer",
        },
        {
            name: "Order",
            property: "order",
            type: "integer",
            defaults: 0,
            min: 0,
        },
        {
            name: "Flex",
            property: "flex",
            type: "composite",
            properties: [
                {
                    name: "Grow",
                    property: "flex-grow",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                },
                {
                    name: "Shrink",
                    property: "flex-shrink",
                    type: "integer",
                    defaults: 0,
                    min: 0,
                },
                {
                    name: "Basis",
                    property: "flex-basis",
                    type: "integer",
                    units: ["px", "%", ""],
                    unit: "",
                    defaults: "auto",
                },
            ],
        },
    ],
};


const opacityStyle = {
    name: "Opacity",
    open: true,
    properties: [
        {
            type: "slider",
            property: "opacity",
            defaults: 1,
            step: 0.01,
            max: 1,
            min: 0,
        },
    ],
};
