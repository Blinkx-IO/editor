import { configureEditor } from './editor';
type EditorConfig = ReturnType<typeof configureEditor>;

export { configureEditor, type EditorConfig };

export { setupMonacoWorkers } from "./utilities/monaco-setup"

