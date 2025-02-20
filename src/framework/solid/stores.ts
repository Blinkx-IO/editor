import { ItemMappingStatus } from "@/global";
import type { Component } from "grapesjs";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

// Create signals for simple values
const [selectedComponent, setSelectedComponent] = createSignal<Component | undefined>(undefined);
const [itemMappingState, setItemMappingState] = createSignal<ItemMappingStatus>();
const [themePreference, setThemePreference] = createSignal<themePreference>("dark");
const [currentSettingsPage, setCurrentSettingsPage] = createSignal<settingsPages>("account");
const [contentTitle, setContentTitle] = createSignal<string>("");
const [contentStatus, setContentStatus] = createSignal<VisualEditor.status>();

// Export both getters and setters
export {
	selectedComponent,
	setSelectedComponent,
	itemMappingState,
	setItemMappingState,
	themePreference,
	setThemePreference,
	currentSettingsPage,
	setCurrentSettingsPage,
	contentTitle,
	setContentTitle,
	contentStatus,
	setContentStatus
};
//TODO: Consider binding store to a Context Provider wrapped around the editor
// If you need store-like behavior with nested reactivity, you can also use createStore
const [state, setState] = createStore({
	selectedComponent: undefined as Component | undefined,
	itemMappingState: undefined as ItemMappingStatus | undefined,
	themePreference: "dark" as themePreference,
	currentSettingsPage: "account" as settingsPages,
	contentTitle: "",
	contentStatus: undefined as VisualEditor.status | undefined
});

// Export store version if needed
export { state, setState };


