/* @refresh reload */
import { render } from 'solid-js/web';
import { configureEditor } from "@/editor";
import { onMount } from 'solid-js';
import type monaco from "monaco-editor";
import type { editor as monacoEditor } from "monaco-editor";
import "./../../../index.css";
import "./../../../editor.css";

import "./../../../npgrogress.css";
import { ItemMappingStatus } from "@/global";

import Editor from "./editor";

let sectionWrap: HTMLElement;
let bottomCodePanel: HTMLElement;

let codeEditor: monaco.editor.IStandaloneCodeEditor;
let monacoEditorRef: typeof monacoEditor;
let Monaco: any;
let editor: VisualEditor.BlinkEditor;
export let showCodeEditor = false;
export let loaded = false;

let selectedLanguage: codeLanguageOptions = "json";



const data: {
	item: VisualEditor.ProjectData;
} = {
	item: {
		id: "1",
		project: "test",
		projectName: "test",
		title: "test",
		status: "draft",
		urlPath: "/",
		body: {
			"blink-components": "",
			"blink-styles": [],
			"blink-assets": [],
		},
		seoToolkit: {
			siteTitle: "",
			siteDescription: "",
			favicon: "",
			metaImage: "",
			keywords: "",
			author: "",
		},
	},
};

let projectData = {
	pages: [
		{
			component:
				data.item.body?.["blink-components"] ??
				"",
			styles: data.item.body?.["blink-styles"] ?? [],
		},
	],
	assets: data.item.body?.["blink-assets"] ?? [],
};

function App() {
	// onMount(() => {
	// 	configureEditor({
	// 		projectId: '2',
	// 		projectName: 'test',
	// 		itemTitle: 'test',
	// 		itemId: '1',
	// 		themePreference: 'dark',
	// 		itemStatus: 'draft',
	// 		itemMappingState: 'active',
	// 	});
	// });
	return (
		<Editor />
	)
}
export default App;
