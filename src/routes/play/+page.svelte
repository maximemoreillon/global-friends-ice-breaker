<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import ScanQrCodeIcon from "@lucide/svelte/icons/scan-qr-code";
  import FrownIcon from "@lucide/svelte/icons/frown";
  import QRCode from "@trasherdk/svelte-qrcode";
  import { currentUser } from "$lib/store";
  import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
    doc,
    getDoc,
    Firestore,
    setDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import QrScanner from "$lib/components/qrScanner.svelte";
  import { goto } from "$app/navigation";
  import { playerIsActive } from "$lib/helpers";

  let question = $state<{ id: string; playText: any }>();
  let target = $state<{ id: string; answer: any } | null>();
  let loading = $state(false);
  let scanning = $state(false);
  let processing = $state(false);

  const db = getFirestore();

  async function getQuestion() {
    const q = query(collection(db, "questions"));
    const querySnapshot = await getDocs(q);
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);
    const randomDoc = querySnapshot.docs[randomIndex];
    return { id: randomDoc.id, playText: randomDoc.data().playText };
  }

  async function getTarget(questionId: string) {
    const q = query(
      collection(db, "users"),
      where(`answers.${questionId}`, "!=", null)
      // where("id", "!=", $currentUser?.uid) // Does not work
      // where("lastCheckIn", ">", oneHourAgo) // Does not work
    );

    const querySnapshot = await getDocs(q);
    const filteredDocs = querySnapshot.docs.filter(
      (doc) => doc.id !== $currentUser?.uid && playerIsActive(doc)
    );

    if (!filteredDocs.length) return null;

    const randomIndex = Math.floor(Math.random() * filteredDocs.length);
    const randomDoc = filteredDocs[randomIndex];
    const answer = randomDoc.data().answers[questionId];
    return { id: randomDoc.id, answer };
  }

  async function incrementScore() {
    if (!$currentUser) return;
    const currentUserDoc = doc(db, "users", $currentUser.uid);
    const currentUserDocSnap = await getDoc(currentUserDoc);
    if (!currentUserDocSnap.exists()) return;
    const score = (currentUserDocSnap.data().score || 0) + 1;
    await setDoc(currentUserDoc, { score }, { merge: true });
  }

  async function handleScan(scanResult: string) {
    if (!target || !question) return;
    if (processing) return;
    processing = true;
    try {
      const scannedUserDocRef = doc(db, "users", scanResult);
      const scannedUserDocSnap = await getDoc(scannedUserDocRef);
      if (!scannedUserDocSnap.exists()) throw new Error("User does not exist");
      const scannedUserAnswers = scannedUserDocSnap.data().answers;
      if (!scannedUserAnswers) return goto("/play/wrong");
      const scannedUserAnswer = scannedUserAnswers[question.id];
      if (scannedUserAnswer !== target.answer) return goto("/play/wrong");
      await incrementScore();
      goto("/play/correct");
    } catch (error) {
      processing = false;
    }
  }

  onMount(() => {
    loading = true;
    currentUser.subscribe(async (user) => {
      if (!user) return;
      question = await getQuestion();
      target = await getTarget(question.id);
      loading = false;
    });
  });
</script>

{#if loading}
  <div class="flex items-center space-x-4 justify-center">
    <Skeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
{:else if question && target}
  <div class="text-center">
    <div class="text-xl">
      {question.playText}
    </div>

    <div class="text-3xl my-2">
      {target.answer}
    </div>
  </div>

  {#if $currentUser}
    <div class="flex justify-center my-4">
      <Button onclick={() => (scanning = !scanning)} class="">
        <ScanQrCodeIcon />
        {scanning ? "Show my QR code" : "Scan QR code"}
      </Button>
    </div>
    <div class="flex flex-col items-center">
      {#if scanning}
        <QrScanner onScan={handleScan} />
      {:else}
        <QRCode content={$currentUser.uid} size="256" />
      {/if}
    </div>
  {/if}
{:else if target === null}
  <div class="flex flex-col gap-2 items-center">
    <FrownIcon size="78" />
    <div>No available player</div>
  </div>
{/if}

<AlertDialog.Root bind:open={processing}>
  <!-- <AlertDialog.Trigger>Open</AlertDialog.Trigger> -->
  <AlertDialog.Content class="w-xs">
    <AlertDialog.Header>
      <AlertDialog.Title class="text-center">Checking...</AlertDialog.Title>
      <AlertDialog.Description class="flex justify-center">
        <Spinner class="size-18" />
      </AlertDialog.Description>
    </AlertDialog.Header>
    <!-- <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer> -->
  </AlertDialog.Content>
</AlertDialog.Root>
