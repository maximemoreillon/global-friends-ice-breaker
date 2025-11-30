<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { currentUser } from "$lib/firebase";
  import {
    collection,
    setDoc,
    getFirestore,
    doc,
    updateDoc,
  } from "firebase/firestore";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import z from "zod";
  import {
    type SuperValidated,
    type Infer,
    superForm,
    defaults,
  } from "sveltekit-superforms";
  import { zod4, zod4Client } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";
  // import questions from "$lib/questions";
  // import { zod } from 'sveltekit-superforms/adapters';

  let { data } = $props();

  const schema = z.object(
    data.questions.reduce(
      (acc, q) => ({
        ...acc,
        [q.id]: z.string().min(3).max(60),
      }),
      {}
    )
  );

  const initialData = data.questions.reduce(
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
      if (form.valid) {
        const db = getFirestore();
        const userDoc = doc(db, "users", $currentUser.uid);
        await setDoc(userDoc, { answers: form.data }, { merge: true });
        goto("/play");
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
  {#each data.questions as question}
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
