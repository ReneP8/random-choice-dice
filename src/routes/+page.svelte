<script lang="ts">
	import { scale } from 'svelte/transition';
	let choices: string[] = ['', ''];
	let result: string;

	function addChoice() {
		choices = [...choices, ''];
	}

	function deleteChoice(index: number) {
		choices.splice(index, 1);
		choices = choices;
	}

	function getRandomChoice() {
		let valid = choices.filter((element) => element);
		result = valid[Math.floor(Math.random() * valid.length)];
	}
</script>

<main>
	<div class="flex flex-col items-center gap-20 mt-5 h-full">
		<div class="flex flex-col items-center w-[60%] gap-10 mt-10">
			{#if result}
				{#key result}
					<h1 in:scale>{result}</h1>
				{/key}
			{:else}
				<h1>No Result</h1>
			{/if}
			<button class="btn bg-secondary-500 p-3 w-full" on:click|preventDefault={getRandomChoice}
				><span class="font-bold">Roll</span></button
			>
		</div>

		<div class="flex flex-col items-center w-[60%] gap-5 mb-5">
			<p>
				Enter all your choices and then click on <span class="text-secondary-400">Roll</span> to get
				random a choice.
			</p>
			<button class="btn bg-primary-500 p-3 w-full" on:click|preventDefault={addChoice}
				><span class="font-bold">Add More</span></button
			>
			{#each choices as choice, i}
				<div transition:scale class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input class="input p-3" bind:value={choice} placeholder="Choice {i + 1}" />
					<button class="variant-filled-error" on:click={() => deleteChoice(i)}>Delete</button>
				</div>
			{/each}
		</div>
	</div>
</main>
