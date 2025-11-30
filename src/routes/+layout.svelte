<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/firebase";
  import { getAuth, signInAnonymously } from "firebase/auth";
  import { onMount } from "svelte";
  import { doc, getFirestore, setDoc } from "firebase/firestore";
  import { currentUser } from "$lib/firebase";
  import PlayerCount from "$lib/components/playerCount.svelte";
  import Score from "$lib/components/score.svelte";

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

<header class="flex p-2 items-center gap-2">
  <h1 class="text-2xl">Ice breaker</h1>
  <nav class="flex gap-2 text-xl">
    <a href="/register">Join</a>

    <a href="/play">play</a>
  </nav>

  <div class="flex-grow-1" />
  <Score />
  <PlayerCount />
</header>

<main class="max-w-3xl mx-auto my-8">
  {#if authReady}
    {@render children()}
  {:else}
    <div>Waiting for auth</div>
  {/if}
</main>
