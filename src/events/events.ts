/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Papa from "papaparse";


//import {popUpTraits} from "./magnetpanels";
//import {updateDynamicBlocks} from "../blocks/dynamicBlocks";
//import {Component, Editor} from "grapesjs";
import { fetchImages } from "$plugins/pexel";
import { addImage } from "../plugins/imagePlugins/addAsset";
//import {collectionID} from "./templates";
import { html, render } from "lit";
//import "../model/custom/assetSearch";
import type { PexelImage } from "$plugins/pexel/types";
import { editorWidths, editorPanels, closeLeftPanel, wrapper, /*toggledLayer, state, pinnedWidths,*/ resizeCanvas, canvasGutterClasses, toggleRightPanel } from "../panels/state";
import { modalSmall } from "../panels/modalTemplates";
import { getStatus, updateStatus } from "../panels/status";
import { getPageUrl, getSeoFields, setPageUrl, setSeoFields } from "../panels/pageSettings";
//import {notification} from "../view/notification";
//const editorContainer = document.querySelector("#editor-container") as HTMLElement;
//const editorBody = document.querySelector("#editorBody") as HTMLElement;
import NProgress from "nprogress";
import { browser } from "$app/environment";
//import {contentTitle} from '$visualeditor/editor';
//import type {BlinkEditor, editorStorageObject} from "../editorTypes";
//NProgress.configure({ parent: '#editor-wrapper' });
let data: Array<any>;
interface pexelGridRequest {
    container: HTMLElement;
    editor: VisualEditor.BlinkEditor;
    query?: string | undefined;
    projectId: string | number;
}
/*function unParseFiles(data: any) {
    console.log(Papa.unparse(data));
}*/

function FilterData(_csvData: { [x: string]: any[] }) {
    //const firstRow = csvData["data"][0];

    //console.log(csvData, firstRow);
}

function pexelGridHandler(ev: Event, editor: VisualEditor.BlinkEditor, projectId: string | number) {
    const asset = ev.target as HTMLElement;

    //asset.dataset.pexelImageMedium pexelImageMedium
    //asset.dataset.pexelImage

    (async () => {
        //const start = performance.now();
        //console.log('adding image')
        const overlay = document.getElementById('assetManager-overlay') as HTMLElement;
        overlay.style.display = '';
        const loaderSvg = html`
            <svg xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            style="margin: auto; top:50%; position:relative;  display: block; shape-rendering: auto;" 
            width="50px" 
            height="50px" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid">
                <g transform="translate(50 50)">
                    <g>
                        <animateTransform attributeName="transform" type="rotate" values="0;45" keyTimes="0;1" dur="0.2s" repeatCount="indefinite">

                        </animateTransform>
                        <path d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20" fill="#ffffff">

                        </path>
                    </g>
                </g>
            </svg>
        `;
        render(loaderSvg, overlay);
        const resp = await addImage(
            projectId,
            asset.dataset.pexelImageMedium!,
            asset.dataset.pexelId!,
        );

        //loady wheel
        editor.AssetManager.add(resp.src);
        //editor.getSelected().attributes.attributes.src
        editor.getSelected()!.setAttributes({ src: resp.src })
        const assetInput = document.querySelector(".blink-am-add-asset") as HTMLElement;
        const pexelGrid = document.getElementById('pexelAssetGridContainer') as HTMLElement;
        const assetGrid = document.querySelector(".blink-am-assets") as HTMLElement;
        const savedButton = document.querySelector("#savedAssetsGrid") as HTMLElement;
        const pexelButton = document.querySelector("#pexelAssetsGrid") as HTMLElement;
        const assetUploader = document.querySelector('.blink-am-file-uploader') as HTMLElement;
        const pexelAttributeDiv = document.getElementById('pexelAttribution') as HTMLElement;


        overlay.style.display = 'none';
        assetInput.classList.remove("hidden");
        savedButton.classList.add("border-secondary-accent-blue");
        savedButton.classList.remove("border-gray-500");
        pexelButton.classList.remove("border-secondary-accent-blue");
        pexelButton.classList.add("border-gray-500");
        pexelGrid.classList.add("hidden");
        assetGrid.classList.remove("hidden");
        assetUploader.classList.remove("hidden");
        pexelAttributeDiv.classList.add('hidden');

        editor.Modal.close();
        //const end = performance.now();
        //console.log('finished adding image',(end-start))
    })();
}

const updateComponentTrait = (
    editor: VisualEditor.BlinkEditor,
    comp: any,
    trait: string,
    newValue: string,
    message: string,
) => {
    comp.getTrait(trait).setTargetValue(newValue);
    editor.Modal.close();
    alert(message);
    editor.runCommand("show-traits");
};

const getInputValue = (selector: string) => {
    const inp = document.querySelector(selector) as HTMLInputElement;

    return inp.value;
};


//{container : HTMLElement, editor :Editor, query : string | undefined = undefined}
function initPexel({ container, editor, query, projectId }: pexelGridRequest) {
    (async () => {
        //blink-am-file-uploader
        let photos: PexelImage[];
        if (query != undefined && query != "") {
            photos = await fetchImages(query);
        } else {
            photos = await fetchImages();
        }

        const pexelGrid = photos.map(
            (photo) => {
                let style = '';
                if (photo.width > photo.height) {
                    style = 'width:300px; flex-grow:300;';
                }

                return html`
                <div style='${style}' class="blink-am-asset blink-am-asset-image">
                    <div class="blink-am-preview-cont">
                        <div
                            @click=${(ev: Event) => pexelGridHandler(ev, editor, projectId)}
                            data-pexel-image="${photo.src.original}"
                            data-pexel-image-medium="${photo.src.medium}"
                            data-pexel-id="${photo.id}"
                            class="blink-am-preview"
                            style="background-image:url('${photo.src.medium}');"
                        ></div>
                        <div class="blink-am-preview-bg blink-checker-bg"></div>
                    </div>
                    <div class="blink-am-meta">
                        <div class="blink-am-name">${photo.photographer}</div>
                        <div class="blink-am-dimensions"></div>
                    </div>
                </div>
            `},
        );

        render(pexelGrid, container);
    })();
}



//!USE This for tables/CSV 
function parseDataFiles() {
    const file = document.getElementById("csv-uploader") as HTMLInputElement;
    const csvObj = file.files![0];
    if (file.files!.length > 0) {
        Papa.parse(csvObj, {
            complete: function (results: any) {
                console.log("File parsed");
                data = results;
            },
        });
        //console.log(data)
        return data;
    } else {
        return false;
    }
}

/**
 * Trigger additonal functionality on events such as,
 * run:preview, change:device, run:export-template, or any custom command
 */
export function setEvents(editor: VisualEditor.BlinkEditor, projectId: string | number) {
    /*
    editor.on("run:export-template:before", (opts: {abort: number}) => {
        console.log("Before the command run");
        // eslint-disable-next-line no-constant-condition
        if (0 ) {
            opts.abort = 1;
        }
    });*/

    editor.on("rte:enable", () => {
        const blinkTools = document.getElementById('blink-tools') as HTMLElement;
        blinkTools.style.minWidth = '820px';
    });
    editor.on("rte:disable", () => {
        const blinkTools = document.getElementById('blink-tools') as HTMLElement;
        blinkTools.style.minWidth = '';
    });


    editor.on("run:preview", () => {
        //@ts-ignore
        editorPanels().editorBody.style.top = "0";
        //@ts-ignore
        editorPanels().canvas.style.width = "100%";
        //@ts-ignore
        editorPanels().canvas.style.left = "0%";
        //@ts-ignore
        editorPanels().innerCanvas.classList.remove(...canvasGutterClasses.innerCanvas);
        //@ts-ignore
        editorPanels().innerCanvas.style.paddingBottom = "0px";
        //@ts-ignore
        editorPanels().canvas.classList.remove(...canvasGutterClasses.canvas);
        //@ts-ignore
        editorPanels().leftPanelContainer.classList.add("hidden");
        //@ts-ignore
        editorPanels().breadCrumbs.classList.add("hidden");
        //@ts-ignore
        editorPanels().rightPanel.classList.add("hidden");
        //panel__right
        editor.refresh();

    });

    editor.on("stop:preview:before", () => {
        //@ts-ignore
        editorPanels().editorBody.style.cssText = editorWidths.topPane;
        //@ts-ignore
        editorPanels().leftPanelContainer.classList.remove("hidden");
        //@ts-ignore
        editorPanels().breadCrumbs.classList.remove("hidden");
        //@ts-ignore
        editorPanels().rightPanel.classList.remove("hidden");
        //@ts-ignore
        editorPanels().innerCanvas.classList.add(...canvasGutterClasses.innerCanvas);
        //@ts-ignore
        editorPanels().innerCanvas.style.paddingBottom = "78px";
        //@ts-ignore
        editorPanels().canvas.classList.add(...canvasGutterClasses.canvas);

        //const pinnedState = toggledLayer.dataset.pinnedState as state;
        resizeCanvas(editor);
        editor.refresh();
        /*if (pinnedState == "true"){
            editorPanels().canvas.style.cssText = pinnedWidths.canvas;
        }else{
            editorPanels().canvas.style.cssText = editorWidths.canvas;
        }*/

    });

    /*editor.on("asset:remove", (asset: any) => {
        console.log(asset);
    });

    editor.on("component:mount", (comp: any) => {
        //console.log('Mounted this ',comp)
    });*/

    //TODO CLose block menu if it's open
    editor.on("component:add", (comp: any) => {
        //console.log('Added this',comp)
        const assetManager = editor.AssetManager;
        if (comp.attributes.featureBlock) {
            //console.log("featured type", comp);
            comp.attributes.imageAssets.forEach((asset: string) => {
                if (assetManager.get(asset) == undefined) {
                    assetManager.add(asset);
                } else {
                    //console.log("Asset already exists in asset manager");
                }
            });
        }
        closeLeftPanel(editor);

        //Dont run this on inital load only on new component types
        //TODO save types in array and run through function to check

        //!move editor panel state to stores
        if (wrapper().dataset.load != "initial") {
            if (comp.get("type") === "googleTagManager") {
                const trait = comp.getTrait('googleId');
                //console.log(trait);
                modalSmall(
                    editor,
                    {
                        logo: /*html*/ `
                    <svg class="w-24 mb-2" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                    `,
                        main: "Let's set up your Google Tag Manager",
                        sub: /*html*/ `
                    Please grab your tag manager id from you Google Tag Manager workspace see step 3 for instructions on where to find the workspace id 
                    <a class="text-secondary-accent-blue hover:text-secondary-accent-blue-500" target="_blank" href="https://developers.google.com/tag-platform/tag-manager/web">https://developers.google.com/tag-platform/tag-manager/web</a>
                    `,
                    },
                    `Enabling Google Tag Manager will avoid any manual configuration or coding on your end.`,
                    html`
                        <div class="flex justify-center text-xs my-5">
                            <input class="border-b mr-2" id="modalMainInput" placeholder="Worskpace Id" />
                            <a
                                @click=${() =>
                            updateComponentTrait(
                                editor,
                                comp,
                                "googleId",
                                getInputValue("#modalMainInput"),
                                "Your Google Tag Manager Script has been updated.",
                            )}
                                class="inline-flex cursor-pointer items-center px-3 py-2 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-secondary-accent-blue hover:bg-secondary-accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent-blue"
                            >
                                Save Tag
                            </a>
                        </div>
                    `,
                );
            }
            if (comp.get("type") === "googleAnalytics") {
                modalSmall(
                    editor,
                    {
                        logo: /*html*/ `
                        <svg class="w-24 mb-2" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="_x31_08-analytics_x2C__google_analytics_x2C__google">
                            <g>
                            <g>
                            <g>
                            <path d="M330.564,166.28H181.438c-8.232,0-14.912,6.699-14.912,14.956v299.06      c0,8.251,6.68,14.954,14.912,14.954h149.127c8.23,0,14.91-6.703,14.91-14.954v-299.06      C345.475,172.979,338.795,166.28,330.564,166.28L330.564,166.28z M330.564,166.28" style="fill:#FFC107;"/>
                            <path d="M181.438,315.813H32.313c-8.236,0-14.916,6.698-14.916,14.953v149.53      c0,8.251,6.68,14.954,14.916,14.954h149.125c8.234,0,14.914-6.703,14.914-14.954v-149.53      C196.352,322.511,189.672,315.813,181.438,315.813L181.438,315.813z M181.438,315.813" style="fill:#FFC107;"/>
                            <path d="M479.689,16.75H330.564c-8.236,0-14.916,6.698-14.916,14.958v448.588      c0,8.251,6.68,14.954,14.916,14.954h149.125c8.234,0,14.914-6.703,14.914-14.954V31.708      C494.604,23.448,487.924,16.75,479.689,16.75L479.689,16.75z M479.689,16.75" style="fill:#FFA000;"/>
                            </g>
                            </g>
                            </g>
                            </g>
                            <g id="Layer_1"/>
                        </svg>
                    `,
                        main: "Let's set up your Google Analytics Tag",
                        sub: /*html*/ `
                    Please grab your tracking id from your Google Analytics account workspace see steps here: 
                    <a class="text-secondary-accent-blue hover:text-secondary-accent-blue-500" target="_blank" href="https://support.google.com/analytics/answer/9539598">https://support.google.com/analytics/answer/9539598</a>
                    `,
                    },
                    `Enabling Google Tag Analytics will avoid any manual configuration or coding on your end.`,
                    html`
                        <div class="flex justify-center text-xs my-5">
                            <input class="border-b mr-2" id="modalMainInput" placeholder="Analytics Id" />
                            <a
                                @click=${() =>
                            updateComponentTrait(
                                editor,
                                comp,
                                "googleId",
                                getInputValue("#modalMainInput"),
                                "Your Google Analytics Script has been updated.",
                            )}
                                class="inline-flex cursor-pointer items-center px-3 py-2 border border-transparent text-xs leading-4 font-medium rounded-md shadow-sm text-white bg-secondary-accent-blue hover:bg-secondary-accent-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent-blue"
                            >
                                Save Tag
                            </a>
                        </div>
                    `,
                );
            }
        }
    });

    /*
    editor.on('component:toggled', (...component : any) => {
        console.log("Component toggle", component)
    })
    */
    //TODO use this to control canvas
    editor.on("component:selected", (_component: any, sender: any) => {
        //@ts-ignore
        if (!sender.hasOwnProperty("fromLayers")) {
            //popUpTraits(editor, false);
            closeLeftPanel(editor);
        }
        //@ts-ignore
        if (editorPanels().rightPanel.dataset.toggledState == "off") {
            editor.runCommand('show-styles');

            editor.Panels.getButton('panel-utilities', 'show-style')?.set('active', 1);
            toggleRightPanel(true, editor);
        }
        //resizeCanvas(editor);
        //resize 

    });

    /*editor.on("component:deselected", (...component: any) => {
        //console.log("Component deselected", component)
    });

    editor.on("run:tlb-clone", (...component: any) => {
        console.log(component);
    });*/

    /*
    editor.on('rte:enable', (...toolbar : any) =>{
        //console.log(toolbar,'toolbar enabled')
    })

    editor.on('rte:disable', (...toolbar : any) =>{
        //console.log(toolbar,'toolbar enabled')
    })*/

    editor.on("modal:open", () => {
        //console.log('Modal open', modal)
        closeLeftPanel(editor);
        const assetManager = document.querySelector(".blink-asset-manager") as HTMLElement;
        if (assetManager) {
            //editor.Modal.setTitle("");
            const container = document.querySelector(".blink-am-assets-cont") as HTMLElement;
            const overlay = document.createElement('div')


            overlay.id = 'assetManager-overlay';
            overlay.style.cssText = `
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left:0;
                background-color: rgba(0,0,0,.5);
                z-index:20;
                display:none;
            `;
            container.append(overlay);

            document.querySelector<HTMLElement>(".blink-mdl-dialog")!.style.cssText =
                "max-width: 75vw; background: white;";
            const assetManagerButton = document.querySelector("#blink-am-title") as HTMLElement;
            assetManagerButton.innerText = "Upload An Image";

            //let cdnButton = document.querySelector('.blink-btn-prim') as HTMLButtonElement
            //cdnButton.innerText = 'Add Image From Link'

            let pexelGrid: HTMLElement;
            //import pexels
            const header = document.querySelector(".blink-am-assets-header") as HTMLElement;
            const assetInput = document.querySelector(".blink-am-add-asset") as HTMLElement;

            const modalTitle = document.querySelector(".blink-mdl-title") as HTMLElement;

            if (!document.getElementById("gridAssetOptions")) {
                const option = document.createElement("div");
                option.classList.add("flex", "justify-center", "my-4");
                option.id = "gridAssetOptions";
                const optionContent = html`
                    <div
                        id="savedAssetsGrid"
                        class="border-b border-secondary-accent-blue hover:border-secondary-accent-blue cursor-pointer mx-2"
                    >
                        Your Photos
                    </div>
                    <div
                        id="pexelAssetsGrid"
                        class="border-b border-gray-500 hover:border-secondary-accent-blue cursor-pointer mx-2"
                    >
                        Free Pexel Photos
                    </div>
                `;
                render(optionContent, option);

                const savedButton = option.querySelector("#savedAssetsGrid") as HTMLElement;
                const pexelButton = option.querySelector("#pexelAssetsGrid") as HTMLElement;

                const assetGrid = document.querySelector(".blink-am-assets") as HTMLElement;
                pexelGrid = document.createElement("div");
                pexelGrid.id = "pexelAssetGridContainer";
                pexelGrid.style.cssText = `height: 62vh;
                    overflow: auto;
                    clear: both;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;`;
                const updatePexel = (query: string) => {
                    initPexel({ container: pexelGrid, editor: editor, query: query, projectId });
                };
                const modaltitleContent = html`
                    <div class="w-48">
                        <debounce-search .callback=${updatePexel}></debounce-search>
                    </div>
                `;
                modalTitle.innerHTML = "";
                render(modaltitleContent, modalTitle);
                const assetUploader = document.querySelector('.blink-am-file-uploader') as HTMLElement;

                const pexelAttribute = html`
                Free stock photos by <a class="text-secondary-accent-blue" href='https://www.pexels.com/'>Pexel</a> 
                `;
                const pexelAttrDiv = document.createElement('div');
                pexelAttrDiv.id = "pexelAttribution";
                pexelAttrDiv.style.cssText = `
                position: absolute;
                right: 50px;
                top: 16px;
                font-size:12px;
                font-family: 'Poppins';
                `;

                pexelAttrDiv.classList.add('hidden');
                render(pexelAttribute, pexelAttrDiv);
                document.querySelector<HTMLElement>('.blink-mdl-header')!.append(pexelAttrDiv);

                const toggleSelected = (sel: "pexel" | "saved") => {
                    if (sel == "pexel") {
                        savedButton.classList.remove("border-secondary-accent-blue");
                        savedButton.classList.add("border-gray-500");

                        assetUploader.classList.add("hidden");
                        pexelAttrDiv.classList.remove('hidden');

                        pexelButton.classList.add("border-secondary-accent-blue");
                        pexelButton.classList.remove("border-gray-500");

                    } else {
                        pexelButton.classList.remove("border-secondary-accent-blue");
                        pexelButton.classList.add("border-gray-500");

                        savedButton.classList.add("border-secondary-accent-blue");
                        savedButton.classList.remove("border-gray-500");

                        assetUploader.classList.remove("hidden");
                        pexelAttrDiv.classList.add('hidden');
                    }
                };

                savedButton.addEventListener("click", () => {
                    assetInput.classList.remove("hidden");
                    toggleSelected("saved");
                    pexelGrid.classList.add("hidden");
                    assetGrid.classList.remove("hidden");
                });
                pexelButton.addEventListener("click", () => {
                    initPexel({ container: pexelGrid, editor: editor, projectId });
                    assetGrid.classList.add("hidden");
                    assetInput.classList.add("hidden");
                    container.append(pexelGrid);
                    pexelGrid.classList.remove("hidden");
                    toggleSelected("pexel");
                });

                header.prepend(option);
            } else {
                assetInput.classList.remove("hidden");
            }
            const cdnPath = document.querySelector(
                ".blink-am-add-asset .blink-field input",
            ) as HTMLInputElement;
            cdnPath.placeholder = "Paste image link here";
        }
    });

    editor.on("modal:close", (..._modal: any) => {
        //console.log('Modal close',modal)

        const currentModal = document.querySelector(".blink-mdl-container .blink-mdl-dialog");
        currentModal?.classList.remove("w-80");
    });

    //editor.on("run:export-template", () => console.log("After the command run"));
    //editor.on("abort:export-template", () => console.log("Command aborted"));
    //editor.on('change:device', () => console.log('Current device: ', editor.getDevice()))

    editor.on(
        "storage:start:store",
        async (data: VisualEditor.editorStorageObject) => {
            NProgress.start();


            //TODO Map through ComponentsManager instead ie editor.getComponents(); 
            const comps: Record<string, any> = data.pages[0].frames[0].component.components //JSON.parse(objectToStore.pages[0].frames[0].component.components);
            if (comps && comps.every) {
                comps.every((element: object | any) => {
                    if (element.hasOwnProperty("dynamic")) {
                        //console.log('Dynamic block exists',element)
                        data.dynamic = true;
                        //updateDynamicBlocks(editor, {name : element.dynamicBlockConfig.name,components:element,id:element.dynamicBlockConfig.id})               

                        //return false
                    } else {
                        data.dynamic = false;
                        //console.log(element)
                    }
                });
            }




            //TODO fix this 
            type googleFonts = "'Open Sans', sans-serif"
                | "'Lato', sans-serif"
                | "'Old Standard TT', serif"
                | "'Oxygen', sans-serif"
                | 'Merriweather, serif'
                | 'Montserrat, sans-serif'
                | "'Poppins', sans-serif"
                | "'PT Sans', sans-serif"
                | "'Raleway', sans-serif"
                | "'Roboto', sans-serif"
                | "'Spectral', serif"
                | "'Work Sans', sans-serif"

            //&display=swap

            const fontLinks: Record<googleFonts, string> = {
                "'Lato', sans-serif": "family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
                "'Old Standard TT', serif": "family=Old+Standard+TT:ital,wght@0,400;0,700;1,400",
                "'Open Sans', sans-serif": "family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800",
                "'Oxygen', sans-serif": "family=Oxygen:wght@300;400;700",
                "'PT Sans', sans-serif": "family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700",
                "'Poppins', sans-serif": "family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
                "'Raleway', sans-serif": "family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
                "'Roboto', sans-serif": "family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900",
                "'Spectral', serif": "family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800",
                "'Work Sans', sans-serif": "family=Work+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900",
                "Merriweather, serif": "family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900",
                "Montserrat, sans-serif": "family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900"
            }
            const acceptedFonts: googleFonts[] = ["'Lato', sans-serif", "'Old Standard TT', serif", "'Open Sans', sans-serif", "'Oxygen', sans-serif", "'PT Sans', sans-serif", "'Poppins', sans-serif", "'Raleway', sans-serif", "'Roboto', sans-serif", "'Spectral', serif", "'Work Sans', sans-serif", "Merriweather, serif", "Montserrat, sans-serif"]

            const styleList = editor.CssComposer.getAll().toJSON() as { style: { 'font-family'?: googleFonts } }[];//[0].style['font-family']
            data.fonts = [];
            styleList.forEach((fontVals) => {

                if (fontVals.style["font-family"] && acceptedFonts.includes(fontVals.style["font-family"])) {
                    if (!data.fonts.includes(fontVals.style["font-family"])) data.fonts.push(fontVals.style["font-family"]);
                }
            });
            //const inputVal = document.getElementById("panel__Title") as HTMLInputElement;
            //data.title = inputVal.value;

            data.url = getPageUrl();
            data.status = getStatus();
            data["seo-toolkit"] = getSeoFields();

            //const itemStatus = document.getElementById("itemStatus") as HTMLElement;
            //objectToStore.status = itemStatus.innerText;

            //console.log(objectToStore, objectToStore.customHtml)
            //objectToStore.customHtml = `<div>...${editor.getHtml()}...</div>`
            const dataLogic = parseDataFiles();
            //console.log(dataLogic)
            if (dataLogic) {
                data.csvParser = dataLogic;
            }

            //tack on html css and components

            data.html = editor.getHtml();

            data.css = editor.getCss() ?? '';

            data.components = editor.getComponents();



            //data.item_preview*/
            //!Come back
            /*if (wrapper().dataset.load != "initial") {
                const notify = notification();
                
                render(notify,wrapper);

                setTimeout(() => {
                    document.querySelector('.notification-storage')?.remove();
                }, 1000);

            }*/



        },
    );
    editor.on("storage:end:store", (_data: VisualEditor.editorStorageObject) => {
        NProgress.done();
    });

    editor.on("storage:error", (e) => {
        //console.log('wow',e)
        if (browser) {
            const loginWindow = window.open('/login', '', 'height=600,width=600');
            loginWindow?.addEventListener('load', () => {
                //console.log('loaded')
                //console.log(loginWindow?.document.getElementById('loginButton'))
                loginWindow?.document.getElementById('loginButton')!.addEventListener('click', async () => {
                    const email = loginWindow?.document.getElementById('ilqa4') as HTMLInputElement;
                    const password = loginWindow?.document.getElementById('imhd2') as HTMLInputElement;
                    const formdata = new FormData();
                    loginWindow?.close()
                    formdata.append('email', email.value);
                    formdata.append('password', password.value);
                    const req = await fetch('/login', { method: "POST", body: formdata });
                    //console.log(req);

                });
            })
        }
        /*setTimeout(() => {
            loginWindow?.document.getElementById('loginButton')!.addEventListener('click',()=>{
                
                loginWindow?.close()
            });
        }, 1500);*/

    });
    editor.on("storage:start:load", (_data: VisualEditor.editorStorageObject) => {
        //
    });
    editor.on("storage:end:load", (data: VisualEditor.editorStorageObject) => {
        /*console.log({
            assets:data.assets,
            pages:data.pages,
            styles:data.styles
        })
        editor.loadProjectData({
            assets:data.assets,
            pages:data.pages,
            styles:data.styles
        });*/

        const inputVal = document.getElementById("panel__Title") as HTMLInputElement;
        inputVal.value = data.title;
        const projectName = document.getElementById('projectName') as HTMLElement;
        projectName.innerHTML = `&nbsp; | ${data.project}`;
        //projectName
        //Update Status method
        updateStatus(data.status);

        //Update page url
        setPageUrl(data.url);

        try {
            //Update seo toolkit options
            setSeoFields(data["seo-toolkit"]);
        } catch (error) {
            //need to set seoFields
        }

        //TODO add this to data/api integrations
        if (data.csvParser) {
            FilterData(data.csvParser);
            //unParseFiles(resultObject['csvParser'])
        }

    });
}
