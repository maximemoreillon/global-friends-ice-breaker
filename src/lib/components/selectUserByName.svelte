<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  import { currentUser, players } from "$lib/store";

  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  // TODO: have this in component
  let selectedPlayerId = $state<string>();

  const { onSelect } = $props();

  async function handlePlayerSelect(id: undefined | string) {
    if (!id) return;
    onSelect(id);
  }

  const triggerText = $derived(
    () =>
      $players.find((p) => p.id === selectedPlayerId)?.data().name ||
      "Select player"
  );

  const playersExceptCurrent = $derived(() =>
    $players.filter((p) => p.id !== $currentUser?.uid)
  );

  onMount(() => {});
</script>

<div class="flex gap-2 justify-center my-4">
  <Select.Root type="single" bind:value={selectedPlayerId}>
    <Select.Trigger class="w-[180px]">
      {triggerText()}
    </Select.Trigger>
    <Select.Content>
      {#each playersExceptCurrent() as player}
        <Select.Item value={player.id}>{player.data().name}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>

  <Button
    disabled={!selectedPlayerId}
    onclick={() => handlePlayerSelect(selectedPlayerId)}>Submit</Button
  >
</div>
