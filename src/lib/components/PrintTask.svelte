<script lang="ts">
	import { onMount } from 'svelte';
	import type { Task } from '$lib/zod/types';
	import { selectedTask } from '$lib/stores';

	export let data: Task;
    export let admin = false;

	let date: string = '...';

	const dateOptions = {
		month: 'long',
		year: 'numeric',
		day: 'numeric'
	};

	onMount(() => {
		if (data.status != 0 && data.printedAt) {
			// @ts-ignore
			date = new Date(data.printedAt).toLocaleString('it-IT', dateOptions);
			// @ts-ignore
		} else date = new Date(data.createdAt).toLocaleDateString('it-IT', dateOptions);
	});
</script>

<button disabled={!admin} on:click={() => selectedTask.set(data)}>
	<div class="w-full h-[70px] bg-accent rounded-md border-solid" class:text-md={$selectedTask == data}>
		<div class="grid grid-cols-3 w-full h-full gap-2 px-5">
			<div class="flex text-center items-center">
				<h1 class="text-md font-semibold text-primary text-left max-w-[115px] truncate">{data.author}</h1>
			</div>

			<div class="flex text-center items-center">
				<p class="text-md text-primary">
					{date}
				</p>
			</div>

			<div class="w-full h-full flex justify-center items-center text-primary">
				<h1 class="max-w-[115px] truncate">{data.title == null ? "Non impostato" : data.title}</h1>
			</div>
		</div>
	</div>
</button>
