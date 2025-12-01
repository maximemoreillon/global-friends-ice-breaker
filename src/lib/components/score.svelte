<script lang="ts">
  import TrophyIcon from "@lucide/svelte/icons/trophy";
  import { currentUser } from "$lib/firebase";
  import { getFirestore, doc, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  import Button from "./ui/button/button.svelte";

  let loading = $state(false);

  let score = $state(0);

  const subscribeToData = () => {
    // if (unsub) unsub()
    if (!$currentUser) return;

    const db = getFirestore();

    const userDocRef = doc(db, "users", $currentUser.uid);

    onSnapshot(userDocRef, (docSnap) => {
      score = docSnap.data()?.score || 0;
    });
  };

  onMount(() => {
    loading = true;
    currentUser.subscribe(async (user) => {
      if (!user) return;
      subscribeToData();

      loading = false;
    });
  });
</script>

<div class="flex items-center gap-1">
  <TrophyIcon />
  <span>{score}</span>
</div>
