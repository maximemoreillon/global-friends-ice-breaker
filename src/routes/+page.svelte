<script lang="ts">
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  import PlayIcon from "@lucide/svelte/icons/play";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<div class="text-3xl text-center my-6">Global Friends Ice Breaker</div>

<div class="flex gap-4 justify-center flex-col items-center">
  <Button href="/register">
    <UserPlusIcon />
    <span>Register your info to join the game</span>
  </Button>

  <Button href="/play">
    <PlayIcon />
    <span>Start playing</span>
  </Button>
</div>
