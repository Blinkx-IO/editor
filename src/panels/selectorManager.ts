import { setThemeClass } from "$components/utilities/themePreferences";
import { get, html } from "@utilities/utilities";
import type { EditorTheme } from "../editor";

// Define a proper interface for the selector template config
interface SelectorTemplateConfig {
  labelInfo: string;
  labelHead: string;
  iconSync: string;
  iconAdd: string;
  themePreference?: themePreference;
  theme?: EditorTheme;
}

//TODO: Add proper typings for this
export const defaultSelectorTemplate = (config: SelectorTemplateConfig) => {
  const { labelInfo, labelHead, iconSync, iconAdd, themePreference = 'light' } = config;
  let pfx = 'blink-clm-';
  let ppfx = 'blink-';
  //console.log('before',pfx,ppfx)
  pfx = 'blink-clm-';
  ppfx = 'blink-';
  //console.log('after',pfx,ppfx)
  //!adjust the state of this here
  //TODP add autocomplete on classes
  return html`
    <div class="${pfx}sels-info flex items-center ${setThemeClass('bg-monochromatic-gray', 'dark:bg-primary-bg-darkmode', get(themePreference))}  mt-0  border-b border-t px-1 py-3 border-gray-300">
      <div class="${pfx}label-sel pl-2 text-base ${setThemeClass('text-black', 'dark:text-white', get(themePreference))}">${labelInfo}:</div>
      <div class="${pfx}sels text-base ${setThemeClass('text-black', 'dark:text-white', get(themePreference))}" data-selected></div>
      <div style="clear:both"></div> 
    </div>
    <div id="${pfx}up" class="${pfx}header">
      <div id="${pfx}label" class="${pfx}header-label ${setThemeClass('text-black', 'dark:text-white', get(themePreference))}">${labelHead}</div>
      <div id="${pfx}status-c" class="${pfx}header-status">
        <span id="${pfx}input-c" data-states-c>
          <div class="${ppfx}field ${ppfx}select">
            <span id="${ppfx}input-holder">
              <select class="cursor-pointer ${setThemeClass('bg-white text-black', 'dark:bg-formfields-darkmode dark:text-white', get(themePreference))}" id="${pfx}states" data-states></select>
            </span>
            <div class="${ppfx}sel-arrow">
              <div class="${ppfx}d-s-arrow"></div>
            </div>
          </div>
        </span>
      </div>
    </div>
    <div id="${pfx}tags-field" class="${ppfx}field">
      <div id="${pfx}tags-c" data-selectors></div>
      <input class="rounded-lg border ${setThemeClass('bg-white text-black', 'dark:text-white dark:bg-formfields-darkmode', get(themePreference))}" id="${pfx}new" data-input/>
      <span id="${pfx}add-tag" class="${pfx}tags-btn ${pfx}tags-btn__add ${setThemeClass('text-black', 'dark:text-white', get(themePreference))}" data-add>
        ${iconAdd}
      </span>
      <span class="${pfx}tags-btn ${pfx}tags-btn__sync" style="display: none" data-sync-style>
        ${iconSync}
      </span>
    </div>
    `;
}

