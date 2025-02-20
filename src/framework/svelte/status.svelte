<script lang="ts">
	export let toggled = false;
	let status: string = "";
	// export let mappingContentStatus: ItemMappingStatus = "inactive";
	export let itemId: string;
	import { contentStatus } from "@framework/svelte/stores.client";

	import { itemMappingState } from "./stores.client";
	import { onMount } from "svelte";
	// import { ItemMappingStatus } from "@/global";

	let loading = false;
	//export let editor : VisualEditor.BlinkEditor;

	//Publish Updates
	//Published

	let defaultStatus = "";
	function toggleMenu() {
		toggled ? (toggled = false) : (toggled = true);
	}

	async function handleStatusChange() {
		loading = true;
		await fetch("/content/api/publish-item-mapping", {
			method: "POST",
			body: JSON.stringify({
				itemId: itemId,
				status: "active",
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
		itemMappingState.set("active");
		status = "Published";
		loading = false;
	}

	function updateStatus(state: VisualEditor.status) {
		contentStatus.set(state);

		//call an api endpoint
		//Add alert/notification

		//editor.store({});
		//fetch

		toggleMenu();
	}

	function mapLabelToStatus() {
		if ($itemMappingState == "active") {
			status = "Published";
		} else if ($itemMappingState == "inactive") {
			status = "Publish";
		} else if ($itemMappingState == "pending") {
			status = "Publish Update";
		}
	}

	itemMappingState.subscribe((value) => {
		mapLabelToStatus();
	});

	onMount(() => {
		mapLabelToStatus();
	});

	//Are you sure you want to unpublish this content item? It'll remove it from your live site!
</script>

<div>
	<span id="listbox-label" class="sr-only">
		Change published status
	</span>
	<div class="relative">
		<div
			class="inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500"
		>
			<div
				class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-secondary-accent-blue-500"
			>
				<div
					class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 pl-2 pr-4 border border-transparent rounded-l-md shadow-sm text-white"
				>
					{#if loading}
						Loading..
					{:else if ["pending", "inactive"].includes($itemMappingState)}
						<button
							on:click={handleStatusChange}
							type="button"
							class="text-sm active:opacity-70 transition-all"
							id="itemStatus"
						>
							{status}
						</button>
					{:else}
						<div
							class="text-sm"
							data-status={defaultStatus}
							id="itemStatus"
						>
							{status}
						</div>
					{/if}
				</div>
				<button
					on:click={toggleMenu}
					type="button"
					class="relative inline-flex items-center bg-secondary-accent-blue hover:bg-secondary-accent-blue-600 py-1 rounded-l-none rounded-r-md text-sm font-medium text-white"
					aria-expanded="true"
					aria-labelledby="listbox-label"
				>
					<span class="sr-only"
						>Change published status</span
					>
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
			data-open="false"
			id="status-dropdown"
			class="{toggled
				? ''
				: 'opacity-0 pointer-events-none z-[-99]'} transition ease-in duration-100 origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
			tabindex="-1"
			role="listbox"
			aria-labelledby="listbox-label"
			aria-activedescendant="listbox-option-0"
		>
			<button
				on:click={() => {
					updateStatus(
						$contentStatus == "published"
							? "draft"
							: "published",
					);
				}}
				class="
                 cursor-pointer select-none relative p-4 text-sm
                hover:bg-gray-50
                "
				id="listbox-option-publish-status"
			>
				<div class="flex flex-col">
					<div class="flex justify-between">
						<!-- Selected: "font-semibold", Not Selected: "font-normal" -->

						<p
							class="option-label font-normal text-gray-900"
						>
							{$contentStatus ==
							"draft"
								? "Publish"
								: "Draft"}
						</p>
						{#if $contentStatus == "draft"}
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
								></path>
							</svg>
						{:else}
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
								></path>
							</svg>
						{/if}
					</div>
					<!-- Highlighted: "text-indigo-200", Not Highlighted: "text-gray-500" -->
					<p
						class="text-gray-500 mt-2 text-left option-description"
					>
						{$contentStatus == "draft"
							? "Publish"
							: "Unpublish"} content item
						to destination.
					</p>
				</div>
			</button>
		</ul>
	</div>
</div>
