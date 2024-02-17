<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import type { PrintTask } from '@prisma/client';

	export let data: { completed: PrintTask[]; waiting: PrintTask[] };
	let fileBtn: HTMLInputElement;
	// export let form: { error: boolean; message: string };
</script>

<div class="flex flex-col justify-center items-center h-screen w-screen">
	<div class="lg:p-0 p-3 h-full flex lg:flex-row flex-col lg:w-[900px] w-[400px] gap-10">
		<!-- Left side -->
		<div class="lg:w-1/2 lg:h-full">
			<h1 class="text-2xl font-semibold py-5 text-accent">Stampe in coda</h1>
			<div
				class="grid gap-2 overflow-x-hidden overflow-y-auto lg:max-h-[700px] max-h-[400px] text-primary"
			>
				{#if data.waiting.length != 0}
					{#each data.waiting as task}
						<Task data={task} />
					{/each}
				{:else}
					<p>Nessuna stampa</p>
				{/if}
			</div>
		</div>

		<div class="lg:w-1/2 lg:h-full">
			<h1 class="text-2xl font-semibold py-5 text-accent">Aggiungi Stampa</h1>

			<form action="?/create" method="POST" enctype="multipart/form-data">
				<div
					class="flex items-center justify-center bg-accent rounded-md p-5 text-primary"
				>
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
								class="hidden"
								type="file"
								id="file"
								name="file"
								accept=".stl, .3mf"
								required
							/>
							<button class="bg-primary text-accent rounded-md p-2" on:click={() => fileBtn.click()}
								>Carica File</button
							>
						</div>

						<div class="pt-2 w-full">
							<button class="bg-primary text-accent h-14 rounded-md w-full">Invia Stampa</button>
						</div>
					</div>
				</div>
			</form>

			<h1 class="text-2xl font-semibold py-5 text-accent">Ultime Stampe</h1>
			<div
				class="grid gap-2 overflow-x-hidden overflow-y-auto lg:max-h-[230px] max-h-[400px] text-primary"
			>
				{#if data.completed.length != 0}
					{#each data.completed as task}
						<Task data={task} />
					{/each}
				{:else}
					<p>Nessuna stampa</p>
				{/if}
			</div>
		</div>
	</div>
</div>
