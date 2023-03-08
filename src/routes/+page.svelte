<script lang="ts">
	import { scale } from 'svelte/transition';
	import { content } from '../stores/choices';
	let result: string;
	let times: number = 1;
	let loading = false;
	let results: Array<any> = [];

	function addChoice() {
		$content = [...$content, ''];
	}

	function deleteChoice(index: number) {
		$content.splice(index, 1);
		$content = $content;
	}

	function getRandomChoice(): string {
		let valid = $content.filter((element) => element);
		let result = valid[Math.floor(Math.random() * valid.length)];
		return result;
	}

	function simulateChoices() {
		results = [];
		if (times > 1) {
			loading = true;
			let runs = 0;
			$content.forEach((element) => results.push({ name: element, value: 0 }));
			setTimeout(() => {
				while (runs < times) {
					let reusultTmp = getRandomChoice();
					result = reusultTmp;
					results.find((element) => element.name == reusultTmp).value += 1;
					runs += 1;
				}
				loading = false;
			}, 3000);
		} else {
			result = getRandomChoice();
		}
	}
</script>

<main>
	<div class="flex flex-col items-center gap-20 mt-5 h-full">
		<div class="flex flex-col items-center w-[60%] gap-10 mt-10">
			{#if result && !loading}
				{#key result}
					<h1 in:scale>{result}</h1>
				{/key}
				{#if results.length > 0}
					<p class="font-bold">Results</p>
					<ul class="list w-full">
						{#each results as choice}
							<div class="flex justify-between">
								<span>{choice.name}</span>
								<span class="text-secondary-500 font-bold">{choice.value}</span>
							</div>
						{/each}
					</ul>
				{/if}
			{:else if !result && !loading}
				<h1>No Result</h1>
			{:else}
				<h1>Loading...</h1>
			{/if}
			<div class="w-full">
				<button
					class="btn bg-secondary-500 p-3 w-full mb-8"
					on:click|preventDefault={simulateChoices}><span class="font-bold">Roll</span></button
				>
				<strong>Multiple runs</strong>
				<div class="flex flex-row justify-between">
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							checked
							name="radio-direct"
							value="1"
							on:change={(event) => {
								times = Number(event.currentTarget?.value);
							}}
						/>
						<p>1x</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="radio-direct"
							value="100"
							on:change={(event) => {
								times = Number(event.currentTarget?.value);
							}}
						/>
						<p>100x</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="radio-direct"
							value="1000"
							on:change={(event) => {
								times = Number(event.currentTarget?.value);
							}}
						/>
						<p>1,000x</p>
					</label>
					<label class="flex items-center space-x-2">
						<input
							class="radio"
							type="radio"
							name="radio-direct"
							value="10000"
							on:change={(event) => {
								times = Number(event.currentTarget?.value);
							}}
						/>
						<p>10,000x</p>
					</label>
				</div>
			</div>
		</div>

		<div class="flex flex-col items-center w-[60%] gap-5 mb-5">
			<p>
				Enter all your choices and then click on <span class="text-secondary-400">Roll</span> to get
				random a choice.
			</p>
			<button class="btn bg-primary-500 p-3 w-full" on:click|preventDefault={addChoice}
				><span class="font-bold">Add More</span></button
			>
			{#each $content as choice, i}
				<div transition:scale class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input class="input p-3" bind:value={choice} placeholder="Choice {i + 1}" />
					<button class="variant-filled-error" on:click={() => deleteChoice(i)}>Delete</button>
				</div>
			{/each}
		</div>
	</div>
</main>
