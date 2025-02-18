/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/ban-ts-comment */
//import type { BlinkEditor } from "../editorTypes";
import { defaultToolbar } from "../toolbar/toolbar";
//import { collectionID, itemID } from "./templates";

interface dynamicBlocks {
  Blocks?: Array<any>;
}

function prepareDynamicBlock(
  editor: VisualEditor.BlinkEditor,
  overide?: boolean,
  existingBlock?: any,
) {
  //editor.getSelected().getStyle()
  //Parent Element
  let selectedBlock: any;
  overide
    ? (selectedBlock = existingBlock)
    : (selectedBlock = editor.getSelected());
  //const selectedBlock = editor.getSelected()
  const parentId = selectedBlock.ccid;
  //@ts-ignore
  const parentBlock : any = editor.DomComponents.componentsById[parentId].toJSON();
  const firstTrigger = false;
  const childContainer: any = {};
  //Children Elements
  let initCounter = 0;
  const recursiveForOf = (elem: any, parent: any) => {
    //console.log('Parent',elem)
    //@ts-ignore
    if (elem.hasOwnProperty("components")) {
      const containerArray = [];
      const childContainerArray = [];

      //let currentParent = parent.components
      for (const child of elem.components.models) {
        //@ts-ignore
        const childFormatted =editor.DomComponents.componentsById[child.ccid].toJSON();
         //@ts-ignore
        childFormatted.style =editor.DomComponents.componentsById[child.ccid].getStyle();
        containerArray.push(childFormatted);
        //firstTrigger ? parent.components[initCounter] = containerArray : parent.components = containerArray
        //firstTrigger = true

        try {
          if (parent.components.hasOwnProperty("components")) {
            //console.log(parent.components)
            parent.components = containerArray;
          }
          //else{
          //parent.style = editor.DomComponents.componentsById[child.ccid].getStyle()
          //  console.log('Look into this model', parent)
          //break
          //}
          //parent.components = containerArray
        } catch (exception_var) {
          //console.log(exception_var, "Look into this model", parent);
          //parent.components = childFormatted
          //break
        }

        //currentParent = containerArray

        let childFormatCounter = 0;
        //console.log('Recursive',childFormatted) //Reference to the whole array
        if (childFormatted.hasOwnProperty("components")) {
          for (const iterator of childFormatted.components.models) {
             //@ts-ignore
            const compRef =editor.DomComponents.componentsById[iterator.ccid].toJSON();
             //@ts-ignore
            compRef.style =editor.DomComponents.componentsById[iterator.ccid].getStyle();
            childContainerArray.push(compRef);
            parent.components[childFormatCounter].components =childContainerArray;
            //currentParent[childFormatCounter] = childContainerArray
            //console.log('Recursive iterator',compRef, childFormatCounter, initCounter)

            if (compRef.hasOwnProperty("components")) {
              recursiveForOf(
                compRef,
                parent.components[0].components[initCounter],
              );
            } else {
              //break
            }
          }
        }

        //console.log('Sequential Order',parent.components[initCounter])
        initCounter++;
        childFormatCounter += 1;
      }
    }
  };
  /**
   *
   * @returns Array of child id elements
   */
  const childrenView = () => {
     //@ts-ignore
    parentBlock.style =editor.DomComponents.componentsById[parentId].getStyle();
    childContainer.model = {
      defaults: parentBlock,
    };
    if (parentBlock.hasOwnProperty("components")) {
      recursiveForOf(parentBlock, childContainer.model.defaults);
    } else {
      //return false
    }
    //console.log(childContainer)
    return childContainer;
  };

  return childrenView();
}

/**
 *
 * @param url the url to send to the server
 * @param method method for fetch request
 * @returns list of all saved dynamic blocks
 */
async function fetchFromServer(
  url: string,
  method: "GET" | "POST",
  body?: FormData,
) {
  return fetch(url, {
    method: method,
    body: body,
  })
    .then((response) => response.json())
    .then((result) => {
      //console.log('Success you have pulled the blocks from:', result)
      return result;
    })
    .catch((error) => {
      //console.error("Error:", error);
    });
}

export async function saveDynamicBlock(
  editor: VisualEditor.BlinkEditor,
  block: { name: string; components: object },
  itemId : string | number,
  projectId : string | number
) {
  //editor.Components.getComponents() this grabs components in the dom
  let dynamicBlockData: dynamicBlocks | any = {};

  //console.log( block.components , JSON.stringify(block.components))
  const componentString = prepareDynamicBlock(editor);
  //TODO editor.DomComponents.allById().it3r or editor.DomComponents.componentsById use this instead
  //console.log(componentString);
  //GET STYLE editor.DomComponents.componentsById.[blockID].getStyle()

  const formData = new FormData();
  formData.append("name", block.name);
  formData.append("components", JSON.stringify(componentString));
  formData.append("item_id", `${itemId}`);
  formData.append("collection_id", `${projectId}`);

  await (async () => {
    dynamicBlockData = await fetchFromServer(
      "/create-dynamic-blocks",
      "POST",
      formData,
    );
  })();

  editor.Modal.close();
   //@ts-ignore
  editor.getSelected().attributes.dynamicBlockConfig = {
    name: dynamicBlockData.name,
    id: dynamicBlockData.id,
  };
   //@ts-ignore
  editor.store();

  appendToEditor(editor, dynamicBlockData);
}

export async function updateDynamicBlocks(
  editor: VisualEditor.BlinkEditor,
  block: { name: string; components: object; id: string },
  itemId : string | number,
  projectId : string | number
) {
  let dynamicBlockData: dynamicBlocks | any = {};

  const componentString = prepareDynamicBlock(editor, true, block.components);
  //TODO editor.DomComponents.allById().it3r or editor.DomComponents.componentsById use this instead
  //console.log(componentString);
  const formData = new FormData();
  formData.append("name", block.name);
  formData.append("components", JSON.stringify(componentString));
  formData.append("item_id", `${itemId}`);
  formData.append("collection_id", `${projectId}`);

  await (async () => {
    dynamicBlockData = await fetchFromServer(
      `/update-dynamic-blocks?blockid=${block.id}`,
      "POST",
      formData,
    );
  })();

  //editor.Modal.close()
  /*.attributes.dynamicBlockConfig = {
        name : dynamicBlockData.name,
        id : dynamicBlockData.id
    }*/
}

/**
 *
 * @param editor Visual editor object
 * @param block Dynamic blocks to add to editor
 */
function appendToEditor(editor: VisualEditor.BlinkEditor, block: Array<any> | object | any) {
  //TODO add the below to a event loop based on data size

  const blockName: string = block.name;
  const label = /*html*/
  `<svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 0 20 20" fill="currentColor">
  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
  </svg>
    ${blockName}`;

  const blockData = JSON.parse(block.components);
  blockData.model.defaults.toolbar = defaultToolbar;
  blockData.model.defaults.dynamicBlockConfig = {
    name: block.name,
    id: block.id,
  };

  //console.log(blockData, "block data");
  editor.Components.addType(blockName, {
    model: {
      defaults: blockData.model.defaults,
    },
  });

  editor.BlockManager.add(blockName, {
    label: label,
    content: {
      type: blockName,
    },
    category: "Dynamic",
  });
}

/**
 *
 * Check to see if any Dynamic Blocks Exists
 */
export async function loadDynamicBlocks(editor: VisualEditor.BlinkEditor, blockid: string) {
  let dynamicBlockData: dynamicBlocks | any = {};

  await (async () => {
    dynamicBlockData = await fetchFromServer(
      `/get-dynamic-blocks?blockid=${blockid}`,
      "GET",
    );
  })();

  //console.log(dynamicBlockData)

  const blocks = dynamicBlockData.dynamicBlock;

  //console.log("Look HERE JHONELLE", blocks);

  appendToEditor(editor, blocks!);
}

/**
 *
 * Check to see if any Dynamic Blocks Exists
 */
export async function loadAllDynamicBlocks(editor: VisualEditor.BlinkEditor) {
  let dynamicBlockData: dynamicBlocks | any = {};

  await (async () => {
    dynamicBlockData = await fetchFromServer(`/get-all-dynamic-blocks`, "GET");
  })();

  //console.log(dynamicBlockData)

  const blocks = dynamicBlockData.dynamicBlock;
  //console.log('Look HERE',blocks)
  for (const each of blocks) {
    appendToEditor(editor, each);
  }
}
