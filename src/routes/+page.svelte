<script lang="ts">
	import AdminForm from '$lib/components/AdminForm.svelte';
	import Column from '$lib/components/Column.svelte';
	import List from '$lib/components/List.svelte';
	import PrintTask from '$lib/components/PrintTask.svelte';
	import SubmitForm from '$lib/components/SubmitForm.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { Task } from '$lib/zod/types';
	import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';

	export let data: { completed: Task[]; waiting: Task[]; admin: boolean };
	export let form: { error: boolean; message: string | null };

	onMount(() => {
		if (form == null) return;
		if (form?.error && form?.message) toast.error(form.message);
		if (!form.error) toast.success('Stampa aggiunta');
	});
</script>

<div class="flex justify-end flex-row w-full p-2">
	{#if data.admin}
		<a href="/logout" data-sveltekit-reload
			><button class="bg-accent text-primary p-2 rounded-md">Esci</button></a
		>
	{:else}
		<a href="/login" data-sveltekit-reload
			><button class="bg-accent text-primary p-2 rounded-md">Admin</button></a
		>
	{/if}
</div>
<div class="flex flex-col justify-center items-center h-full w-full">
	<div class="lg:p-0 p-3 h-full flex lg:flex-row flex-col lg:w-[900px] w-[400px] gap-10">
		<!-- Left side -->
		<Column>
			<Title title="Stampe in attesa" />
			<List>
				{#if data.waiting.length != 0}
					{#each data.waiting as task}
						<PrintTask admin={data.admin} data={task} />
					{/each}
				{:else}
					<p class="text-accent">Nessuna stampa</p>
				{/if}
			</List>
		</Column>

		<!-- Right side -->
		<Column>
			<Title title="Aggiungi Stampa" />
			{#if data.admin}
				<AdminForm />
			{:else}
				<SubmitForm />
			{/if}

			<Title title="Stampe effettuate" />
			<List>
				{#if data.completed.length != 0}
					{#each data.completed as task}
						<PrintTask data={task} />
					{/each}
				{:else}
					<p class="text-accent">Nessuna stampa</p>
				{/if}
			</List>
		</Column>
	</div>
</div>
<Toaster />
