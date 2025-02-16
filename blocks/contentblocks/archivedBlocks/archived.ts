function toggleModal(this: HTMLElement) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const modal = this;
    const closeButtons = Array.from(this.querySelectorAll('.closeModal')) as HTMLElement[];
  
    for (const buttons of closeButtons) {
      buttons.addEventListener("click", function () {
        modal.style.display = "none";
      });
    }
  }

export default function(editor : VisualEditor.BlinkEditor){

editor.Components.addType('modal', {
    model: {
      defaults: {
        icon:/*html*/`<svg xmlns="http://www.w3.org/2000/svg"  height="15" viewBox="0 0 16 16">
     <path fill="#444" d="M0 1v14h16V1H0zm15 13H1V4h14v10zm0-11h-1V2h1v1z"/>
     </svg>`,
        script: toggleModal,
        attributes: { class: 'fixed z-10 inset-0 overflow-y-auto' },
        toolbar: defaultToolbar,
        content:/*html*/`
     <div></div>
     `,
        components: {
          //tagName:"container",
          content:/*html*/`<div></div>`, icon: boxIcon,
          attributes: { class: 'flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0' },
          components: [
            {
              //tagName:"overlay",
              content:/*html*/`<div></div>`, icon: boxIcon,
              attributes: { class: "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" }
            },
            {
              tagName: "span",
              content:/*html*/`<span></span>`,
              attributes: { class: "hidden sm:inline-block sm:align-middle sm:h-screen" }
            },
            {
              //tagName:"content",
              content:/*html*/`<div></div>`, icon: boxIcon,
              attributes: { class: "inline-block align-bottom bg-white rounded-lg px-8 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:py-6" },
              components: [
                {
                  //tagName:"",
                  content:/*html*/`<div></div>`, icon: boxIcon,
                  //attributes:{class:""},
                  components: [
                    {
                      //tagName:"modal-header",
                      attributes: { class: "flex justify-end" },
                      content:/*html*/`<div></div>`, icon: boxIcon,
                      components: {
                        tagName: "svg",
                        attributes: { class: "h-6 w-6 cursor-pointer closeModal" },
                        content:/*html*/`
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6 18L18 6M6 6l12 12" />
                    </svg>`,
                      }
                    },
                    {
                      //tagName:"modal-content",
                      attributes: { class: "mt-3 text-center sm:mt-5 px-8" },
                      content:/*html*/`<div></div>`, icon: boxIcon,
                      components: [
                        {
                          tagName: "h3",
                          attributes: { class: "text-lg leading-6 font-medium text-gray-900" },
                          content:/*html*/`<h3>Recieve 10% Off Your Next Purchase</h3>`
                        },
                        {
                          //tagName:"cta",
                          attributes: { class: "mt-4" },
                          content:/*html*/`<div></div>`, icon: boxIcon,
                          components: [
                            {
                              attributes: { class: "text-sm text-gray-500" },
                              content:/*html*/`<p>Join our subscriber list and</p>`
                            },
                            {
                              attributes: { class: "text-sm text-gray-500" },
                              content:/*html*/`<p>we'll send you your special offer.</p>`
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  //tagName:"box",
                  content:/*html*/`<div></div>`, icon: boxIcon,
                  attributes: { class: "mt-5 sm:mt-6 px-12" },
                  components: {
                    content:/*html*/`<div></div>`, icon: boxIcon,
                    components: [
                      {
                        attributes: { class: "block text-sm font-medium text-gray-700" },
                        content:/*html*/`<label for="email">Email</label>`
                      },
                      {
                        attributes: { class: "mt-1" },
                        content:/*html*/`<div></div>`, icon: boxIcon,
                        components: {
                          attributes: {
                            class: "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md",
                            placeholder: "you@example.com",
                            name: "email",
                            id: "email",
                            type: "text"
                          },
                          type: "input",
                          //content:/*html*/`<input placeholder="you@example.com" name="email" type="text"/>`,
                        }
                      }
                    ]
                  }
                },
                {
                  //tagName:"box",
                  content:/*html*/`<div></div>`, icon: boxIcon,
                  attributes: { class: "mt-5 sm:mt-6 px-12" },
                  components: {
                    content:/*html*/`<div></div>`, icon: boxIcon,
                    attributes: { class: "flex cursor-pointer w-full justify-center items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" },
                    components: [
                      {
                        content:/*html*/`<p>Get My 10% Offer</p>`,
                        attributes: { class: "text-center" }
                      },

                    ]
                  }
                }
              ]
            }
          ]
        },
        styles: modalStyles
      }
    }
  })

}