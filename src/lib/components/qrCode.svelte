<script lang="ts">
  import { onMount } from "svelte";
  import QRCode from "qrcodejs";

  export let value = "Default QR code content";
  let qrCodeContainer: HTMLElement;

  onMount(() => {
    new QRCode(qrCodeContainer, {
      text: value,
      width: 512,
      height: 512,
    });
  });
</script>

<div bind:this={qrCodeContainer}></div>
