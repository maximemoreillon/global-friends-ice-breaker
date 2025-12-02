<script lang="ts">
  import ScanQrCodeIcon from "@lucide/svelte/icons/scan-qr-code";
  import QRCode from "@trasherdk/svelte-qrcode";
  import { currentUser } from "$lib/store";

  import Button from "$lib/components/ui/button/button.svelte";
  import QrScanner from "$lib/components/qrScanner.svelte";

  let scanning = $state(false);

  const { onSelect } = $props();

  async function handleScan(scanResult: string) {
    onSelect(scanResult);
  }
</script>

<!-- TODO: componentify this -->
<div class="flex justify-center my-4">
  <Button onclick={() => (scanning = !scanning)} class="">
    <ScanQrCodeIcon />
    {scanning ? "Show my QR code" : "Scan QR code"}
  </Button>
</div>
<div class="flex flex-col items-center">
  {#if scanning}
    <QrScanner onScan={handleScan} />
  {:else if $currentUser}
    <QRCode content={$currentUser.uid} size="256" />
  {/if}
</div>
