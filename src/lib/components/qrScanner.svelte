<script lang="ts">
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount } from "svelte";

  const { onScan } = $props();
  let html5QrCode: Html5Qrcode;

  function onScanSuccess(decodedText: string, decodedResult: any) {
    onScan(decodedText);
    html5QrCode.clear();
  }

  function onScanFailure(error: string) {
    // Nothing
  }

  onMount(async () => {
    html5QrCode = new Html5Qrcode("reader");
    const cameras = await Html5Qrcode.getCameras();
    if (!cameras.length) return alert("No cameras found");
    const opts = {
      fps: 10,
      // qrbox: { width: 250, height: 250 },
    };
    html5QrCode.start(
      { facingMode: "environment" },
      opts,
      onScanSuccess,
      onScanFailure
    );
  });
</script>

<div id="reader" class="max-w-3xl w-full"></div>
