<script lang="ts">
  import EasyQrcodeReader from "@cloudparker/easy-qrcode-reader-svelte";
  import { onMount } from "svelte";

  let qrcodeReaderRef: EasyQrcodeReader;
  let clientWidth: number;

  const { onScan } = $props();

  // onMount(() => {
  //   return () => {
  //     qrcodeReaderRef && qrcodeReaderRef.close();
  //   };
  // });
</script>

<div class="camera-container" bind:clientWidth>
  <EasyQrcodeReader
    bind:this={qrcodeReaderRef}
    width={clientWidth}
    onQrcode={onScan}
  />
</div>

<style>
  .camera-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
