<script lang="ts">
  import QrScanner from "$lib/components/qrScanner.svelte";
  import QRCode from "@trasherdk/svelte-qrcode";
  import Input from "$lib/components/ui/input/input.svelte";
  import { currentUser } from "$lib/firebase";
  // import QrCode from "$lib/qrCode.svelte";
  import {
    collection,
    query,
    where,
    getDocs,
    getFirestore,
    doc,
    getDoc,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  const { data } = $props();

  let scanning = $state(false);

  async function handleScan(text: string) {
    scanning = false;
    const db = getFirestore();
    const docRef = doc(db, "users", text);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const scannedUserAnswers = docSnap.data().answers;
    if (!scannedUserAnswers) return;
    const scannedUserAnswer = scannedUserAnswers[data.question.id];
    if (scannedUserAnswer === data.target.answer) alert("Hurray!");
    else alert("Wrong!");
  }
</script>

<div class="text-center">
  <div class="text-xl">
    {data.question.playText}
  </div>

  <div class="text-3xl">
    {data.target.answer}
  </div>
</div>

{#if $currentUser}
  <div class="flex justify-center">
    <div class="flex flex-col items-center">
      {#if scanning}
        <Button onclick={() => (scanning = false)}>Show QR code</Button>

        <QrScanner onScan={handleScan} />
      {:else}
        <Button onclick={() => (scanning = true)}>QR scanner</Button>
        <QRCode content={$currentUser.uid} />
      {/if}
    </div>
    <!-- TODO: find library that does not record audio -->
  </div>
{/if}
