<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { currentUser } from "$lib/firebase";
  import { setDoc, getFirestore, doc } from "firebase/firestore";
  import { Input } from "$lib/components/ui/input/index.js";

  import z from "zod";
  import { superForm, defaults } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";

  let { questions }: { questions: { text: string; id: string }[] } = $props();

  const schema = z.object(
    questions.reduce(
      (acc, q) => ({
        ...acc,
        [q.id]: z.string().min(3).max(60),
      }),
      {}
    )
  );

  const initialData = questions.reduce(
    (acc, q) => ({
      ...acc,
      [q.id]: "",
    }),
    {}
  );

  const form = superForm(defaults(initialData, zod4(schema)), {
    validators: zod4(schema),
    SPA: true,
    async onUpdate({ form }) {
      if (!form.valid) return;
      if (!$currentUser) return;
      try {
        const db = getFirestore();
        const userDoc = doc(db, "users", $currentUser.uid);
        await setDoc(userDoc, { answers: form.data }, { merge: true });
        alert("Success");
        return goto("/play");
      } catch (error) {
        console.error(error);
        alert("Problem");
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  {#each questions as question}
    <Form.Field {form} name={question.id}>
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>{question.text}</Form.Label>
          <Input {...props} bind:value={$formData[question.id]} />
        {/snippet}
      </Form.Control>
      <Form.Description>E.g. Spahetti</Form.Description>
      <Form.FieldErrors />
    </Form.Field>
  {/each}

  <Form.Button>Submit</Form.Button>
</form>
