export const defaultToolbar = [
	// these are the default toolbar elements
	/*{
		attributes: {class: 'fas fa-edit'}, 
		command: 'tlb-edit'
	},*/
	/*{
		attributes: {class: "fas fa-ellipsis-v tlb-option"},
		command: "tlb-options",
	},*/
	{
		label: /*html*/ `<svg title="Edit Code" class="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.8 12L9.4 16.6L8 18L2 12L8 6L9.4 7.4L4.8 12ZM19.2 12L14.6 16.6L16 18L22 12L16 6L14.6 7.4L19.2 12Z"></path>
        </svg>`,
		command: 'edit-code-js'//'edit-script'
	},
	
	/*{
		label: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
		class="w-4 h-4">
  		<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
		</svg>
`,
		command: 'generate-ai'//() => { }
	},*/
	
	//js
	{
		attributes: { class: 'fa fa-arrow-up' },
		command: 'select-parent'
	},

	{
		attributes: { class: 'fa fa-clone' },
		command: 'tlb-clone'
	},
	{
		attributes: { class: 'fa fa-trash' },
		command: 'tlb-delete'
	},
	{
		attributes: { class: 'fa fa-arrows' },
		command: 'tlb-move'
	},
	{
		label: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
	  </svg>`,
		command: 'tlb-slice'
	}
];
