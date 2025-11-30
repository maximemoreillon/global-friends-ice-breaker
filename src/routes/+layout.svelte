<script lang="ts">
  import Loader2Icon from "@lucide/svelte/icons/loader-2";
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  import PlayIcon from "@lucide/svelte/icons/play";
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
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
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="flex p-2 items-center gap-4">
  <h1 class="text-2xl">Ice Breaker</h1>
  <div class="flex-grow-1" />

  <nav class="flex gap-2 text-xl">
    <Button href="/register" variant="secondary">
      <UserPlusIcon />
      <span>Join</span>
    </Button>

    <Button href="/play" variant="secondary">
      <PlayIcon />
      <span>Play</span>
    </Button>
  </nav>

  <Score />
  <PlayerCount />
</header>

<main class="max-w-3xl mx-auto my-8">
  {#if authReady}
    {@render children()}
  {:else}
    <div class="flex justify-center">
      <Loader2Icon class="animate-spin" size="72" />
    </div>
  {/if}
</main>
