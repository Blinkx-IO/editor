//import type {BlinkEditor} from "../../../editorTypes";
import {
  typeForm,
  typeInput,
  typeTextarea,
  typeSelect,
  typeCheckbox,
  typeRadio,
  typeButton,
  typeLabel,
} from './components';

export default function (editor:VisualEditor.BlinkEditor, opt: any = {}) {
  const c = opt;
  const bm = editor.BlockManager; //id: string, def: { label: string; media: string; content: { type: string; style : object, components: ({ components: ({ type: string; style : object; components: string; } | { type: string; })[]; } | { components: ({ type: string;  components: string; } | { type: string; style : object, attributes: { type: string; placeholder:string; }; })[]; } | { components: ({ type: string; components: string; } | { type: string; style : object, attributes: { value: string; }; })[]; })[]; } | { type: string; } | { type: string; } | { type: string; } | { type: string; } | { type: string; } | { type: string; } | { type: string; }; }
  const addBlock = (id: string,
    def: {
      label: string;
      media: string;
      content: {
        type: string;
        style: object;
        components: (
        {   style : object;
            components: ({
              type: string;
              style: object;
              components: string;
              attributes : object;
            } | {
              type: string;
            })[];
        }|
        {
          components: ({
            type: string;style: object;components: string;
          } | {
            type: string;
          })[];
        } | {
          components: ({
            type: string;components: string;
          } | {
            type: string;
            style: object;
            attributes: {
              type: string;placeholder: string;
            };
          })[];
        } | {
          components: ({
            type: string;components: string;
          } | {
            type: string;
            style: object;
            components: string;
            attributes: {
              value: string;
            };
          })[];
        })[];
      } | {
        style: object;
        type: string;
      } | {
        type: string;
      } | {
        type: string;
      } | {
        type: string;
      } | {
        type: string;
      } | {
        type: string;
      } | {
        type: string;
      };
    }) => {
    c.blocks.indexOf(id) >= 0 && bm.add(id, {
      ...def,
      category: {
        id: 'forms',
        label: 'Forms'
      },
    });
  }
  const formStyle = {
    'display': 'flex',
    'flex-direction': 'column',
    'margin-top': '10px',
    'padding-right': '15px',
    'padding-left' : '15px'
  }

  const inputStyle = {
    'width': '100%',
    'font-family': 'Helvetica, sans-serif',
    'margin-top': '10px'
  }

  const buttonStyle = {
    'width': '100%',
    'font-family': 'Helvetica, sans-serif',
    'margin-top': '10px'
  }

  const labelStyle = {
    'font-family': 'Helvetica, sans-serif'
  }

  const boxStyle = {
    'text-align' : 'left'
  }

  addBlock(typeForm, {
    label: 'Form',
    media: /*html*/ `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM7 6V10H11V6H7ZM7 12V14H17V12H7ZM7 16V18H17V16H7ZM13 7V9H17V7H13Z" />
    </svg>
    `,
    content: {
      type: typeForm,
      style: formStyle,
      components: [
        { style :boxStyle,
          components: [
            {
              type: typeLabel,
              style: labelStyle,
              components: 'Enter Your Name'
            },
            {
              type: typeInput,
              style: inputStyle,
              attributes: {
                placeholder: 'Jane Doe',
              }
            },
          ]
        }, {
          style :boxStyle,
          components: [{
              type: typeLabel,
              style: labelStyle,
              components: 'Enter Your Email'
            },
            {
              type: typeInput,
              style: inputStyle,
              attributes: {
                type: 'email',
                placeholder: 'jane@doe.com'
              }
            },
          ]
        },
        {
          components: [{
            type: typeButton,
            style: buttonStyle
          }]
        },
      ]
    }
  });

  addBlock(typeInput, {
    label: 'Input',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M4 10h1v4H4z"/></svg>`,
    content: {
      type: typeInput
    },
  });

  addBlock(typeTextarea, {
    label: 'Textarea',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 7.5c0-.9-.5-1.5-1.3-1.5H3.4C2.5 6 2 6.6 2 7.5v9c0 .9.5 1.5 1.3 1.5h17.4c.8 0 1.3-.6 1.3-1.5v-9zM21 17H3V7h18v10z"/><path d="M4 8h1v4H4zM19 7h1v10h-1zM20 8h1v1h-1zM20 15h1v1h-1z"/></svg>`,
    content: {
      type: typeTextarea
    },
  });

  addBlock(typeSelect, {
    label: 'Select',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 9c0-.6-.5-1-1.3-1H3.4C2.5 8 2 8.4 2 9v6c0 .6.5 1 1.3 1h17.4c.8 0 1.3-.4 1.3-1V9zm-1 6H3V9h18v6z"/><path d="M18.5 13l1.5-2h-3zM4 11.5h11v1H4z"/></svg>`,
    content: {
      type: typeSelect
    },
  });

  addBlock(typeButton, {
    label: 'Button',
    media: /*html*/`
    <svg  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.5V11.24C7.79 10.43 7 9.06 7 7.5C7 5.01 9.01 3 11.5 3C13.99 3 16 5.01 16 7.5C16 9.06 15.21 10.43 14 11.24V7.5C14 6.12 12.88 5 11.5 5C10.12 5 9 6.12 9 7.5ZM14.3 13.61L18.84 15.87C19.37 16.09 19.75 16.63 19.75 17.25C19.75 17.31 19.74 17.38 19.73 17.45L18.98 22.72C18.87 23.45 18.29 24 17.54 24H10.75C10.34 24 9.96 23.83 9.69 23.56L4.75 18.62L5.54 17.82C5.74 17.62 6.02 17.49 6.33 17.49C6.39 17.49 6.44111 17.4989 6.49222 17.5078C6.51778 17.5122 6.54333 17.5167 6.57 17.52L10 18.24V7.5C10 6.67 10.67 6 11.5 6C12.33 6 13 6.67 13 7.5V13.5H13.76C13.95 13.5 14.13 13.54 14.3 13.61Z" />
    </svg>

    `,
    content: {
      type: typeButton
    },
  });

  addBlock(typeLabel, {
    label: 'Label',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 11.9c0-.6-.5-.9-1.3-.9H3.4c-.8 0-1.3.3-1.3.9V17c0 .5.5.9 1.3.9h17.4c.8 0 1.3-.4 1.3-.9V12zM21 17H3v-5h18v5z"/><rect width="14" height="5" x="2" y="5" rx=".5"/><path d="M4 13h1v3H4z"/></svg>`,
    content: {
      type: typeLabel
    },
  });

  addBlock(typeCheckbox, {
    label: 'Checkbox',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 17l-5-5 1.41-1.42L10 14.17l7.59-7.59L19 8m0-5H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2z"></path></svg>`,
    content: {
      type: typeCheckbox
    },
  });

  addBlock(typeRadio, {
    label: 'Radio',
    media: /*html*/`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"></path></svg>`,
    content: {
      type: typeRadio
    },
  });
}