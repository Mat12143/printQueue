<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="w-screen h-screen flex justify-center text-center items-center">
	<div class="bg-accent rounded-md p-5 space-y-3 lg:w-1/6">
		<h1 class="text-primary font-semibold text-2xl">Errore {$page.status}</h1>
		<p class="text-primary text-sm opacity-90">Errore nella richiesta</p>
		<div>
			<a href="/"><button class="p-3 bg-primary rounded-md text-accent">Homepage</button></a>
		</div>
	</div>
</div>
