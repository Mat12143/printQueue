<script lang="ts">
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	const options = {
		theme: {
			'--toastBarHeight': 0,
			'--toastColor': 'white',
			'--toastBackground': '#24a543',
            "--toastBorderRadius" : "6px"
		}
	};
</script>

<slot />

<SvelteToast {options} />
