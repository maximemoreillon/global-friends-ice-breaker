<script lang="ts">
  import { Html5QrcodeScanner, type Html5QrcodeResult } from "html5-qrcode";
  import { onMount } from "svelte";

  let scanner: Html5QrcodeScanner;

  let { onScan } = $props();

  onMount(() => {
    scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 500, height: 500 } },
      true
    );

    scanner.render(onScanSuccess, onScanFailure);
  });

  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);

    onScan(decodedText);
  }

  function onScanFailure(error: string) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }
</script>

<div id="reader" />

<style>
  :global(#html5-qrcode-anchor-scan-type-change) {
    display: none;
  }
</style>
