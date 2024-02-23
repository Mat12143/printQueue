<script lang="ts">
	export let data: { istanceNew: boolean };
</script>

<div class="flex items-center justify-center w-screen h-screen">
	<div class="lg:w-1/4">
		<h1 class="text-xl font-semibold text-accent p-2">Configurazione Amministratore</h1>
		<div class="bg-accent p-4 rounded-md">
			<form action="?/setup" method="post">
				<div class="pb-4">
					<label for="password" class="text-primary">Password Amministratore</label>
					<input
						type="password"
						name="password"
						id="password"
						class="p-2 bg-primary text-accent w-full rounded-md"
						placeholder="Password"
						required
					/>
				</div>
				<button type="submit" class="p-2 bg-primary text-accent rounded-md w-full">Imposta</button>
			</form>
		</div>
	</div>
</div>
