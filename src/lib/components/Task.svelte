<script lang="ts">
	import type { PrintTask } from '@prisma/client';
	import { getTaskStateString } from '$lib/taskState';
	import { onMount } from 'svelte';

	export let data: PrintTask;
	let date: string = "...";

	onMount(() => {
		if (data.status != 0) {
			date = data.printedAt!.toLocaleString('it-IT', {
				month: 'long',
				year: 'numeric',
				day: 'numeric'
			});
		} else
			date = data.createdAt.toLocaleDateString('it-IT', {
				month: 'long',
				year: 'numeric',
				day: 'numeric'
			});
	});
</script>

<div class="w-full h-[70px] bg-accent rounded-md">
	<div class="grid grid-cols-3 w-full h-full gap-2 px-5">
		<div class="flex text-center items-center">
			<h1 class="text-md font-semibold text-primary">{data.author}</h1>
		</div>

		<div class="flex text-center items-center">
			<p class="text-md text-primary">
				{date}
			</p>
		</div>

		<div class="w-full h-full flex justify-center items-center text-primary">
			<h1>{getTaskStateString(data)}</h1>
		</div>
	</div>
</div>
