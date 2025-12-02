<script lang="ts">
  import { currentUser, players } from "$lib/store";
</script>

<h2 class="text-3xl">Leaderboard</h2>
{#if $currentUser}
  <ul class="my-2">
    {#each $players.toSorted((a, b) => (b.data().score || 0) - (a.data().score || 0)) as player}
      <li>
        <span>
          {player.data().name || "Anonymous"} : {player.data().score || 0}
        </span>

        {#if $currentUser.uid === player.id}
          <span> (you)</span>
        {/if}
      </li>
    {/each}
    <li></li>
  </ul>
{/if}
