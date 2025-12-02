<script lang="ts">
  import UserPlusIcon from "@lucide/svelte/icons/user-plus";
  import PlayIcon from "@lucide/svelte/icons/play";
  import "./layout.css";
  import favicon from "$lib/assets/ice-break.png";
  import { init as firebaseInit } from "$lib/firebase";
  import { getAuth, signInAnonymously } from "firebase/auth";
  import { onMount } from "svelte";
  import PlayerCount from "$lib/components/playerCount.svelte";
  import Score from "$lib/components/score.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { currentUser, currentUserDoc, players } from "$lib/store";
  import {
    collection,
    doc,
    getFirestore,
    onSnapshot,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
  import { Spinner } from "$lib/components/ui/spinner";
  import { playerIsActive } from "$lib/helpers";
  import { ModeWatcher } from "mode-watcher";
  import DarkModeToggle from "$lib/components/darkModeToggle.svelte";

  firebaseInit();

  let { children } = $props();

  const auth = getAuth();
  const db = getFirestore();

  async function checkIn() {
    if (!$currentUser) return;
    const userDoc = doc(db, "users", $currentUser.uid);
    await setDoc(userDoc, { lastCheckIn: new Date() }, { merge: true });
  }

  const subscribeToPlayers = () => {
    // if (unsub) unsub()
    if (!$currentUser) return;

    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where(`answers`, "!=", null));

    onSnapshot(q, ({ docs }) => {
      players.set(
        docs
          .filter(playerIsActive)
          .toSorted((a, b) => (b.data().score || 0) - (a.data().score || 0))
      );
    });
  };

  const subscribeToUser = () => {
    if (!$currentUser) return;

    const db = getFirestore();

    const userDocRef = doc(db, "users", $currentUser.uid);

    onSnapshot(userDocRef, (docSnap) => {
      currentUserDoc.set(docSnap);
    });
  };

  auth.onAuthStateChanged(async (user) => {
    currentUser.set(user);
    if (!user) return;
    await checkIn();
    setInterval(checkIn, 5 * 60 * 1000);
    subscribeToPlayers();
    subscribeToUser();
  });

  onMount(async () => {
    await signInAnonymously(auth);
  });
</script>

<svelte:head>
  <title>Ice breaker</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<header class="flex p-2 items-center gap-2 border-b">
  <a href="/" class="flex items-center gap-2">
    <img src={favicon} alt="" class="h-8" />
    <h1 class="text-2xl hidden sm:block">Ice Breaker</h1>
  </a>
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

    <Button href="/leaderboard" variant="outline">
      <Score />
      <PlayerCount />
    </Button>
  </nav>

  <DarkModeToggle />
</header>

<main class="max-w-3xl mx-auto my-8 px-2">
  {#if $currentUserDoc}
    {@render children()}
  {:else}
    <div class="flex justify-center">
      <Spinner class="size-18" />
    </div>
  {/if}
</main>
