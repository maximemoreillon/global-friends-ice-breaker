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
  } from "firebase/firestore";
  import { Input } from "$lib/components/ui/input/index.js";

  import z from "zod";
  import { superForm, defaults, type SuperForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import RegisterForm from "$lib/components/registerForm.svelte";

  // let { data } = $props();

  // const schema = z.object(
  //   data.questions.reduce(
  //     (acc, q) => ({
  //       ...acc,
  //       [q.id]: z.string().min(3).max(60),
  //     }),
  //     {}
  //   )
  // );

  // const initialData = data.questions.reduce(
  //   (acc, q) => ({
  //     ...acc,
  //     [q.id]: "",
  //   }),
  //   {}
  // );

  // let question

  let loading = $state(false);

  let questions = $state<{ id: string; text: string }[]>([]);

  onMount(() => {
    loading = true;
    currentUser.subscribe(async (user) => {
      if (!user) return;
      const db = getFirestore();

      const q = query(collection(db, "questions"));

      const querySnapshot = await getDocs(q);

      questions = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));

      loading = false;
    });
  });
</script>

<RegisterForm {questions} />
