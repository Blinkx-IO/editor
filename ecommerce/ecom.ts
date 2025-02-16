/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {product} from "$commerce/types";
//import type {BlinkEditor} from "../editorTypes";
import {leftPanelConfig} from "../commands/commands";
import {html, render} from "lit";

//TODO create this endpoint
async function getCatalog(limit?: string) {
    let url = "/commerce/products";

    if (limit) url = `/commerce/products?limit=${limit}`;

    const response = await fetch(url, {
        method: "POST",
    });

    const products = await response.json();

    return products;
}

export async function bindEcomEvent(editor:VisualEditor.BlinkEditor) {
    const button = document.getElementById("ecomDisabled");
    const commerceContainer = document.createElement("div");
    commerceContainer.classList.add("commerce-container");
    const toggledEditorLayer = document.getElementById("toggledEditorLayer");

    commerceContainer.style.display = "none";

    toggledEditorLayer?.append(commerceContainer);

    render(
        html`
            <div class="flex flex-col justify-between p-1 items-center">
                <h1>Commerce</h1>
                <button>View Products</button>
                <button>View Orders</button>
            </div>
        `,
        commerceContainer,
    );

    async function getProducts() {
        const catalog: product[] = await getCatalog("5");
        
        render(
            html`
                <div class="flex flex-col justify-between p-1 items-center">
                    <h1>Commerce</h1>
                    <div class="hidden items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 pinLayer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                        </svg>
                        <svg
                            title="close"
                            data-command="show-layers"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 closeLayer cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div class="grid grid-cols-2">
                        
                        ${catalog.map((products)=>html`
                            <div> 
                                <div>${products.name}</div>
                                <img class="object-cover w-28" src="${products.image}"/>
                            </div>
                        `)}
                        
                    </div>
                </div>
            `,
            commerceContainer,
        );

       
    }
     //@ts-ignore
    editor.Commands.add("show-commerce", leftPanelConfig(".commerce-container"));
     //@ts-ignore
    editor.Panels.getButton("panel__left", "show-ecommerce").set("togglable", true);
     //@ts-ignore
    editor.Panels.getButton("panel__left", "show-ecommerce").set("command", "show-commerce");
}
