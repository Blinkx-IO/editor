import { mount } from 'svelte'
// import './app.css'
import App from './src/framework/svelte/App.svelte'


const app = mount(App, {
	target: document.getElementById('root')!,
})

export default app
