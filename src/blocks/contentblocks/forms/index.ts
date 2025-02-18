/* eslint-disable @typescript-eslint/ban-ts-comment */
import loadTraits from './traits';
import loadBlocks from './blocks';
import loadComponents from './components';
//import type { BlinkEditor } from '../../../editorTypes';

/*
export default grapesjs.plugins.add('blink-forms',(editor: { DomComponents?: any; TraitManager?: any; BlockManager?: any; } | any, opts: any) => {

  const config = {
    blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
    ...opts
  };

  loadComponents(editor, config);
  loadTraits(editor)  //, config);
  loadBlocks(editor, config);

})
*/

export default function (editor: VisualEditor.BlinkEditor,opts?:any){
  const config = {
    blocks: ['form', 'input', 'textarea', 'select', 'button', 'label', 'checkbox', 'radio'],
    ...opts
  };

  //@ts-ignore
  loadComponents(editor, config);
  loadTraits(editor)  //, config);
  loadBlocks(editor, config);
}