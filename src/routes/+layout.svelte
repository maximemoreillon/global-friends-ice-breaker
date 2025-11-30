<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/firebase";
  import { getAuth, signInAnonymously } from "firebase/auth";
  import { onMount } from "svelte";
  import { doc, getFirestore, setDoc } from "firebase/firestore";
  import { currentUser } from "$lib/firebase";

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

<header class="flex justify-between p-2">
  <h1 class="text-2xl">Ice breaker</h1>
  <nav class="flex gap-2 text-xl">
    <a href="/register">Join</a>

    <a href="/play">play</a>
  </nav>
</header>

<main class="max-w-3xl mx-auto my-8">
  {#if authReady}
    {@render children()}
  {/if}
</main>
