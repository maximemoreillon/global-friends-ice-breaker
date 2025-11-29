<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/firebase";

  let { children } = $props();

  import { getAuth, signInAnonymously } from "firebase/auth";

  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
      console.log("signed in");
    })
    .catch((error) => {
      // const errorCode = error.code
      // const errorMessage = error.message
      console.error(error);
    });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="flex justify-between p-2">
  <h1 class="text-2xl">Global friends ice breaker</h1>
  <nav class="flex gap-2 text-xl">
    <a href="/register">Register</a>

    <a href="/play">play</a>
  </nav>
</header>

<main class="max-w-3xl mx-auto my-8">
  {@render children()}
</main>
