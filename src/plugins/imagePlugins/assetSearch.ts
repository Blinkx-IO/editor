import {html, LitElement, css} from "lit";
import {customElement, property, state} from "lit/decorators.js";

//@customElement("debounce-search")
export class DebounceSearch extends LitElement {
    @state()
    typingTimer = 1000; //milliseconds

    @property()
    callback = (input : string)=>console.warn(`Callback timer has completed, \n No callback has been set on this element \n The user inputed ${input}`);
    
    private typingTimeout! : ReturnType<typeof setTimeout>;

    searchAssets(ev: Event) {
        const input = ev.target as HTMLInputElement;

        clearTimeout(this.typingTimeout);
        
        this.typingTimeout = setTimeout( ()=> {
            this.callback(input.value);
        }, this.typingTimer)

    }

    

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div class="mt-1 relative flex items-center">
                <input
                    @input=${this.searchAssets}
                    type="text"
                    name="search"
                    placeholder="Search"
                    id="search"
                    class="shadow-sm 
                border border-gray-300
                focus:outline-none focus:ring-2 
                focus:ring-secondary-accent-blue 
                focus:border-secondary-accent-blue-600 
                block w-full pr-12 py-2 pl-2 
                sm:text-sm rounded-md"
                />
                <div class="absolute inset-y-0 right-0 flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-9 w-9 inline-flex items-center rounded px-2 text-sm font-sans font-medium text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
        `;
    }
}


