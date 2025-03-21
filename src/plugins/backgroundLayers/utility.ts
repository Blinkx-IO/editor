/**
 * @param {String} html representing a single element
 * @return {Element}
 */
 export function htmlToElement(html : string) : ChildNode {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild!;
}

/**
 * @param {String} html representing any number of sibling elements
 * @return {NodeList} 
 */
 export function htmlToElements(html :string) : NodeListOf<ChildNode>{
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}