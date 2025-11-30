<script lang="ts">
  import { currentUser } from "$lib/firebase";
  import { collection, getFirestore, getDocs, query } from "firebase/firestore";

  import { onMount } from "svelte";
  import RegisterForm from "$lib/components/registerForm.svelte";

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
