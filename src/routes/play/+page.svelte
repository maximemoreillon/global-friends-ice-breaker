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
  } from "firebase/firestore";
  import { onMount } from "svelte";

  const { data } = $props();

  let scanText = $state("nothing");

  async function handleScan(text: string) {
    scanText = text;
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

<div class="flex justify-center">
  <QrScanner onScan={handleScan} />
</div>

<div class="flex justify-center">
  {#if $currentUser}
    <QRCode content={$currentUser.uid} />
  {/if}
</div>

{scanText}
