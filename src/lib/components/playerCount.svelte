<script lang="ts">
  import UserIcon from "@lucide/svelte/icons/user";
  import { players } from "$lib/store";
</script>

<div class="flex items-center gap-1">
  <UserIcon />
  <span>{$players.length}</span>
</div>
