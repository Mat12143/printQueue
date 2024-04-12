<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import '../app.css';
	export let data: { admin: boolean };
</script>

<div class="flex flex-col lg:h-screen w-full h-full">
	<div class="flex justify-start flex-row w-full p-2 items-center">
		<div class="w-full justify-start flex">
			<Button href="/">Home</Button>
		</div>
		<div class="w-full justify-end flex">
			{#if data.admin}
				<Button href="/logout">Esci</Button>
			{:else}
				<Button href="/login">Admin</Button>
			{/if}
		</div>
	</div>
	<slot />
	<div class="flex justify-center flex-row items-end p-2">
		<a href="https://github.com/Mat12143/qTail" class="text-accent font-normal"
			>Made with love by @Mat12143</a
		>
	</div>
</div>
