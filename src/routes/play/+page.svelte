<script lang="ts">
  import { currentUser } from "$lib/firebase";
  import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
  } from "firebase/firestore";
  import { onMount } from "svelte";

  let targetUser = $state<any>(null);

  let answer = $state("");

  async function handleSumit() {}

  onMount(async () => {
    currentUser.subscribe(async (user) => {
      if (!user) return;
      console.log("HERE");
      const db = getFirestore();
      const q = query(collection(db, "users"));

      const querySnapshot = await getDocs(q);

      const randIndex = Math.floor(Math.random() * querySnapshot.size);

      targetUser = querySnapshot.docs.at(randIndex)?.data();

      console.log(targetUser);
    });
  });
</script>

Find someone who's favorite food is: {targetUser?.favoriteFood || "Loading..."}

<form on:submit|preventDefault={handleSumit}>
  <div>
    <label for="name">Answer:</label>
    <input
      id="name"
      type="text"
      bind:value={answer}
      class="border border-grey rounded"
    />
  </div>
</form>
