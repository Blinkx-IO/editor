import { Component, createSignal, createEffect, onMount, onCleanup, Show, For, on } from "solid-js";
import type monaco from "monaco-editor";
import type { editor as monacoEditor } from "monaco-editor";
// import { createStore } from "solid-js/store";

import { transformJSX } from "@plugins/codeParsers/jsxParserLegacy";
import type { Component as EditorComponent, Components, StyleProps } from "grapesjs";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

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
interface CodeEditorProps {
	selectedLanguage?: codeLanguageOptions;
	defaultEditorValues?: string;
	bottomCodePanel: HTMLElement | undefined;
	experimentalModels?: boolean;
	visualEditor: VisualEditor.BlinkEditor | undefined;
	selectedComponent?: any; // Replace with proper type
	onClose: () => void;
}

const CodeEditor: Component<CodeEditorProps> = (props) => {
	const [selectedLanguage, setSelectedLanguage] = createSignal<codeLanguageOptions>(props.selectedLanguage || "javascript");
	const [expanded, setExpanded] = createSignal(false);
	const [isResizing, setIsResizing] = createSignal(false);
	const [experimentalModels, setExperimentalModels] = createSignal(false);
	const [startY, setStartY] = createSignal(0);
	const [startHeight, setStartHeight] = createSignal(0);
	const [editor, setEditor] = createSignal<monaco.editor.IStandaloneCodeEditor>();
	const [Monaco, setMonaco] = createSignal<typeof monaco>();
	const [monacoEditorRef, setMonacoEditorRef] = createSignal<typeof monacoEditor>();
	const [currentModelUri, setCurrentModelUri] = createSignal<string>();
	const [selectedComponent, setSelectedComponent] = createSignal<EditorComponent | undefined>(undefined);
	let container: HTMLElement;
	let resizeHandle: HTMLElement;

	//TODO : review these
	const [models, setModels] = createSignal<Map<string, monaco.editor.ITextModel>>(new Map());
	const [domComponents, setDomComponents] = createSignal<Map<string, EditorComponent>>(new Map());

	const defaultCssEditorMessage = "/*No component selected in the editor*/";
	const defaultJsEditorMessage = "//No component selected in the editor";
	const defaultComponentScript = `/**
*@type{HTMLElement}
*/
const el = this;`;

	function convertStyleRecordToString(styleRecord: StyleProps) {
		const mappedStyles = Object.entries(styleRecord).reduce(
			(acc, [key, value]) => {
				return `${acc}${key}:${value};`;
			},
			"",
		);

		return `#${selectedComponent()?.getId()} {${mappedStyles}}`;
	}
	function convertStringToStyleRecord(cssString: string): StyleProps {
		// Assuming the cssString format is "#componentId {key:value;key:value;}"
		// Remove the component ID and braces to only get "key:value;key:value;"
		const styleString = cssString.replace(/#.*\{|\}/g, "").trim();

		// Split the string by ";" to get individual "key:value" pairs
		const stylePairs = styleString.split(";").filter(Boolean); // Filter out any empty strings

		// Convert each "key:value" pair back into an object property
		const styleRecord: StyleProps = stylePairs.reduce(
			(acc, pair) => {
				const [key, value] = pair
					.split(":")
					.map((part) => part.trim());
				acc[key] = value;
				return acc;
			},
			{} as StyleProps,
		);

		return styleRecord;
	}
	function setComponentCSS(component: EditorComponent | undefined) {
		if (component) {
			if (component.getName() == "Body") {
				models().get("componentCss")?.setValue(
					defaultCssEditorMessage,
				);
			} else {
				models().get("componentCss")?.setValue(
					convertStyleRecordToString(
						component.getStyle(),
					) ?? `#${component.getId()} {}`,
				);
			}
		} else {
			models().get("componentCss")?.setValue(
				`#${selectedComponent()?.getId()} {}`,
			);
		}
		editor()!.getAction("editor.action.formatDocument")?.run();
	}

	function setComponentJs(component: EditorComponent | undefined) {
		if (component) {
			if (component.getName() == "Body") {
				models().get("javascript")?.setValue(
					defaultJsEditorMessage,
				);
			} else {
				if (component.getScriptString().trim() === "") {
					models().get("javascript")?.setValue(
						defaultComponentScript,
					);
				} else {
					models().get("javascript")?.setValue(
						component.getScriptString() ??
						defaultComponentScript,
					);
				}
			}
		} else {
			models().get("javascript")?.setValue(
				defaultJsEditorMessage,
			);
		}
	}
	function setEditorValue(lang: codeLanguageOptions) {
		if (!props.visualEditor) {
			console.warn('Visual Editor not found')
			return;
		}
		let value: string = "";
		if (lang == "json") {
			//TODO see if theres a better way to do this
			value = JSON.stringify(
				props.visualEditor.getComponents().toJSON(),
			).replaceAll(`"style":"",`, "");
		}

		if (lang == "html") {
			value = props.visualEditor.getHtml();
		}

		if (lang == "css") {
			value = props.visualEditor.getCss() ?? "";
		}

		if (lang == "componentCss") {
			if (selectedComponent()) {
				value = convertStyleRecordToString(
					selectedComponent()!.getStyle(),
				);
			}
		}

		if (lang == "javascript") {
			//const selectedComp =visualEditor.getSelected();
			if (selectedComponent()) {
				if (
					selectedComponent()!
						.getScriptString()
						.trim() === ""
				) {
					value = defaultComponentScript;
				}
				value =
					selectedComponent()!.getScriptString() ??
					defaultComponentScript;
			} else {
				value = defaultJsEditorMessage;
			}
		}

		return value;
	}

	function initModel(lang: codeLanguageOptions) {
		let modelContent = setEditorValue(lang);
		let modelUri = Monaco()!.Uri.parse(`inmemory://blink/${lang}`);
		let targetLang = lang;
		if (lang == "componentCss") {
			targetLang = "css";
		}
		let newModel = Monaco()!.editor.createModel(
			modelContent!,
			targetLang,
			modelUri,
		);
		models().set(lang, newModel);
		editor()!.setModel(newModel);
	}

	function toggleCodeEditorLanguage(lang: codeLanguageOptions, component = null) {
		setSelectedLanguage(lang);
		/*console.log(
			'Before model switch:',
			Monaco.editor.getModels().map((model) => model.uri.toString())
		);*/

		let targetLanguage = lang === "jsx" ? "javascript" : lang; // Simplify handling of JSX

		// Construct a unique URI for the model based on the language
		// Ensuring unique URIs for each language model might help avoid conflicts
		let modelUri = Monaco()!.Uri.parse(
			`inmemory://blink/${targetLanguage}`,
		); //${Date.now()}); // Added a timestamp for uniqueness

		let existingModel = models().get(targetLanguage); // Try to get existing model from our map

		if (!existingModel) {
			// If no model exists for this language, create a new model
			let modelContent = setEditorValue(targetLanguage);
			let languageType = targetLanguage;
			if (lang === "componentCss") {
				languageType = "css";
			}
			let newModel = Monaco()!.editor.createModel(
				modelContent!,
				languageType,
				modelUri,
			);
			models().set(targetLanguage, newModel); // Track the new model

			// Switch the editor to use the new model for the selected language
			editor()!.setModel(newModel);
		} else {
			// If the model exists, switch to it without creating a new one
			//!Consider making each components JS have its own model like a file system
			if (lang == "javascript") {
				//const selectedComp =visualEditor.getSelected();
				if (selectedComponent()) {
					existingModel.setValue(
						selectedComponent()!.getScriptString() ??
						"",
					);
				}
			}

			if (lang == "componentCss") {
				if (selectedComponent()) {
					existingModel.setValue(
						convertStyleRecordToString(
							selectedComponent()!.getStyle(),
						),
					);
				}
			}

			editor()!.setModel(existingModel);
			//check for comp
		}

		// Optionally, consider moving the format document action out of this function to control when formatting happens more granularly
		setTimeout(() => {
			editor()!.getAction("editor.action.formatDocument")?.run();
		}, 100);

		/*console.log(
			'After model switch:',
			Monaco.editor.getModels().map((model) => model.uri.toString())
		);*/
	}
	function toggleCodeEditor() {
		const editCodebutton = props.visualEditor!.Panels.getButton(
			"edit-actions",
			"edit-code",
		);
		if (editCodebutton) {
			editCodebutton.set("active", false);
		}
		const gridButton = props.visualEditor!.Panels.getButton(
			"edit-actions",
			"visibility",
		);

		if (gridButton) {
			gridButton.set("active", true);
		}
		props.onClose();
	}
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
		props.bottomCodePanel!.style.height = `${newHeight}px`;
		editor()!.layout();
	};
	function expandCodeEditor() {
		if (!expanded()) {
			container.style.height = "90vh";
			setExpanded(true);
			editor()!.layout();
		} else {
			container.style.height = "400px";
			setExpanded(false);

			editor()!.layout();
		}
	}
	function saveEditedCode() {
		if (selectedLanguage() == "html") {
			return;
		}

		let editorValues = editor()!.getValue();
		//console.log('selected language',selectedLanguage)

		//?Experimental try sending this to the server
		if (selectedLanguage() == "jsx" && experimentalModels()) {
			const newComp = props.visualEditor!.renderJSX(editorValues);
			//console.log(newComp)

			//visualEditor.addComponents(newComp);
			const parsedComps = transformJSX(props.visualEditor!, newComp);
			props.visualEditor!.addComponents(parsedComps);
			return;
		}

		const model = editor()!.getModel();
		//console.log('model', model,selectedLanguage);
		const errors = monacoEditorRef()!
			.getModelMarkers({ resource: model!.uri })
			.filter(
				(marker) =>
					marker.severity ===
					Monaco()!.MarkerSeverity.Error,
			);

		if (errors.length > 0) {
			console.error("Syntax errors detected:", errors);
			alert(
				`Syntax errors detected, please fix them before saving : ${errors.map((error) => error.message).join(", ")} on line ${errors[0].startLineNumber}`,
			);
			return;
		}

		//check for errors first?
		//editor.getValue

		if (selectedLanguage() == "json") {
			try {
				//try to json parse first
				const parsedJson = JSON.parse(editorValues);
				const editorCss = props.visualEditor!.getCss();
				//const currentCss = filterAllCSS().join(" ");
				props.visualEditor!.Css.clear();
				props.visualEditor!.Css.addRules(editorCss ?? "");

				props.visualEditor!.setComponents(parsedJson);
				//console.log('saved json edits');
			} catch (error) {
				console.warn(
					`Invalid ${selectedLanguage} code: ${error}`,
				);
				alert(
					`Invalid ${selectedLanguage} code: ${error}`,
				);
			}
		}

		if (selectedLanguage() == "css") {
			const editorCss = editorValues;
			/*console.log('editorCss', editorCss);
			if (!editorCss) {
				alert('Invalid CSS code');
				return;
			}*/

			props.visualEditor!.Css.clear();
			props.visualEditor!.Css.addRules(editorCss);
			props.visualEditor!.store();
		}

		if (selectedLanguage() == "javascript") {
			//console.log($selectedComponent);
			if (selectedComponent()) {
				selectedComponent()!.set({
					script: editorValues,
				});
			}
		}

		if (selectedLanguage() == "componentCss") {
			if (selectedComponent()) {
				selectedComponent()!.setStyle(
					convertStringToStyleRecord(
						editorValues,
					),
				);
			}
		}
	}
	const handleMouseUp = () => {
		setIsResizing(false);
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
	};

	// Initialize Monaco Editor
	onMount(async () => {
		props.visualEditor?.on("component:selected", (component) => {
			console.log('component selected', component);
			setSelectedComponent(component);
		});
		// Monaco environment setup
		self.MonacoEnvironment = {
			getWorker: function(_moduleId: any, label: string) {
				if (label === "json") {
					return new jsonWorker();
				}
				if (
					label === "css" ||
					label === "scss" ||
					label === "less"
				) {
					return new cssWorker();
				}
				if (
					label === "html" ||
					label === "handlebars" ||
					label === "razor"
				) {
					return new htmlWorker();
				}
				if (
					label === "typescript" ||
					label === "javascript"
				) {
					return new tsWorker();
				}
				return new editorWorker();
			},
		};

		const monacoInstance = await import("monaco-editor");
		setMonaco(monacoInstance);
		setMonacoEditorRef(monacoInstance.editor);

		// Define theme
		monacoInstance.editor.defineTheme("blinkTheme", {
			base: "vs-dark", // You can base it on 'vs', 'vs-dark', or 'hc-black'
			inherit: true, // Inherits the base theme settings
			rules: [
				{
					token: "identifier",
					foreground: "#72A5D2",
				},
				{
					token: "keyword",
					foreground: "#AF7AC4",
				},
				{
					token: "constant",
					foreground: "7E6546",
				},
				{
					token: "variable",
					foreground: "#7E6546",
				},
				{
					token: "variable.predefined",
					foreground: "#7E6546",
				},
				{
					token: "variable.parameter",
					foreground: "#7E6546",
				},
				{
					token: "identifier.function",
					foreground: "DCDCAA",
				},
				{
					token: "type",
					foreground: "1AAFB0",
				},
			],
			colors: {
				"editor.foreground": "#ededed",
				//'editorSuggestWidget.background': '#000000',
				//'editorSuggestWidget.border': '#ccc',
				"editorSuggestWidget.foreground":
					"#ededed", // Customize the font color here
				"editorSuggestWidget.highlightForeground":
					"#ededed",
				"editorSuggestWidget.selectedBackground":
					"#000000",
				//'editorCodeLens.foreground' : '#000000',
				//'editor.background'
			},
		});

		// Create editor
		const editorInstance = monacoInstance.editor.create(container!, {
			value: setEditorValue(selectedLanguage()),
			language: selectedLanguage() ?? "javascript",
			theme: "blinkTheme",
			fontSize: 24,
		});
		editorInstance.onDidChangeModelContent((event) => {
			const newModelUri = editor()!
				.getModel()
				?.uri.toString();
			//console.log('Model URI:', newModelUri, currentModelUri);
			if (newModelUri !== currentModelUri()) {
				//console.log('Model has changed, likely a toggle between file types.');
				// Update currentModelUri to the new model
				setCurrentModelUri(newModelUri);
				// currentModelUri = newModelUri;
			} else {
				console.log('Content has changed within the same model.');
				// Handle actual content change
			}
		});

		setEditor(editorInstance);
		initModel(selectedLanguage());

		// Setup event listeners and other initializations
		//TODO: mark this only on selected component change
		createEffect(on(selectedComponent, () => {
			setComponentJs(selectedComponent());
			setComponentCSS(selectedComponent());
		}));

		// if (props.visualEditor!.getSelected()) {
		// 	selectedComponent()!.set(
		// 		props.visualEditor!.getSelected(),
		// 	);
		// }
		if (selectedLanguage() == "javascript") {
			//console.log(visualEditor.getSelected())
			if (props.visualEditor!.getSelected()) {
				setComponentJs(
					props.visualEditor!.getSelected(),
				);
			}
		}
		//?Do something similar for indiviudal CSS
		//visualEditor.getComponents().map;
		editor()!.addCommand(
			Monaco()!.KeyMod.CtrlCmd | Monaco()!.KeyCode.KeyS,
			function(event) {
				saveEditedCode();
			},
		);
		setTimeout(() => {
			editor()!.getAction(
				"editor.action.formatDocument",
			)?.run();
		}, 100);

		props.visualEditor!.Keymaps.add(
			"bx:code-editor",
			"ctrl+s",
			(e) => {
				saveEditedCode();
			},
			{
				prevent: true,
			},
		);
	});

	// Cleanup
	onCleanup(() => {
		editor()?.dispose();
		models().forEach((model) => model.dispose());
		setModels(new Map());
		props.visualEditor!.Keymaps.remove("bx:code-editor");
		props.visualEditor?.off("component:selected", (component) => {
			console.log('component selected removing event', component);
			setSelectedComponent(component);
		});
	});

	return (
		<>
			<style>{styles}</style>
			<div
				style="background: #181818;"
				class="code-header flex justify-between w-full py-2 px-5"
			>
				<div id="code-options">
					<div class="mx-auto flex dark:text-white items-center">
						<p class="capitalize mr-2 font-bold">
							<Show when={["javascript", "componentCss"].includes(selectedLanguage())}
								fallback={selectedLanguage()}
							>
								{`${selectedComponent()?.getName()} Id : ${selectedComponent()?.getId() ?? ""}`}
								{selectedLanguage() == "javascript" ? "Javascript" : "CSS"}
								<Show when={experimentalModels()}>
									<select>
										<For each={Array.from(domComponents())}>
											{(component) => <option value={component[1].getId()}>{component[1].getName()}</option>}
										</For>
									</select>
								</Show>
							</Show>


						</p>
						<button
							on:click={() =>
								toggleCodeEditorLanguage("json")}
							data-code-button="json"
							id="loadJson"
							type="button"
							class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				
				{selectedLanguage == 'json' ? 'border-gray-200 border-b' : ''}
				 
				hover:border-gray-400 hover:border-b"
						>
							Edit JSON
						</button>

						<button
							on:click={() => toggleCodeEditorLanguage("css")}
							id="loadCSS"
							data-code-button="css"
							type="button"
							class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				{selectedLanguage == 'css' ? 'border-gray-200 border-b' : ''} 
				hover:border-gray-400 hover:border-b"
						>
							Edit CSS
						</button>
						<button
							on:click={() =>
								toggleCodeEditorLanguage("html")}
							id="loadHTML"
							data-code-button="html"
							type="button"
							class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				{selectedLanguage == 'html' ? 'border-gray-200 border-b' : ''}  
				hover:border-gray-400 hover:border-b"
						>
							View HTML
						</button>
						<div class="flex items-center">
							<button
								on:click={() =>
									toggleCodeEditorLanguage(
										"javascript",
									)}
								type="button"
								class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				{selectedLanguage == 'javascript' ? 'border-gray-200 border-b' : ''}  
				hover:border-gray-400 hover:border-b"
							>
								Edit {selectedComponent()?.getName() ??
									"Select A Component"} JS
							</button>
							<button class="cursor-pointer" type="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
									/>
								</svg>
							</button>
						</div>
						<div class="flex items-center">
							<button
								on:click={() =>
									toggleCodeEditorLanguage(
										"componentCss",
									)}
								type="button"
								class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				{selectedLanguage == 'componentCss' ? 'border-gray-200 border-b' : ''}  
				hover:border-gray-400 hover:border-b"
							>
								Edit {selectedComponent()?.getName() ??
									"Select A Component"} CSS
							</button>
							<button class="cursor-pointer" type="button">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
									/>
								</svg>
							</button>
						</div>

						<Show when={experimentalModels()}>
							<button
								on:click={() =>
									toggleCodeEditorLanguage("jsx")}
								id="importReact"
								data-code-button="javascript"
								type="button"
								class="mx-2 items-center px-2 py-1 text-xs font-medium text-gray-200
				{selectedLanguage == 'jsx' ? 'border-gray-200 border-b' : ''} 
				hover:border-gray-400 hover:border-b"
							>
								Import JSX
							</button>
						</Show>
					</div>
				</div>
				<div class="flex gap-2 items-center">
					<Show when={["json", "css", "javascript", "componentCss"].includes(selectedLanguage())}>
						<button on:click={saveEditedCode} class="text-white"
						>Save</button
						>
					</Show>
					<button on:click={expandCodeEditor} class="hover:opacity-70">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="h-6 w-6 cursor-pointer text-white"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
							/>
						</svg>
					</button>
					<button on:click={toggleCodeEditor}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 mr-9 cursor-pointer close-slider text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
			<slot>
				<div
					ref={(el) => container = el}
					class="editor-container"
					style="position: relative;"
				></div>
			</slot>
			<div class="resize-handle hidden" ref={(el) => resizeHandle = el}></div>

		</>);
};

export default CodeEditor;


