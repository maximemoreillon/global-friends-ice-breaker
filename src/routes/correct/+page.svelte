<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import TrophyIcon from "@lucide/svelte/icons/trophy";
</script>

<div class="flex flex-col gap-4 items-center">
  <div class="text-3xl">Correct!</div>
  <TrophyIcon size="128" />
  <Button href="/play">Next question</Button>
</div>
