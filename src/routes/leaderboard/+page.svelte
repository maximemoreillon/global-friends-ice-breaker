<script lang="ts">
  import { currentUser } from "$lib/firebase";
  import { playerIsActive } from "$lib/helpers";
  import {
    collection,
    getFirestore,
    query,
    onSnapshot,
    where,
    type DocumentData,
  } from "firebase/firestore";

  import { onMount } from "svelte";

  let loading = $state(false);

  let players = $state<DocumentData[]>([]);

  const subscribeToData = () => {
    // if (unsub) unsub()
    if (!$currentUser) return;

    const db = getFirestore();

    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where(`answers`, "!=", null));

    onSnapshot(q, ({ docs }) => {
      players = docs
        // .filter((d) => d.data().score !== undefined)
        .filter(playerIsActive)
        .toSorted((a, b) => (b.data().score || 0) - (a.data().score || 0));
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

<h2 class="text-3xl">Leaderboard</h2>
{#if $currentUser}
  <ul class="my-2">
    {#each players as player}
      <li>
        <span>
          {player.id} : {player.data().score || 0}
        </span>

        {#if $currentUser.uid === player.id}
          <span> (you)</span>
        {/if}
      </li>
    {/each}
    <li></li>
  </ul>
{/if}
