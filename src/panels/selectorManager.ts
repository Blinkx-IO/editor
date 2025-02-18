import { setThemeClass } from "$components/utilities/themePreferences";
import {themePreference} from '$stores/theme';
import { get } from 'svelte/store';
export const defaultSelectorTemplate =({ labelInfo, labelHead, iconSync, iconAdd, pfx, ppfx }:any) =>{
    //console.log('before',pfx,ppfx)
    pfx = 'blink-clm-';
    ppfx = 'blink-';
    //console.log('after',pfx,ppfx)
    //!adjust the state of this here
    //TODP add autocomplete on classes
    return /*html*/`
    <div class="${pfx}sels-info flex items-center ${setThemeClass('bg-monochromatic-gray','dark:bg-primary-bg-darkmode',get(themePreference))}  mt-0  border-b border-t px-1 py-3 border-gray-300">
      <div class="${pfx}label-sel text-base ${setThemeClass('','dark:text-white',get(themePreference))}">${labelInfo}:</div>
      <div class="${pfx}sels text-base ${setThemeClass('','dark:text-white',get(themePreference))}" data-selected></div>
      <div style="clear:both"></div> 
    </div>
    <div id="${pfx}up" class="${pfx}header">
      <div id="${pfx}label" class="${pfx}header-label ${setThemeClass('','dark:text-white',get(themePreference))}">${labelHead}</div>
      <div id="${pfx}status-c" class="${pfx}header-status">
        <span id="${pfx}input-c" data-states-c>
          <div class="${ppfx}field ${ppfx}select">
            <span id="${ppfx}input-holder">
              <select class="cursor-pointer ${setThemeClass('','dark:bg-formfields-darkmode dark:text-white',get(themePreference))}" id="${pfx}states" data-states></select>
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
      <input class="rounded-lg border ${setThemeClass('bg-monochromatic-gray','dark:text-white dark:bg-formfields-darkmode',get(themePreference))}" id="${pfx}new" data-input/>
      <span id="${pfx}add-tag" class="${pfx}tags-btn ${pfx}tags-btn__add ${setThemeClass('','dark:text-white',get(themePreference))}" data-add>
        ${iconAdd}
      </span>
      <span class="${pfx}tags-btn ${pfx}tags-btn__sync" style="display: none" data-sync-style>
        ${iconSync}
      </span>
    </div>
    `;
  }
   