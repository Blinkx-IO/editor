import { Component, createSignal, createEffect, onMount, onCleanup } from "solid-js";
import type monaco from "monaco-editor";
import type { editor as monacoEditor } from "monaco-editor";
import { createStore } from "solid-js/store";

// Import workers
const editorWorker = new URL('monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url);
const jsonWorker = new URL('monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url);
const cssWorker = new URL('monaco-editor/esm/vs/language/css/css.worker.js', import.meta.url);
const htmlWorker = new URL('monaco-editor/esm/vs/language/html/html.worker.js', import.meta.url);
const tsWorker = new URL('monaco-editor/esm/vs/language/typescript/ts.worker.js', import.meta.url);

import { transformJSX } from "@plugins/codeParsers/jsxParserLegacy";
import type { Component as GrapesComponent, Components, StyleProps } from "grapesjs";

interface CodeEditorProps {
	selectedLanguage?: codeLanguageOptions;
	defaultEditorValues?: string;
	bottomCodePanel: HTMLElement | undefined;
	experimentalModels?: boolean;
	visualEditor: VisualEditor.BlinkEditor | undefined;
	selectedComponent?: any; // Replace with proper type
}

const CodeEditor: Component<CodeEditorProps> = (props) => {
	const [selectedLanguage, setSelectedLanguage] = createSignal<codeLanguageOptions>(props.selectedLanguage || "javascript");
	const [expanded, setExpanded] = createSignal(false);
	const [isResizing, setIsResizing] = createSignal(false);
	const [startY, setStartY] = createSignal(0);
	const [startHeight, setStartHeight] = createSignal(0);
	const [editor, setEditor] = createSignal<monaco.editor.IStandaloneCodeEditor>();
	const [Monaco, setMonaco] = createSignal<typeof monaco>();
	const [monacoEditorRef, setMonacoEditorRef] = createSignal<typeof monacoEditor>();
	const [currentModelUri, setCurrentModelUri] = createSignal<string>();
	let container: HTMLElement;
	let resizeHandle: HTMLElement;

	//TODO : review these
	const [models, setModels] = createStore<Map<string, monaco.editor.ITextModel>>(new Map());
	const [domComponents, setDomComponents] = createStore<Map<string, GrapesComponent>>(new Map());

	const defaultCssEditorMessage = "/*No component selected in the editor*/";
	const defaultJsEditorMessage = "//No component selected in the editor";
	const defaultComponentScript = `/**
    *@type{HTMLElement}
    */
    const el = this;`;

	// Convert functions to Solid.js style
	const setEditorValue = (lang: codeLanguageOptions) => {
		let value: string = "";
		if (lang == "json") {
			value = JSON.stringify(
				props.visualEditor.getComponents().toJSON()
			).replaceAll(`"style":"",`, "");
		}

		if (lang == "html") {
			value = props.visualEditor.getHtml();
		}

		if (lang == "css") {
			value = props.visualEditor.getCss() ?? "";
		}

		if (lang == "componentCss") {
			if (props.selectedComponent) {
				value = convertStyleRecordToString(
					props.selectedComponent.getStyle()
				);
			}
		}

		if (lang == "javascript") {
			if (props.selectedComponent) {
				if (props.selectedComponent.getScriptString().trim() === "") {
					value = defaultComponentScript;
				}
				value = props.selectedComponent.getScriptString() ?? defaultComponentScript;
			} else {
				value = defaultJsEditorMessage;
			}
		}

		return value;
	};

	const initModel = (lang: codeLanguageOptions) => {
		const modelContent = setEditorValue(lang);
		const modelUri = Monaco().Uri.parse(`inmemory://blink/${lang}`);
		const targetLang = lang === "componentCss" ? "css" : lang;

		const newModel = Monaco().editor.createModel(
			modelContent,
			targetLang,
			modelUri
		);

		setModels(new Map(models).set(lang, newModel));
		editor().setModel(newModel);
	};

	// Convert event handlers
	const handleMouseDown = (event: MouseEvent) => {
		setIsResizing(true);
		setStartY(event.clientY);
		setStartHeight(container.offsetHeight);

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		event.preventDefault();
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizing()) return;
		const heightDiff = event.clientY - startY();
		let newHeight = startHeight() - heightDiff;
		newHeight = Math.max(newHeight, 100);
		newHeight = Math.min(
			newHeight,
			window.innerHeight - container.getBoundingClientRect().top
		);

		container.style.height = `${newHeight}px`;
		props.bottomCodePanel.style.height = `${newHeight}px`;
		editor().layout();
	};

	const handleMouseUp = () => {
		setIsResizing(false);
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	};

	// Initialize Monaco Editor
	onMount(async () => {
		// Monaco environment setup
		self.MonacoEnvironment = {
			getWorker: (_moduleId: any, label: string) => {
				if (label === "json") return new Worker(jsonWorker, { type: 'module' });
				if (label === "css" || label === "scss" || label === "less")
					return new Worker(cssWorker, { type: 'module' });
				if (label === "html" || label === "handlebars" || label === "razor")
					return new Worker(htmlWorker, { type: 'module' });
				if (label === "typescript" || label === "javascript")
					return new Worker(tsWorker, { type: 'module' });
				return new Worker(editorWorker, { type: 'module' });
			},
		};

		const monacoInstance = await import("monaco-editor");
		setMonaco(monacoInstance);
		setMonacoEditorRef(monacoInstance.editor);

		// Define theme
		monacoInstance.editor.defineTheme("blinkTheme", {
			base: "vs-dark",
			inherit: true,
			rules: [
				{ token: "identifier", foreground: "#72A5D2" },
				{ token: "keyword", foreground: "#AF7AC4" },
				// ... other rules
			],
			colors: {
				"editor.foreground": "#ededed",
				"editorSuggestWidget.foreground": "#ededed",
				"editorSuggestWidget.highlightForeground": "#ededed",
				"editorSuggestWidget.selectedBackground": "#000000",
			},
		});

		// Create editor
		const editorInstance = monacoInstance.editor.create(container!, {
			value: setEditorValue(selectedLanguage()),
			language: selectedLanguage() ?? "javascript",
			theme: "blinkTheme",
			fontSize: 24,
		});

		setEditor(editorInstance);
		initModel(selectedLanguage());

		// Setup event listeners and other initializations
		createEffect(() => {
			if (props.selectedComponent) {
				setComponentJs(props.selectedComponent);
				setComponentCSS(props.selectedComponent);
			}
		});
	});

	// Cleanup
	onCleanup(() => {
		editor()?.dispose();
		models.forEach((model) => model.dispose());
		setModels(new Map());
		props.visualEditor.Keymaps.remove("bx:code-editor");
	});

	return (
		<>
			<div
				style="background: #181818;"
				class="code-header flex justify-between w-full py-2 px-5"
			>
				{/* Header content */}
			</div>
			<div
				ref={(el) => container = el}
				class="editor-container"
				style="position: relative;"
			/>
			<div class="resize-handle hidden" ref={(el) => resizeHandle = el} />
		</>
	);
};

export default CodeEditor;

// Add necessary styles
const styles = `
  .editor-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 400px;
  }
  .resize-handle {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 10px;
    cursor: ns-resize;
    background-color: #ccc;
  }
`;
