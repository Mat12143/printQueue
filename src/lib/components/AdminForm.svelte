<script lang="ts">
	import { enhance } from '$app/forms';
	import { selectedTask } from '$lib/stores';
</script>

<div class="flex items-center justify-center bg-accent rounded-md p-5 text-primary">
	<div class="w-full h-full">
		<div class="flex flex-row pb-2 w-[calc(100%-12px)] gap-3">
			<div class="w-1/2 flex flex-col gap-1 max-w-1/2">
				<label for="author">Autore</label>
				<input
					class="rounded-md p-1 text-accent"
					type="text"
                    value={$selectedTask == null ? '' : $selectedTask.author}
                    readonly
				/>
			</div>
			<div class="w-1/2 flex flex-col gap-1 max-w-1/2">
				<label for="title">Titolo</label>
				<input
					class="rounded-md p-1 text-accent"
					type="text"
                    value={$selectedTask == null ? '' : $selectedTask.title}
                    readonly
				/>
			</div>
		</div>

		<div class="flex flex-col gap-1 pb-2 w-full">
			<label for="note">Note</label>
			<textarea
				class="h-28 rounded-md resize-none p-1 text-accent"
				value={$selectedTask == null ? '' : $selectedTask.notes}
				readonly
			/>
		</div>
		<div class="flex flex-col gap-1 pb-2 w-full">
			<label for="file">File di Stampa</label>
			<a
				class:bg-disabled={$selectedTask == undefined}
				class:bg-primary={$selectedTask != undefined}
				class="bg-primary text-accent text-center rounded-md p-2"
				class:pointer-events-none={$selectedTask == undefined}
				href="/get?file={$selectedTask?.fileName}"
				><button disabled={$selectedTask == undefined}>Download file</button></a
			>
		</div>

		<div class="pt-2 w-full flex flex-row gap-2 h-14">
			<form class="w-1/2 h-full" action="?/printed" method="post" use:enhance>
				<input hidden name="taskID" value={$selectedTask?.id} />
				<button
					class:bg-disabled={$selectedTask == undefined}
					class:bg-primary={$selectedTask != undefined}
					type="submit"
					disabled={$selectedTask == undefined}
					class="h-full w-full text-accent rounded-md">Stampato</button
				>
			</form>
			<form class="w-1/2 h-full" action="?/reject" method="post" use:enhance>
				<input hidden name="taskID" value={$selectedTask?.id} />
				<button
					type="submit"
					class:bg-disabled={$selectedTask == undefined}
					class:bg-primary={$selectedTask != undefined}
					disabled={$selectedTask == undefined}
					class="w-full h-full bg-primary text-accent rounded-md">Rifiuta</button
				>
			</form>
		</div>
	</div>
</div>
