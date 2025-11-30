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
    Firestore,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  let question = $state<{ id: string; playText: any }>();
  let target = $state<{ id: string; answer: any } | null>();

  async function getQuestion(db: Firestore) {
    const q = query(collection(db, "questions"));
    const querySnapshot = await getDocs(q);
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);
    const randomDoc = querySnapshot.docs[randomIndex];
    return { id: randomDoc.id, playText: randomDoc.data().playText };
  }

  async function getTarget(db: Firestore, questionId: string) {
    // TODO: fetch users that are checked in

    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    const q = query(
      collection(db, "users"),
      where("answers", "!=", null)
      // where("id", "!=", $currentUser?.uid) // Does not work
      // where("lastCheckIn", ">", oneHourAgo)
    );

    const querySnapshot = await getDocs(q);
    // Filtering after query to bypass multiple != operations
    const filteredDocs = querySnapshot.docs.filter((doc) => {
      // console.log(doc.data().lastCheckIn.seconds);
      return (
        doc.id !== $currentUser?.uid &&
        doc.data().lastCheckIn.seconds * 1000 > oneHourAgo.getTime()
      );
    });

    if (!filteredDocs.length) return null;

    const randomIndex = Math.floor(Math.random() * filteredDocs.length);
    const randomDoc = filteredDocs[randomIndex];
    const answer = randomDoc.data().answers[questionId];
    return { id: randomDoc.id, answer };
  }

  let scanning = $state(true);

  async function handleScan(text: string) {
    if (!target || !question) return;
    scanning = false;
    const db = getFirestore();
    const docRef = doc(db, "users", text);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const scannedUserAnswers = docSnap.data().answers;
    if (!scannedUserAnswers) return;
    const scannedUserAnswer = scannedUserAnswers[question.id];
    if (scannedUserAnswer === target.answer) alert("Hurray!");
    else alert("Wrong!");
  }

  let loading = $state(false);

  onMount(() => {
    loading = true;
    currentUser.subscribe(async (user) => {
      if (!user) return;
      const db = getFirestore();

      question = await getQuestion(db);
      target = await getTarget(db, question.id);
      loading = false;
    });
  });
</script>

{#if loading}
  <div>Loading</div>
{:else if question && target}
  <div class="text-center">
    <div class="text-xl">
      {question.playText}
    </div>

    <div class="text-3xl">
      {target.answer}
    </div>
  </div>

  {#if $currentUser}
    <div class="flex justify-center my-4">
      <div class="flex flex-col items-center">
        <Button onclick={() => (scanning = !scanning)} class="my-4">
          {scanning ? "Show my QR code" : "Scan QR code"}
        </Button>
        {#if scanning}
          <QrScanner onScan={handleScan} />
        {:else}
          <QRCode content={$currentUser.uid} />
        {/if}
      </div>
    </div>
  {/if}
{:else if target === null}
  No available player
{/if}
