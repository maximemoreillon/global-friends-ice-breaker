<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";

  import { currentUser } from "$lib/store";
  import { collection, getFirestore, getDocs, query } from "firebase/firestore";

  import { onMount } from "svelte";
  import RegisterForm from "$lib/components/registerForm.svelte";
  const db = getFirestore();

  let loading = $state(false);
  let questions = $state<{ id: string; text: string }[]>([]);

  onMount(() => {
    loading = true;
    currentUser.subscribe(async (user) => {
      if (!user) return;

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

<h2 class="text-3xl my-4 text-center">Registration</h2>

{#if loading}
  <div class="flex items-center space-x-4 justify-center">
    <Skeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
{:else}
  <RegisterForm {questions} />
{/if}
