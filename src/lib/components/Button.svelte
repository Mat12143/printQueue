<script lang="ts">
    export let href: string
</script>

<a data-sveltekit-reload href={href}><button class="p-2 w-24 bg-accent text-primary rounded-md"><slot/></button></a>
