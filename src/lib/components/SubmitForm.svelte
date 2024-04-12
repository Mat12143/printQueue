<script lang="ts">
	import { enhance } from '$app/forms';
	import { allowedExtensions } from '$lib/const';
	import { writable } from 'svelte/store';

	let fileBtn: HTMLInputElement;
	let files: FileList;
	let submitButton: HTMLButtonElement;

    let uploadHTML = writable<HTMLButtonElement>()

	$: {
        console.log(files)

		if (submitButton) submitButton.disabled = true;
		if (files) {
			const splitted = files[0].name.split('.');
			const fileExtension = splitted[splitted.length - 1];

			if (allowedExtensions.includes(fileExtension)) {
				$uploadHTML.innerHTML = files[0].name;
				submitButton.disabled = false;
			} else {
				$uploadHTML.innerHTML = 'File non supportato';
				submitButton.disabled = true;
			}
		}
	}

	function reset() {
		submitButton.disabled = true;
		$uploadHTML.innerHTML = 'Carica file';
	}
</script>

<form action="?/create" method="POST" enctype="multipart/form-data" use:enhance on:submit={reset}>
	<div class="flex items-center justify-center bg-accent rounded-md p-5 text-primary">
		<div class="w-full h-full">
         <!-- Add space to the two flexbox -->
			<div class="flex flex-row pb-2 w-[calc(100%-12px)] gap-3">
				<div class="w-1/2 flex flex-col gap-1 max-w-1/2">
					<label for="author">Autore</label>
					<input
						class="rounded-md p-1 text-accent"
						type="text"
						name="author"
						id="author"
						placeholder="Mario Rossi"
                        maxlength="20"
						required
					/>
				</div>
				<div class="w-1/2 flex flex-col gap-1 max-w-1/2">
					<label for="title">Titolo</label>
					<input
						class="rounded-md p-1 text-accent"
						type="text"
						name="title"
						id="title"
						placeholder="Nerf 3D"
                        maxlength="20"
						required
					/>
				</div>
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
					accept=".stl, .3mf, .zip, .7zip"
					required
				/>
				<button
					class="bg-primary text-accent rounded-md p-2"
					bind:this={$uploadHTML}
					on:click|preventDefault={() => fileBtn.click()}>Carica File</button
				>
			</div>

			<div class="pt-2 w-full">
				<button
					bind:this={submitButton}
					class:bg-disabled={submitButton?.disabled}
					class="bg-primary text-accent h-14 rounded-md w-full">Invia Stampa</button
				>
			</div>
		</div>
	</div>
</form>
