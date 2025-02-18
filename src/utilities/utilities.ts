// import { browser } from "$app/environment";
// NOTE: This is a hack to get around the fact that the editor is not running in a browser environment
const browser = true;

import { type TemplateResult, render } from "lit-html";

export function get(themePreference: themePreference) {
  return themePreference;
}


export function createLitElement(litTemplate: TemplateResult<1>) {
  if (browser) {
    const newElement = document.createElement('div');

    render(litTemplate, newElement);

    return newElement;
  } else return null

}

export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export async function checkInstalledApps() {
  const checkEcom = await fetch(
    "/get-installed-apps",
    {
      method: "POST"
    }
  )

  const ecomResp = await checkEcom.json();

  return ecomResp;
}
