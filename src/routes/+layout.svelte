<script lang="ts">
	import '../app.css';
    export let data: { admin: boolean }
</script>

<div class="flex justify-start flex-row w-full p-2 items-center">
	<div class="w-full justify-end flex">
		{#if data.admin}
			<a href="/logout" data-sveltekit-reload
				><button class="bg-accent text-primary p-2 w-24 rounded-md">Esci</button></a
			>
		{:else}
			<a href="/login" data-sveltekit-reload
				><button class="bg-accent text-primary p-2 w-24 rounded-md">Admin</button></a
			>
		{/if}
	</div>
</div>
<slot />
