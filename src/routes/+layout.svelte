<script lang="ts">
  import Loader2Icon from "@lucide/svelte/icons/loader-2";
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  import PlayIcon from "@lucide/svelte/icons/play";
  import "./layout.css";
  import favicon from "$lib/assets/ice-break.png";
  import "$lib/firebase";
  import { getAuth, signInAnonymously } from "firebase/auth";
  import { onMount } from "svelte";
  import PlayerCount from "$lib/components/playerCount.svelte";
  import Score from "$lib/components/score.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  let authReady = $state(false);
  let { children } = $props();

  const auth = getAuth();

  onMount(async () => {
    await signInAnonymously(auth);
    authReady = true;
  });
</script>

<svelte:head>
  <title>Ice breaker</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="flex p-2 items-center gap-4 border-b">
  <img src={favicon} alt="" class="h-8" />
  <h1 class="text-2xl hidden sm:block">Ice Breaker</h1>
  <div class="grow"></div>

  <nav class="flex gap-2 text-xl">
    <Button href="/register">
      <UserPlusIcon />
      <span class="hidden sm:inline">Join</span>
    </Button>

    <Button href="/play">
      <PlayIcon />
      <span class="hidden sm:inline">Play</span>
    </Button>
  </nav>

  <Score />
  <PlayerCount />
</header>

<main class="max-w-3xl mx-auto my-8 px-2">
  {#if authReady}
    {@render children()}
  {:else}
    <div class="flex justify-center">
      <Loader2Icon class="animate-spin" size="72" />
    </div>
  {/if}
</main>
