<script lang="ts">
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  import PlayIcon from "@lucide/svelte/icons/play";
  import Button from "$lib/components/ui/button/button.svelte";
  import favicon from "$lib/assets/ice-break.png";
</script>

<div class="flex flex-col items-center">
  <img src={favicon} alt="" class="h-42" />
  <div class="my-6 flex flex-col items-center">
    <div class="text-3xl">Global Friends Ice Breaker</div>
    <div class="">Meet new people, get points</div>
  </div>
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
</div>
