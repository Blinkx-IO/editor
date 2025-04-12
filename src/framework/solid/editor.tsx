import { Component, createEffect, createSignal, onMount, Show } from 'solid-js';
import { configureEditor } from "@/editor";
// import type monaco from "monaco-editor";
// import type { editor as monacoEditor } from "monaco-editor";
import type { ProjectData } from "../../global";
import { setSelectedComponent, themePreference, setThemePreference } from "@framework/solid/stores";
import { setThemeClass } from "@/components/utilities/themePreferences";
// Import converted Solid components
import Title from "./Title";
import Status from "./Status";
import DataTableLayout from "./DataTableLayout";
import CodeEditor from "./CodeEditor";
import { createStore } from "solid-js/store";
type CssModeTheming = { dark: string, light: string };
type EditorTheme = {
	primaryBackgroundColor: CssModeTheming
	primaryBorderColor: CssModeTheming
	primaryTextColor: CssModeTheming
}
export interface EditorProps {
	/** The data for the editor's page ie first page to view  if nothing is passed it will default to a blank canvas to start editing with */
	item?: ProjectData;
	/** The data for the editor's pages anything after the first page */
	pages?: Array<ProjectData>
	/** Defaults to fixed**/
	cssPosition?: "fixed" | "absolute";
	replaceLogo?: Component<{}>;
	logoLink?: string;
	/**Theme preference for the editor defaults to system*/
	themePreference?: themePreference;
	theme?: Partial<EditorTheme>;
	/**Debug mode enabled**/
	dev?: boolean;
	/**Callback function to get the editor instance when it's initialized**/
	onEditorInit?: (editor: VisualEditor.BlinkEditor) => void;
}

const leftPanelEvents = ["show-blocks", "show-pages", "show-layers"] as const;

const defaultTheme: EditorTheme = {
	primaryBackgroundColor: {
		dark: "bg-nav-darkmode",
		light: "bg-primary-light-gray"
	},
	primaryBorderColor: {
		light: "border-gray-300",
		dark: "border-muted"
	},
	primaryTextColor: {
		light: "text-black",
		dark: "text-white"
	}
}

function Editor(props: EditorProps) {
	const [showCodeEditor, setShowCodeEditor] = createSignal(false);
	// const [loaded, setLoaded] = createSignal(false);
	const [selectedLanguage, setSelectedLanguage] = createSignal<codeLanguageOptions>("json");
	const [editor, setEditor] = createSignal<VisualEditor.BlinkEditor>();
	// const [codeEditor, setCodeEditor] = createSignal<monaco.editor.IStandaloneCodeEditor>();
	// const [monacoEditorRef, setMonacoEditorRef] = createSignal<typeof monacoEditor>();
	// const [Monaco, setMonaco] = createSignal<any>();
	const [bottomCodePanel, setBottomCodePanel] = createSignal<HTMLElement>();
	const defaultCssPos: EditorProps["cssPosition"] = props.cssPosition;
	const [cssPosition, _setCssPosition] = createSignal<EditorProps["cssPosition"]>(defaultCssPos ?? "fixed");

	const [editorTheme, setEditorTheme] = createStore<EditorTheme>(defaultTheme);


	createEffect(() => {
		if (props.themePreference) {
			setThemePreference(props.themePreference);
		}
		if (props.theme) {
			const { primaryBackgroundColor, primaryBorderColor, primaryTextColor } = props.theme;

			if (primaryBackgroundColor) {
				setEditorTheme({
					primaryBackgroundColor
				});
			}
			if (primaryBorderColor) {
				setEditorTheme({
					primaryBorderColor
				});
			}
			if (primaryTextColor) {
				setEditorTheme({
					primaryTextColor
				});
			}
		}
		if (props.dev) {
			console.log('Theme updated', editorTheme)
		}
	});


	//Panel Signals
	const [leftPanelOpen, setLeftPanelOpen] = createSignal(false);

	// Refs
	let sectionWrap: HTMLElement;

	// Default data
	const defaultData: { item: VisualEditor.ProjectData } = {
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
	const mode = "local";

	let projectData = {
		pages: [
			{
				component:
					defaultData.item.body?.["blink-components"] ??
					"",
				styles: defaultData.item.body?.["blink-styles"] ?? [],
			},
		],
		assets: defaultData.item.body?.["blink-assets"] ?? [],

	};
	if (mode == "local") {
		const localKey = "blink-";
		const projectDataSaved = localStorage.getItem(localKey);
		if (projectDataSaved) {
			projectData = JSON.parse(projectDataSaved);
			if (props.dev) {
				console.log('loaded from local storage', projectData);
			}
		}
	}
	const data = props.item || defaultData.item;


	onMount(async () => {
		const editor = await configureEditor({
			projectData,
			itemId: data.id,
			theme: editorTheme,
			storageStrategy: mode,
			projectId: data.project ?? "Project",
			projectName: data.projectName ?? "",
			itemTitle: data.title ?? `New Content Item${data.id}`,
			themePreference: themePreference(),
			itemStatus: data.status ?? "draft",
			itemMappingState: data.itemEditorStatus ?? "active",
			dev: props.dev ?? false
		});

		// Make the editor theme available globally for imported components
		if (typeof window !== 'undefined') {
			window.editorThemeConfig = editorTheme;
		}
		setEditor(editor);

		// Call the callback with the editor instance if provided
		if (props.onEditorInit) {
			props.onEditorInit(editor);
		}

		editor.on("component:selected", () => {
			setSelectedComponent(editor.getSelected())
		});

		// editor.on("component:update", (e) => { });

		editor.Commands.add("edit-code", {
			run(/* editor, sender, opts */) {
				setShowCodeEditor(true);
			},
			stop(/* editor, sender, opts */) {
				setShowCodeEditor(false);

			},
		});

		editor.Commands.add("generate-ai", () => {
			editor.Modal.open({
				title: "AI Prompt",
				content: `
					<div id="generate-ai" class="flex flex-col gap-20 h-100 ai-prompt-container bg-monochromatic-gray border-gray-300 pb-6 border shadow-md">
					</div>`,
			});
		});

		editor.Commands.add("edit-code-js", () => {
			const editCodebutton = editor.Panels.getButton(
				"edit-actions",
				"edit-code",
			);
			setSelectedLanguage("javascript");
			if (editCodebutton) {
				editCodebutton.set("active", true);
			}
		});

		leftPanelEvents.forEach((ev) => {
			editor.on(`command:run:${ev}`, () => {
				setLeftPanelOpen(true);
				if (props.dev) {
					console.log(`Left panel being toggled open by ${ev} layer`)
				}
			});
			editor.on(`command:stop:${ev}`, () => {
				setLeftPanelOpen(false);
				if (props.dev) {
					console.log(`Left panel being toggled closed by ${ev} layer`)
				}
			});
		});

	});

	return (
		<section id="mainEditorSection" ref={(el) => sectionWrap = el}>
			<div data-load="initial" id="editor-wrapper" class="overflow-hidden">
				<div class={`hidden ${cssPosition() == "fixed" ? "fixed" : "absolute"} z-50 top-1/4`} id="magnet-panels"></div>
				<div
					id="pre-top-panel"
					class={`hidden ${cssPosition() == "fixed" ? "fixed" : "absolute"} w-full right-0 z-10`}
				>
					<div class="flex-grow" id="panel-nav"></div>
					<div id="panel-status"></div>
				</div>
				<div
					id="top-panel"
					class={`panel__top min-h-[60px] border-b ${setThemeClass(
						`border-gray-300 ${editorTheme.primaryBackgroundColor.light}`,
						`border-muted ${editorTheme.primaryBackgroundColor.dark}`,
						themePreference(),
					)} ${cssPosition() == "fixed" ? "fixed" : "absolute"} w-full right-0 z-10`}
				>
					<div
						class={`panel__basic-actions ${setThemeClass(
							`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
							`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
							themePreference(),
						)}`}
					>
						<Title
							editor={editor()}
							itemId={data.id}
							projectName={data.projectName ?? ""}
							replaceLogo={props.replaceLogo}
							logoLink={props.logoLink}
						/>
					</div>
					<div
						class={`panel__devices ${setThemeClass(
							`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
							`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
							themePreference(),
						)}`}
					></div>
					<div
						class={`flex items-center ${setThemeClass(
							`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
							`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
							themePreference(),
						)}`}
						id="rightPanelIcons"
					>
						<div id="undo-manager"></div>
						<div
							class={`panel__edit-actions ${setThemeClass(
								`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
								`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
								themePreference(),
							)}`}
						></div>
						<div
							class={`panel__switcher ${setThemeClass(
								`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
								`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
								themePreference(),
							)}`}
						></div>
						<div
							class={`panel__status ${setThemeClass(
								`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
								`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
								themePreference(),
							)}`}
						>
							<Status itemId={data.id} />
						</div>
					</div>
				</div>
				<div
					style="top:60px;"
					id="editorBody"
					class=" editor-row flex flex-row relative no-scrollbar"
				>
					{/*Left Panel border-r border-t*/}
					<div id="left-panel">
						<div
							// style="width: 2.5%;"
							class={`panel__left
					${setThemeClass(
								`${editorTheme.primaryBorderColor.light} ${editorTheme.primaryTextColor.light} ${editorTheme.primaryBackgroundColor.light}`,
								`${editorTheme.primaryBorderColor.dark} ${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
								themePreference(),
							)}
					 ${cssPosition() == "fixed" ? "fixed" : "absolute"} h-screen z-10 left-0`}
						></div>

						<div
							style={leftPanelOpen() ? "left:2.5%;" : ""}

							class={`${setThemeClass(
								'',
								'',
								themePreference(),
							)}  z-10 h-screen ${cssPosition() == "fixed" ? "fixed" : "absolute"} flex`}
							id="leftSlideOutMenu"
						>
							<div
								class={`h-screen pl-1 ${setThemeClass(
									`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
									`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
									themePreference(),
								)}`}
							></div>
							<div
								id="toggledEditorLayer"
								data-current-panel="blocks"
								data-toggled-state="off"
								data-pinned-state="false"
								class={`hidden h-screen border-l ${setThemeClass(
									`${editorTheme.primaryBorderColor.light} ${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
									`${editorTheme.primaryBorderColor.dark} ${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`, themePreference(),
								)}`}
							>
								{/*TODO replace with transition*/}
								<div
									style="display: none;"
									id="content-blocks"
								>
									<div
										class={`flex justify-between p-1 items-center ${setThemeClass(
											`${editorTheme.primaryBackgroundColor.light} ${editorTheme.primaryTextColor.light}`,
											`${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
											themePreference(),
										)}`}
									>
										<h1
											class={setThemeClass(
												editorTheme.primaryTextColor.light,
												editorTheme.primaryTextColor.dark,
												themePreference(),
											)}
										>
											Add
										</h1>
										<div
											class="flex items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 pinLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 9l4-4 4 4m0 6l-4 4-4-4"
												/>
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												data-command="show-blocks"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 closeLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
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
										</div>
									</div>
								</div>
								<div
									style="display: none;"
									class="layers-container"
								>
									<div
										class={`flex justify-between p-1 items-center ${setThemeClass(
											`${editorTheme.primaryBackgroundColor.light}`,
											`${editorTheme.primaryBackgroundColor.dark}`,
											themePreference(),
										)}`}
									>
										<h1
											class={setThemeClass(
												editorTheme.primaryTextColor.light,
												editorTheme.primaryTextColor.dark,
												themePreference(),
											)}
										>
											Layers
										</h1>
										<div
											class="flex items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 pinLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 9l4-4 4 4m0 6l-4 4-4-4"
												/>
											</svg>
											<svg
												data-command="show-layers"
												xmlns="http://www.w3.org/2000/svg"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 closeLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
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
										</div>
									</div>
								</div>
								<div
									style="display: none;"
									id="pages-container"
								>
									<div
										class={`flex justify-between p-1 items-center border-b ${setThemeClass(
											editorTheme.primaryBorderColor.light,
											editorTheme.primaryBorderColor.dark,
											themePreference(),
										)}   pb-1`}
									>
										<h1
											class={setThemeClass(
												editorTheme.primaryTextColor.light,
												editorTheme.primaryTextColor.dark,
												themePreference(),
											)}
										>
											Page
											Settings
										</h1>
										<div
											class="flex items-center"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 pinLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8 9l4-4 4 4m0 6l-4 4-4-4"
												/>
											</svg>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												data-command="show-blocks"
												class={`${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)} h-4 w-4 closeLayer cursor-pointer hover:opacity-60 active:opacity-30 transition-all`}
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
										</div>
									</div>
									<div
										class="overflow-y-scroll"
										style="height: 90vh;"
									>
										<div
											class={`pb-3 pt-3 mx-3 my-5 rounded shadow-sm border ${setThemeClass(
												`bg-gray-two-tone ${editorTheme.primaryBorderColor.light}`,
												`bg-primary-bg-darkmode ${editorTheme.primaryBorderColor.dark}`,
												themePreference(),
											)}`}
										>
											<div
												class={`ml-2 mb-5 px-3 items-center justify-between ${setThemeClass(
													`${editorTheme.primaryBackgroundColor.light}`,
													`${editorTheme.primaryBackgroundColor.dark}`,
													themePreference(),
												)}`}
											>
												<p
													class={`font-semibold ${setThemeClass(
														editorTheme.primaryTextColor.light,
														editorTheme.primaryTextColor.dark,
														themePreference(),
													)}`}
												>
													Page
													Fields
												</p>
											</div>

											<div
												class={`grid grid-cols-1 my-1 p-3 mx-1 gap-y-5 ${setThemeClass(
													`${editorTheme.primaryBackgroundColor.light}`,
													`${editorTheme.primaryBackgroundColor.dark}`,
													themePreference(),
												)}`}
											>
												<div
													class={`${setThemeClass(
														`bg-white ${editorTheme.primaryBorderColor.light}`,
														`bg-formfields-darkmode ${editorTheme.primaryBorderColor.dark}`,
														themePreference(),
													)}   relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="page-url"
														class={`${setThemeClass(
															'text-gray-900 ',
															'text-white',
															themePreference(),
														)} absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium`}
													>Page
														Url</label
													>
													<input
														type="text"
														name="page-url"
														id="page-url"
														value={data
															.urlPath ??
															""}
														class={`
											block w-full border-0 p-0 ${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'text-white placeholder-gray-400 bg-formfields-darkmode',
															themePreference(),
														)} 
											sm:text-sm
											focus:outline-none focus:ring-0 focus`}
														placeholder="e.g. /new-page"
													/>
												</div>
												<div
													class="px-3 text-sm"
													id="projectLinks"
												></div>
											</div>
										</div>
										<div
											class={`mx-3 pt-5 pb-3 rounded shadow-sm border ${setThemeClass(
												`bg-gray-two-tone ${editorTheme.primaryBorderColor.light}`,
												`bg-primary-bg-darkmode ${editorTheme.primaryBorderColor.dark}`,
												themePreference(),
											)}`}
										>
											<p
												class={`ml-2 mb-5 pl-3 font-semibold ${setThemeClass(
													editorTheme.primaryTextColor.light,
													editorTheme.primaryTextColor.dark,
													themePreference(),
												)}`}
											>
												Seo
												Toolkit
											</p>
											<div
												id="seo-fields"
												class={`grid grid-cols-1 my-1 p-3 mx-1 gap-y-7 ${setThemeClass(
													`${editorTheme.primaryBackgroundColor.light}`,
													`${editorTheme.primaryBackgroundColor.dark}`,
													themePreference(),
												)}`}
											>
												<div
													class={`${setThemeClass(
														'bg-white border-gray-300',
														'bg-formfields-darkmode border-muted',
														themePreference(),
													)}  relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="site-title"
														class={`${setThemeClass(
															'text-gray-900',
															'text-white',
															themePreference(),
														)} absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium`}
													>Title</label
													>
													<input
														type="text"
														name="site-title"
														id="site-title"
														value={data
															.title ??
															`New Content Item${data.id}`}
														class={`
											block w-full border-0 p-0 ${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'text-white bg-formfields-darkmode placeholder-gray-400',
															themePreference(),
														)} 
											 sm:text-sm
											focus:outline-none focus:ring-0 focus`}
														placeholder="Site Title"
													/>
												</div>

												<div
												>
													<label
														for="site-description"
														class={`block text-sm font-medium ${setThemeClass(
															'text-gray-900',
															'text-white',
															themePreference(),
														)}`}
													>Site
														Description</label
													>
													<div
														class="mt-1"
													>
														<div
															class="focus:ring-secondary-accent-blue focus-within:ring-1 shadow-sm rounded-md focus:border-secondary-accent-blue"
														>
															<textarea
																rows="4"
																name="site-description"
																id="site-description"
																value={data
																	.seoToolkit
																	?.siteDescription}
																class={`${setThemeClass(
																	'border-gray-300',
																	'border-muted bg-formfields-darkmode text-white',
																	themePreference(),
																)} 
														shadow-sm focus:outline-none focus:ring-0 focus
														block w-full sm:text-sm border rounded-md
														p-2
														`}

															></textarea>
														</div>
													</div>
												</div>

												<div
													class={`${setThemeClass(
														'bg-white border-gray-300',
														'bg-formfields-darkmode border-muted',
														themePreference(),
													)} relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="favicon"
														class={`absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium ${setThemeClass(
															'text-gray-900 ',
															'text-white',
															themePreference(),
														)}`}
													>Favicon</label
													>
													<input
														type="text"
														name="favicon"
														id="favicon"
														value={data
															.seoToolkit
															?.favicon}
														class={`
											${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'bg-formfields-darkmode text-white placeholder-gray-400',
															themePreference(),
														)}
											block w-full border-0 p-0
										    sm:text-sm
											focus:outline-none focus:ring-0 focus`}
														placeholder="Favicon"
													/>
												</div>

												<div
													class={`${setThemeClass(
														'bg-white border-gray-300',
														'bg-formfields-darkmode border-muted',
														themePreference(),
													)} relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="meta-image"
														class={`absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium ${setThemeClass(
															'text-gray-900 ',
															'text-white',
															themePreference(),
														)}`}
													>OG:Image</label
													>
													<input
														type="text"
														name="meta-image"
														id="meta-image"
														class={`
												${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'bg-formfields-darkmode text-white placeholder-gray-400',
															themePreference(),
														)}
											block w-full border-0 p-0
											focus:outline-none focus:ring-0 focus`}
														placeholder="eg https://logo.png"
													/>
												</div>

												<div
													class={`${setThemeClass(
														'bg-white border-gray-300',
														'bg-formfields-darkmode border-muted',
														themePreference(),
													)} relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="keywords"
														class={`absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium ${setThemeClass(
															'text-gray-900',
															'text-white',
															themePreference(),
														)}`}
													>Keywords</label
													>
													<input
														type="text"
														name="keywords"
														id="keywords"
														class={`
												${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'text-white bg-formfields-darkmode placeholder-gray-400',
															themePreference(),
														)}
											block w-full border-0 p-0 sm:text-sm
											focus:outline-none focus:ring-0 focus`}
														placeholder="eg Blink, Headless, CMS"
													/>
												</div>

												<div
													class={`${setThemeClass(
														'bg-white border-gray-300',
														'bg-formfields-darkmode border-muted',
														themePreference(),
													)} relative border rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-secondary-accent-blue focus-within:border-secondary-accent-blue`}
												>
													<label
														for="author"
														class={`absolute -top-5 left-0 -mt-px inline-block px-1 rounded text-xs font-medium ${setThemeClass(
															'text-gray-900',
															'text-white',
															themePreference(),
														)}`}
													>Author</label
													>
													<input
														type="text"
														name="author"
														id="author"
														class={`
												${setThemeClass(
															'text-gray-900 placeholder-gray-500',
															'bg-formfields-darkmode text-white placeholder-gray-400',
															themePreference(),
														)}
											block w-full border-0 p-0 sm:text-sm
											focus:outline-none focus:ring-0 focus`}
														placeholder="eg Blink Admin"
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									style="display: none;"
									id="configEditor"
								>
									<div
										class={`${setThemeClass(
											`border-gray-300 ${editorTheme.primaryBackgroundColor.light}`,
											`border-muted ${editorTheme.primaryBackgroundColor.dark}`,
											themePreference(),
										)} flex justify-between p-1 items-center border-b mb-4`}
									>
										<h1
											class={setThemeClass(
												editorTheme.primaryTextColor.light,
												editorTheme.primaryTextColor.dark,
												themePreference(),
											)}
										>
											Settings
										</h1>
										<svg
											data-command="show-data-parser"
											xmlns="http://www.w3.org/2000/svg"
											class={`h-4 w-4 closeLayer cursor-pointer ${setThemeClass(
												'text-black',
												'text-white',
												themePreference(),
											)}`}
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
									</div >

									<div class="flex ml-1">
										<p
											class={`ml-2 pl-3 ${setThemeClass(
												'text-black',
												'text-white',
												themePreference(),
											)}`}
										>
											Design
											Mode
										</p>
										<span
											class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
										>
											Beta
										</span>
									</div>
									<div
										id="dragToggle"
										data-x-position=""
										data-y-position=""
										class="flex"
									></div>
								</div >
							</div >
						</div >
					</div >
					{/*End Panel*/}

					{/*Editor Canvas*/}
					<div
						style="width: 94.5%; left:3%;"
						id="editor-container"
						class={`${cssPosition() == "fixed" ? "fixed" : "absolute"} pl-1 pr-[15px] transition-all duration-[200ms]`}
					>
						<div
							class={`border ${setThemeClass(
								'border-gray-300',
								'border-muted',
								themePreference(),
							)}`}
							style="padding-bottom:78px;"
							id="editorCanvas"
						></div>
					</div>
					{/**--End Editor Canvas-*/}
					{/*Right Panel*/}
					<div data-toggled-state="off" class={`panel__right flex
${setThemeClass(
						`${editorTheme.primaryBorderColor.light} ${editorTheme.primaryTextColor.light} ${editorTheme.primaryBackgroundColor.light}`,
						`${editorTheme.primaryBorderColor.dark} ${editorTheme.primaryBackgroundColor.dark} ${editorTheme.primaryTextColor.dark}`,
						themePreference(),
					)}
						`}>
						<div
							style="transform: translateX(20vw);"
							class={`right_tab_left ${setThemeClass(
								'bg-primary-light-gray border-gray-300',
								'bg-nav-darkmode border-muted',
								themePreference(),
							)} w-1/5 border-l ${cssPosition() == "fixed" ? "fixed" : "absolute"} transition-all duration-[200ms] right-[50px] h-full`}
						>
							<div
								style="display: none;"
								class={`border ${setThemeClass(
									'border-gray-300',
									'border-muted',
									themePreference(),
								)} shadow-md`}
								id="stlyeSelectorContainer"
							>
								<div
									class={`selector-container shadow border-b ${setThemeClass(
										'border-gray-300',
										'border-muted',
										themePreference(),
									)}`}
								></div>
								<div
									id="styles"
									class="styles-container no-scrollbar overflow-y-scroll"
								></div>
							</div>

							<div
								style="display: none;"
								id="traits"
								class={`traits-container ${setThemeClass(
									'bg-monochromatic-gray border-gray-300',
									'bg-primary-bg-darkmode border-muted',
									themePreference(),
								)} pb-6 border shadow-md`}
							>
								<div
									class={`${setThemeClass(
										'bg-monochromatic-gray border-gray-300 text-black',
										'bg-primary-bg-darkmode border-muted text-white',
										themePreference(),
									)} mt-0 border-b border-t px-1 py-3`}
								>
									<h1
										class={setThemeClass(
											"",
											"text-white",
											themePreference(),
										)}
									>
										Options
									</h1>
								</div>
							</div>
							<div
								style="display:none;"
								id="ai-prompt"
								class={`flex flex-col gap-20 h-100 ai-prompt-container ${setThemeClass(
									'bg-monochromatic-gray border-gray-300',
									'bg-primary-bg-darkmode border-muted',
									themePreference(),
								)}  pb-6 border shadow-md`}
							>
								{/* <CodeComplete {editor} /> */}
								{/*<AiCompletion editor={editor} />*/}
								{/*<AiChat />*/}
							</div>

							<div
								style="display: none;"
								id="component-css"
								class={`${setThemeClass(
									`bg-monochromatic-gray ${editorTheme.primaryBorderColor.light} ${editorTheme.primaryTextColor.light}`,
									`bg-formfields-darkmode ${editorTheme.primaryBorderColor.dark} ${editorTheme.primaryTextColor.dark}`,
									themePreference(),
								)} pb-6 border shadow-md`}
							></div>
							<div
								style="display: none;"
								id="block-components edit-script"
								class={`${setThemeClass(
									`bg-monochromatic-gray ${editorTheme.primaryBorderColor.light} ${editorTheme.primaryTextColor.light}`,
									`bg-formfields-darkmode ${editorTheme.primaryBorderColor.dark} ${editorTheme.primaryTextColor.dark}`,
									themePreference(),
								)} pb-6 border shadow-md`}
							></div>

							{/* TODO: add conditons for showing the data parser*/}
							<div class="hidden" id="data-parser">
								<div
									class="hidden"
									id="data-etl"
								>
									<p class={setThemeClass(
										editorTheme.primaryTextColor.light,
										editorTheme.primaryTextColor.dark,
										themePreference(),
									)}>Data Explorer</p>
									<label
										for="avatar"
										class={setThemeClass(
											editorTheme.primaryTextColor.light,
											editorTheme.primaryTextColor.dark,
											themePreference(),
										)}
									>Select a data
										source to import</label
									>

									<input
										type="file"
										id="csv-uploader"
										accept=".csv"
									/>

									<button
										id="data-explorer"
										class={`px-3 py-1 rounded ${setThemeClass(
											'bg-white border-gray-300 text-black',
											'bg-primary-bg-darkmode border-muted text-white',
											themePreference(),
										)}`}
									>Edit Table</button
									>
								</div>
							</div>
						</div>
						<div
							class={`${setThemeClass(
								`border-gray-300 bg-primary-light-gray ${editorTheme.primaryTextColor.light}`,
								`border-muted bg-nav-darkmode ${editorTheme.primaryTextColor.dark}`,
								themePreference(),
							)} right_tab_right w-[50px] border-l ${cssPosition() == "fixed" ? "fixed" : "absolute"} h-full right-0`}
						>
							<div
								class="panel__utilities space-y-2"
							></div>
						</div>
					</div>

					{/*--End Right Panel-->*/}
				</div >
			</div >
			<div style="display:none;" id="table-data-container">
				<DataTableLayout />
			</div>
			<Show when={showCodeEditor()}>
				{/**in:fly={{ y: 0, duration: 300, delay: 0 }}**/}

				{/*out:fly={{ y: 100, duration: 300, delay: 0 }}*/}
				<div
					ref={(el) => setBottomCodePanel(el)}
					class={`${cssPosition() == "fixed" ? "fixed" : "absolute"} z-10 ${setThemeClass(
						'bg-white border-t border-gray-300',
						'bg-black border-t border-muted',
						themePreference(),
					)} bottom-0 w-screen transition-all ease-in duration-300`}
					id="bottom-code-panel"
				>
					<CodeEditor
						selectedLanguage={selectedLanguage()}
						bottomCodePanel={bottomCodePanel()}
						visualEditor={editor()}
						onClose={() => { setShowCodeEditor(false); }}
					></CodeEditor>
				</div>
			</Show>
			<div class={`hidden shadow rounded py-3 ${setThemeClass(
				'bg-white border border-gray-300',
				'bg-primary-bg-darkmode border border-muted',
				themePreference(),
			)}`} id="context-menu"></div>
			<div
				style="width:74.5%; left:3%;"
				class={`${cssPosition() == "fixed" ? "fixed" : "absolute"} bottom-0 z-[9] transition-all duration-[200ms] pl-1 pr-[14px]`}
				id="breadcrumbsContainer"
			>
				<div
					class={`flex ${setThemeClass(
						`bg-white ${editorTheme.primaryTextColor.light}`,
						`bg-primary-bg-darkmode ${editorTheme.primaryTextColor.dark}`,
						themePreference(),
					)}`}
					id="breadcrumbs"
				></div>
			</div>
			<div id="toastyContainer" class={setThemeClass(
				editorTheme.primaryTextColor.light,
				editorTheme.primaryTextColor.dark,
				themePreference(),
			)}></div>
		</section>

	);
}
export default Editor
