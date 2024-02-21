<script lang="ts">
	import Column from '$lib/components/Column.svelte';
	import List from '$lib/components/List.svelte';
	import PrintTask from '$lib/components/PrintTask.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { Task } from '$lib/zod/types';
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import { allowedExtensions } from '$lib/const';

	export let data: { completed: Task[]; waiting: Task[] };
	export let form;

	let fileBtn: HTMLInputElement;
	let files: FileList;
	let uploadHTML: HTMLButtonElement;

	$: if (files) {
		const splitted = files[0].name.split('.');
		const fileExtension = splitted[splitted.length - 1];

		if (allowedExtensions.includes(fileExtension)) uploadHTML.innerHTML = files[0].name;
		else uploadHTML.innerHTML = 'File non supportato';
	}

	onMount(() => {
		if (!form) return;
		if (form.error || form.message != undefined) toast.push(form.message);
		if (!form.error) toast.push('Aggiunta stampa');
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

			<form action="?/create" method="POST" enctype="multipart/form-data">
				<div class="flex items-center justify-center bg-accent rounded-md p-5 text-primary">
					<div class="w-full h-full">
						<div class="flex flex-col gap-1 pb-2 w-full">
							<label for="author">Autore</label>
							<input
								class="rounded-md p-1 text-accent"
								type="text"
								name="author"
								id="author"
								placeholder="Mario Rossi"
								required
							/>
						</div>

						<div class="flex flex-col gap-1 pb-2 w-full">
							<label for="note">Note</label>
							<textarea
								class="h-28 rounded-md resize-none p-1 text-accent"
								name="note"
								id="note"
								placeholder="Materiale, Riempimento, Ecc"
							/>
						</div>
						<div class="flex flex-col gap-1 pb-2 w-full">
							<label for="file">File di Stampa</label>
							<input
								bind:this={fileBtn}
								bind:files
								class="hidden"
								type="file"
								id="file"
								name="file"
								accept=".stl, .3mf"
								required
							/>
							<button
								class="bg-primary text-accent rounded-md p-2"
								bind:this={uploadHTML}
								on:click={() => fileBtn.click()}>Carica File</button
							>
						</div>

						<div class="pt-2 w-full">
							<button class="bg-primary text-accent h-14 rounded-md w-full">Invia Stampa</button>
						</div>
					</div>
				</div>
			</form>

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
