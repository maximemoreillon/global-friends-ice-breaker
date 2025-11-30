<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { currentUser } from "$lib/firebase";
  import {
    collection,
    setDoc,
    getFirestore,
    doc,
    updateDoc,
    getDocs,
    query,
    onSnapshot,
  } from "firebase/firestore";
  import { Input } from "$lib/components/ui/input/index.js";

  import z from "zod";
  import { superForm, defaults, type SuperForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import RegisterForm from "$lib/components/registerForm.svelte";

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

<div>
  Players: {userCount}
</div>
