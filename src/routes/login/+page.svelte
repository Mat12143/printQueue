<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';

    export let form : { error: boolean, message: string | null }

    onMount(() => {
        if (form?.error && form?.message) toast.push(form?.message)
    })

</script>

<div class="flex items-center justify-center w-screen h-screen">
	<div class="lg:w-1/4">
		<h1 class="text-xl font-semibold text-accent p-2">Admin Panel</h1>
		<div class="bg-accent p-4 rounded-md">
			<form action="?/login" method="post">
				<div class="pb-4">
					<label for="password" class="text-primary">Password</label>
					<input
						type="password"
                        name="password"
                        id="password"
						class="p-2 bg-primary text-accent w-full rounded-md"
						placeholder="Password"
						required
					/>
				</div>
				<button type="submit" class="p-2 bg-primary text-accent rounded-md w-full">Accedi</button>
			</form>
			<div class="pt-2">
				<a class="text-primary text-base underline" href="/">Password dimenticata?</a>
			</div>
		</div>
	</div>
</div>
