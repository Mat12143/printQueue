<script lang="ts">
    export let type: "long" | "short"
</script>
<div
    class:lg:max-h-[700px]={type == "long"}
	class="grid gap-2 overflow-x-hidden overflow-y-auto max-h-[230px] text-primary"
>
	<slot />
</div>
