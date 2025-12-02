<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { currentUser, currentUserDoc } from "$lib/store";
  import { setDoc, getFirestore, doc } from "firebase/firestore";
  import { Input } from "$lib/components/ui/input/index.js";

  import z from "zod";
  import { superForm, defaults } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";

  let { questions }: { questions: { text: string; id: string }[] } = $props();

  const schema = z.object({
    name: z.string().min(3).max(60),
    answers: z.object(
      questions.reduce(
        (acc, q) => ({
          ...acc,
          [q.id]: z.string().min(3).max(60),
        }),
        {}
      )
    ),
  });

  function findUserAnswer(id: string) {
    if (!$currentUserDoc?.data()?.answers) return;
    return $currentUserDoc.data().answers[id];
  }

  const data = {
    name: ($currentUserDoc?.data().name as string) || "", // TODO: dirty
    answers: questions.reduce(
      (acc, q) => ({
        ...acc,
        [q.id]: findUserAnswer(q.id) || "",
      }),
      {}
    ),
  };

  const form = superForm(defaults(data, zod4(schema)), {
    validators: zod4(schema),
    SPA: true,
    dataType: "json",
    async onUpdate({ form }) {
      if (!form.valid) return;
      if (!$currentUser) return;
      try {
        const db = getFirestore();
        const userDoc = doc(db, "users", $currentUser.uid);
        await setDoc(userDoc, form.data, { merge: true });
        return goto("/register/success");
      } catch (error) {
        console.error(error);
        alert("Registration failed");
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="flex flex-col gap-6">
  <Form.Field {form} name={"name"}>
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>What is your name?</Form.Label>
        <Input {...props} bind:value={$formData.name} />
      {/snippet}
    </Form.Control>
    <Form.Description>Nicknames are OK</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  {#each questions as question}
    <Form.Field {form} name={`answers.${question.id}`}>
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label>{question.text}</Form.Label>
          <Input {...props} bind:value={$formData.answers[question.id]} />
        {/snippet}
      </Form.Control>
      <!-- <Form.Description>
        {question.id}: {$formData.answers[question.id]}
      </Form.Description> -->
      <Form.FieldErrors />
    </Form.Field>
  {/each}

  <div class="flex justify-center">
    <Form.Button>Submit</Form.Button>
  </div>
</form>
