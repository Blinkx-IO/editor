/** @jsxImportSource solid-js */
/* @refresh reload */
import { render } from 'solid-js/web';
import { configureEditor } from './editor';
import { onMount } from 'solid-js';
// import type {JSX} from 'solid-js/jsx-runtime';
// import './index.css';
// import App from './App';


function App() {
	onMount(() => {
		configureEditor({
			projectId: '2',
			projectName: 'test',
			itemTitle: 'test',
			itemId: '1',
			themePreference: 'dark',
			itemStatus: 'draft',
			itemMappingState: 'active',

			// config
		});
	});
	return (
		<div class="App">
			<div id='editorCanvas'></div>

		</div>
	)
}

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
	);
}

render(() => <App />, root!);
