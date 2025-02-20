import { Component, createSignal, createEffect, onMount } from "solid-js";
import { createStore } from "solid-js/store";

interface StatusProps {
	itemId: string;
	initialStatus?: string;
}

const Status: Component<StatusProps> = (props) => {
	const [toggled, setToggled] = createSignal(false);
	const [status, setStatus] = createSignal("");
	const [loading, setLoading] = createSignal(false);
	const [contentStatus, setContentStatus] = createSignal<"draft" | "published">("draft");
	const [itemMappingState, setItemMappingState] = createSignal<"active" | "inactive" | "pending">("inactive");

	const toggleMenu = () => {
		setToggled(!toggled());
	};

	const handleStatusChange = async () => {
		setLoading(true);
		try {
			await fetch("/content/api/publish-item-mapping", {
				method: "POST",
				body: JSON.stringify({
					itemId: props.itemId,
					status: "active",
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			setItemMappingState("active");
			setStatus("Published");
		} catch (error) {
			console.error("Failed to update status:", error);
		} finally {
			setLoading(false);
		}
	};

	const updateStatus = (state: "draft" | "published") => {
		setContentStatus(state);
		toggleMenu();
	};

	const mapLabelToStatus = () => {
		const currentState = itemMappingState();
		if (currentState === "active") {
			setStatus("Published");
		} else if (currentState === "inactive") {
			setStatus("Publish");
		} else if (currentState === "pending") {
			setStatus("Publish Update");
		}
	};

	createEffect(() => {
		mapLabelToStatus();
	});

	onMount(() => {
		mapLabelToStatus();
	});

	return (
		<div>
			<span id="listbox-label" class="sr-only">
				Change published status
			</span>
			<div class="relative">
				<div class="inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500">
					<div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500">
						<div class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 pl-2 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
							{loading() ? (
								"Loading.."
							) : ["pending", "inactive"].includes(itemMappingState()) ? (
								<button
									onClick={handleStatusChange}
									type="button"
									class="text-sm active:opacity-70 transition-all"
									id="itemStatus"
								>
									{status()}
								</button>
							) : (
								<div class="text-sm" id="itemStatus">
									{status()}
								</div>
							)}
						</div>
						<button
							onClick={toggleMenu}
							type="button"
							class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 rounded-l-none rounded-r-md text-sm font-medium text-white"
							aria-expanded="true"
							aria-labelledby="listbox-label"
						>
							<span class="sr-only">Change published status</span>
							<svg
								style="color:white!important;"
								class="h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>

				<ul
					data-open={toggled()}
					id="status-dropdown"
					class={`${toggled() ? "" : "opacity-0 pointer-events-none z-[-99]"
						} transition ease-in duration-100 origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none`}
					tabindex="-1"
					role="listbox"
					aria-labelledby="listbox-label"
					aria-activedescendant="listbox-option-0"
				>
					<button
						onClick={() => {
							updateStatus(contentStatus() === "published" ? "draft" : "published");
						}}
						class="cursor-pointer select-none relative p-4 text-sm hover:bg-gray-50"
						id="listbox-option-publish-status"
					>
						<div class="flex flex-col">
							<div class="flex justify-between">
								<p class="option-label font-normal text-gray-900">
									{contentStatus() === "draft" ? "Publish" : "Draft"}
								</p>
								{contentStatus() === "draft" ? (
									<svg
										style="color:#05ed05!important;"
										class="h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-5 w-5 text-red-400"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
											clip-rule="evenodd"
										/>
									</svg>
								)}
							</div>
							<p class="text-gray-500 mt-2 text-left option-description">
								{contentStatus() === "draft" ? "Publish" : "Unpublish"} content item to
								destination.
							</p>
						</div>
					</button>
				</ul>
			</div>
		</div>
	);
};

export default Status;
