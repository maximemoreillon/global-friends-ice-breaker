<script lang="ts">
  import TrophyIcon from "@lucide/svelte/icons/trophy";
  import { currentUserDoc } from "$lib/store";
</script>

<div class="flex items-center gap-1">
  <TrophyIcon />
  <span>{$currentUserDoc?.data().score || 0}</span>
</div>
