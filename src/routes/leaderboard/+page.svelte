<script lang="ts">
  import { currentUser, players } from "$lib/store";
</script>

<div class="flex flex-col items-center">
  <h2 class="text-3xl my-4">Leaderboard</h2>
  <table class="w-full max-w-md">
    <thead>
      <tr class="border-b-2">
        <th class="p-1">Player</th>
        <th>Points</th>
      </tr>
    </thead>
    <tbody>
      {#each $players.toSorted((a, b) => (b.data().score || 0) - (a.data().score || 0)) as player}
        <tr
          class={"border-t text-center " +
            ($currentUser?.uid === player.id ? "bg-secondary" : "")}
        >
          <td class="p-1">{player.data().name || "Anonymous"} </td>
          <td class="">
            {player.data().score || 0}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
