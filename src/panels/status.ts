/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//import type { BlinkEditor, status } from "../editorTypes";
import {html, render} from "lit-html";



const defaultStatus: VisualEditor.status = "Draft";
const icons = {
    greenCheck: html`
        <svg
            style="color:#05ed05!important;"
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
            />
        </svg>
    `,
    redAlert: html`
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
            />
        </svg>
    `,
};

function updateStatus(status: VisualEditor.status) {
    const itemStatus = document.getElementById("itemStatus") as HTMLElement;
    //!Temp
    status == "Inactive" ? (itemStatus.innerText = "Draft") : (itemStatus.innerText = status);

    itemStatus.dataset.status = status;
}

function getStatus() {
    const itemStatus = document.getElementById("itemStatus") as HTMLElement;

    return itemStatus.dataset.status as VisualEditor.status;
}

function bindStatusUpdates(editor:VisualEditor.BlinkEditor) {
    const changeStatusButton = document.getElementById(
        "listbox-option-publish-status",
    ) as HTMLLIElement;
    const itemStatus = document.getElementById("itemStatus") as HTMLElement;

    changeStatusButton.addEventListener("click", () => {
        const currentState = itemStatus.dataset.status as VisualEditor.status;
        let conf = true;
        if (currentState == "Draft" || currentState == "Inactive") {
            itemStatus.dataset.status = "Published";
            itemStatus.textContent = "Published";
        } else {
            conf = confirm(
                "Are you sure you want to unpublish this content item? It'll remove it from your live site!",
            );
            if (conf) {
                itemStatus.dataset.status = "Inactive";
                //TODO update this methodology
                itemStatus.textContent = "Draft";
            }
        }
        //@ts-ignore
        if (conf) editor.store();

        const dropDown = document.getElementById("status-dropdown") as HTMLElement;
        dropDown.classList.add("hidden");
        dropDown.dataset.open = "false";
    });
}

//TODO add smooth transition
function toggleMenu(this: HTMLElement) {
    const topNode = this.parentNode!.parentNode!.parentNode;
    const dropDown = topNode!.querySelector("ul");
    const opened = dropDown!.dataset.open;
    const itemStatus = document.getElementById("itemStatus") as HTMLElement;
    const currentState = itemStatus.dataset.status as VisualEditor.status;
    const statusOption = dropDown!.querySelector("#listbox-option-publish-status") as HTMLLIElement;

    const statusLabel = statusOption.querySelector(".option-label") as HTMLParagraphElement;
    const statusIcon = statusOption.querySelector(".option-icon") as HTMLElement;
    const statusDescription = statusOption.querySelector(
        ".option-description",
    ) as HTMLParagraphElement;

    //TODO set up draft with a live version
    if (currentState == "Draft" || currentState == "Inactive") {
        currentState == "Draft"
            ? (statusLabel.textContent = "Publish Update")
            : (statusLabel.textContent = "Publish");

        render(icons.greenCheck, statusIcon);
        statusDescription.textContent = "Publish content item to destination.";
    } else {
        statusLabel.textContent = "Unpublish";
        render(icons.redAlert, statusIcon);
        statusDescription.textContent = "Content item will no longer be live";
    }

    if (opened == "true") {
        dropDown!.classList.add("hidden");
        dropDown!.dataset.open = "false";
    } else {
        dropDown!.classList.remove("hidden");
        dropDown!.dataset.open = "true";
    }
}

const statusButton = html`
            <div>
                <label id="listbox-label" class="sr-only">
                Change published status
                </label>
                <div class="relative">
                    <div class="inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500">
                        <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500">
                        <div class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 pl-2 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                            
                            
                            <p class="ml-2.5 font-medium"> 
                            <div class="text-sm" data-status=${defaultStatus} id="itemStatus">Status</div>
                            </p>
                        </div>
                        <button @click=${toggleMenu} type="button" class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 rounded-l-none rounded-r-md text-sm font-medium text-white"  aria-expanded="true" aria-labelledby="listbox-label">
                            <span class="sr-only">Change published status</span>
                            <!-- Heroicon name: solid/chevron-down -->
                            <svg style="color:white!important;" class="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        </div>
                    </div>

                    <!--
                        Select popover, show/hide based on select state.

                        Entering: ""
                        From: ""
                        To: ""
                        Leaving: "transition ease-in duration-100"
                        From: "opacity-100"
                        To: "opacity-0"
                    -->
                    <ul 
                    data-open="false"
                    id="status-dropdown"
                    class="hidden origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-0">
                        <!--
                        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

                        Highlighted: "text-white bg-indigo-500", Not Highlighted: "text-gray-900"
                        -->
                        <li class="
                             cursor-pointer select-none relative p-4 text-sm 
                            hover:bg-gray-50
                            " 
                            id="listbox-option-publish-status" 
                            role="option">
                            <div class="flex flex-col">
                                <div class="flex justify-between">
                                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                                    <p class="option-label font-normal text-gray-900">
                                        Publish
                                    </p>
                            
                                    <span class="option-icon">
                                        
                                    </span>
                                </div>
                                <!-- Highlighted: "text-indigo-200", Not Highlighted: "text-gray-500" -->
                                <p class="text-gray-500 mt-2 text-left option-description">
                                Publish content item to destination.
                                </p>
                            </div>
                        </li>

                        <!-- More items... -->
                    </ul>
                </div>
            </div>     
`;

export {statusButton, updateStatus, getStatus, bindStatusUpdates};
