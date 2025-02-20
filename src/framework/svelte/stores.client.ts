import { ItemMappingStatus } from "@/global";
import type { Component } from "grapesjs";
import { type Writable, writable } from "svelte/store";
export const selectedComponent = writable<Component | undefined>();

export const itemMappingState = writable<ItemMappingStatus>();

export const themePreference: Writable<themePreference> = writable("dark");
export const currentSettingsPage: Writable<settingsPages> = writable("account");
export const contentTitle: Writable<string> = writable();
export const contentStatus: Writable<VisualEditor.status> = writable();


