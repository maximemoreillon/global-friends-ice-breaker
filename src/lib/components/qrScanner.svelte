<script lang="ts">
  import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
  import { onMount } from "svelte";

  const { onScan } = $props();

  function onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    // console.log(`Code matched = ${decodedText}`, decodedResult);
    onScan(decodedText);
  }

  function onScanFailure(error: string) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  let html5QrcodeScanner: Html5QrcodeScanner;

  onMount(() => {
    html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10 },
      /* verbose= */ false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
</script>

<div id="reader" />

<style>
  :global(#reader__scan_region) {
    display: flex;
    justify-content: center;
  }

  :global(#html5-qrcode-anchor-scan-type-change) {
    display: none !important;
  }
</style>
