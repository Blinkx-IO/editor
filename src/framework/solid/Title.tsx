import { Component, createSignal, Show } from "solid-js";
import { setThemeClass } from "$components/utilities/themePreferences";


export interface TitleProps {
	itemId: string;
	projectName: string;
	editor: VisualEditor.BlinkEditor | undefined;
	initialTitle?: string;
	replaceLogo?: Component<{}>;
	logoLink?: string;

}

const Title: Component<TitleProps> = (props) => {
	const [contentTitle, setContentTitle] = createSignal(props.initialTitle || "");
	const [themePreference] = createSignal<themePreference>("dark"); // You'll need to implement your theme logic here
	let titleInput: HTMLInputElement;

	const updateTitle = (title: string) => {
		setContentTitle(title);
		//Update Title
		if (props.editor) {
			props.editor.store({});
		}
	};
	return (
		<div class="blink-pn-buttons">
			<a title="Home" class="blink-pn-btn"
				href={props.logoLink || undefined}>
				<Show when={props.replaceLogo} fallback={
					<svg
						width="317"
						height="253"
						viewBox="0 0 317 253"
						fill="none"
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						id="igj83"
					>
						<path
							d="M250.949 251.595L52.4687 252.855L0.258789 155.335L64.0588 154.935L88.7488 199.735L277.589 198.545L198.739 53.6647L125.729 54.1248L96.0889 1.45471L234.269 0.574707L316.909 152.045L250.949 251.595Z"
							fill="url(#paint0_linear_34_9)"
						/>
						<path
							d="M75.8489 54.8647L100.759 100.745L173.329 99.4247L201.509 153.205L64.0588 154.935L10.5488 55.2748L75.8489 54.8647Z"
							fill="url(#paint1_linear_34_9)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_34_9"
								x1="0.0209912"
								y1="127.714"
								x2="316.675"
								y2="125.725"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#FF931E" />
								<stop offset="0.05" stop-color="#F59325" />
								<stop offset="0.14" stop-color="#DC943A" />
								<stop offset="0.25" stop-color="#B2965C" />
								<stop offset="0.39" stop-color="#78988C" />
								<stop offset="0.53" stop-color="#309BC7" />
								<stop offset="0.57" stop-color="#1E9CD7" />
								<stop offset="0.87" stop-color="#0075BE" />
								<stop offset="0.99" stop-color="#005B97" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_34_9"
								x1="10.8008"
								y1="105.366"
								x2="201.137"
								y2="104.17"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#FF931E" />
								<stop offset="0.05" stop-color="#F59325" />
								<stop offset="0.14" stop-color="#DC943A" />
								<stop offset="0.25" stop-color="#B2965C" />
								<stop offset="0.39" stop-color="#78988C" />
								<stop offset="0.53" stop-color="#309BC7" />
								<stop offset="0.57" stop-color="#1E9CD7" />
								<stop offset="0.87" stop-color="#0075BE" />
								<stop offset="0.99" stop-color="#005B97" />
							</linearGradient>
						</defs>
					</svg>

				}>
					{props.replaceLogo && props.replaceLogo({})}
				</Show>

			</a>
			<span title="Title" class="blink-pn-btn">
				<div
					class={`flex flex-col px-3 border border-transparent rounded-sm ${setThemeClass(
						"",
						"dark:bg-transparent",
						themePreference()
					)}`}
					id="panel__Title_Container"
					data-input=""
				>
					<input
						ref={(el) => titleInput = el}
						onChange={(e) => updateTitle(e.currentTarget.value)}
						class={`
	            focus:outline-none
	            focus:ring-0 focus:ring-transparent
	            text-sm ${setThemeClass(
							"bg-primary-light-gray",
							"dark:bg-transparent",
							themePreference()
						)} 
	            rounded-sm`}
						id="panel__Title"
						type="text"
						placeholder="Title"
						value={contentTitle()}
					/>
					<div
						class={`
	            flex
	            text-xs  ${setThemeClass(
							"text-gray-500",
							"dark:text-muted",
							themePreference()
						)}`}
						id="contentitemid"
					>
						<span id="projectName">
							{props.projectName} &nbsp;
						</span>
						<span class="hidden" id="idNumber">
							Id: {props.itemId}
						</span>
					</div>
				</div>
			</span>
		</div>
	);
};

export default Title;

