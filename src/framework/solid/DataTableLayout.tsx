import { Component, createSignal } from "solid-js";

interface DataTableLayoutProps {
	// Add any props you need here
}

const DataTableLayout: Component<DataTableLayoutProps> = (props) => {
	const [tablePanelHeight] = createSignal("h-[90vh]");

	return (
		<div
			class={`fixed z-10 ${tablePanelHeight()} bg-black bottom-0 w-screen transition-all ease-in duration-300`}
		>
			Table Layout Container
		</div>
	);
};

export default DataTableLayout;
