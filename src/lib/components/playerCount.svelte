<script lang="ts">
  import UserIcon from "@lucide/svelte/icons/user";
  import { currentUser } from "$lib/firebase";
  import {
    collection,
    getFirestore,
    query,
    onSnapshot,
  } from "firebase/firestore";

  import { onMount } from "svelte";

  let loading = $state(false);

  let userCount = $state(0);

  const subscribeToData = () => {
    // if (unsub) unsub()
    if (!$currentUser) return;

    const db = getFirestore();

    const collectionRef = collection(db, "users");
    const q = query(collectionRef);

    onSnapshot(q, ({ docs }) => {
      userCount = docs.reduce((acc, doc) => {
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        const isOnline =
          doc.data().lastCheckIn.seconds * 1000 > oneHourAgo.getTime();

        if (isOnline) return acc + 1;
        else return acc;
      }, 0);
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
  <UserIcon />
  <span>{userCount}</span>
</div>
