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


/**
 * I'm literally using this for NEOVIM html syntax highlighting
 * Simple template literal tag function that returns the processed string
 * @param strings - Array of string literals
 * @param values - Array of interpolated values
 * @returns Processed template string
 */
export function html(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return result + str + value;
  }, '');
}

/**
 * HTML template literal tag function with basic escaping
 * @param strings - Array of string literals
 * @param values - Array of interpolated values
 * @returns Processed and escaped template string
 */
function htmlAdv(strings: TemplateStringsArray, ...values: any[]): string {
  const escape = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  return strings.reduce((result, str, i) => {
    let value = values[i] || '';
    // Don't escape if the value is explicitly marked as safe HTML
    if (typeof value === 'string' && !value.startsWith('<!--safe-->')) {
      value = escape(value.toString());
    } else if (typeof value === 'string') {
      // Remove the safe HTML marker
      value = value.replace('<!--safe-->', '');
    }
    return result + str + value;
  }, '');
}

// Helper to mark HTML strings as safe (no escaping needed)
function safe(html: string): string {
  return `<!--safe-->${html}`;
}
