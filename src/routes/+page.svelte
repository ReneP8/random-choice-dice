<script lang="ts">
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
				<h1>{result}</h1>
			{:else}
				<h1>No Result</h1>
			{/if}
			<button class="btn bg-secondary-500 w-full" on:click|preventDefault={getRandomChoice}
				><span>Roll</span></button
			>
		</div>

		<div class="flex flex-col items-center w-[60%] gap-5 mb-5">
			<p>Enter all your choices and click on Generate to get random a choice.</p>
			<button class="btn bg-primary-500 p-2 w-full" on:click|preventDefault={addChoice}
				><span>Add Choice</span></button
			>
			{#each choices as choice, i}
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input class="input p-2" bind:value={choice} placeholder="Choice {i + 1}" />
					<button class="variant-filled-error" on:click={() => deleteChoice(i)}>Delete</button>
				</div>
			{/each}
		</div>
	</div>
</main>
