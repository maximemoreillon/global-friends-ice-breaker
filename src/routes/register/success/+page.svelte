<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import CheckIcon from "@lucide/svelte/icons/check";
  import PlayIcon from "@lucide/svelte/icons/play";
</script>

<div class="flex flex-col gap-4 items-center">
  <CheckIcon size="128" />
  <div class="text-2xl">Registration successful!</div>
  <Button class="my-4" href="/play">
    <PlayIcon />
    Start playing
  </Button>
</div>
