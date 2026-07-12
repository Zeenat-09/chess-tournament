<script>
let {data} = $props();
</script>
<h1>Players</h1>
<form method="POST" action="?/create">
  <input name="name" placeholder="Player name" required />
  <button type="submit">Add Player</button>
</form>
{#each data.players as player}
<div>{player.name}
<form method="POST" action="?/delete" style="display:inline">
<input type='hidden' name='id' value={player.id} />
<button type='submit'>Delete</button>
</form>
<form method="POST" action="?/update" style="display:inline">
  <input type="hidden" name="id" value={player.id} />
  <input name="name" value={player.name} />
  <button type="submit">Update</button>
</form>
</div>
{/each}
