<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import List from '$lib/components/List.svelte';
	import PrintTask from '$lib/components/PrintTask.svelte';
	import SubmitForm from '$lib/components/SubmitForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { Task } from '$lib/zod/types';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

	export let data: { completed: Task[]; waiting: Task[] };
	export let form : { error: boolean, message: string | null };


	onMount(() => {
		if (!form) return;
		if (form.error && form.message) toast.push(form.message);
		if (!form.error) toast.push('Stampa aggiunta');
	});
</script>

<div class="flex flex-col justify-center items-center h-full w-full">
	<div class="lg:p-0 p-3 h-full flex lg:flex-row flex-col lg:w-[900px] w-[400px] gap-10">
		<!-- Left side -->
		<Column>
			<Title title="Stampe in attesa" />
			<List>
				{#if data.waiting.length != 0}
					{#each data.waiting as task}
						<PrintTask data={task} />
					{/each}
				{:else}
					<p>Nessuna stampa</p>
				{/if}
			</List>
		</Column>

		<!-- Right side -->
		<Column>
			<Title title="Aggiungi Stampa" />
            <SubmitForm />

			<Title title="Stampe effettuate" />
			<List>
				{#if data.completed.length != 0}
					{#each data.completed as task}
						<PrintTask data={task} />
					{/each}
				{:else}
					<p>Nessuna stampa</p>
				{/if}
			</List>
		</Column>
	</div>
</div>
