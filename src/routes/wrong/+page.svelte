<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import XIcon from "@lucide/svelte/icons/x";
</script>

<div class="flex flex-col gap-4 items-center">
  <div class="text-3xl">Wrong</div>
  <XIcon size="128" />
  <Button href="/play">Try another question</Button>
</div>
