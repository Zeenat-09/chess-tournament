<script>
let {data} = $props();
</script>
<h1>Tournaments</h1>
<form method="POST" action="?/create">
  <input name="name" placeholder="Tournament name" required />
  <button type="submit">Add Tournament</button>
</form>
{#each data.tournaments as tournament}
<div>{tournament.name}
<form method="POST" action="?/delete" style="display:inline">
<input type='hidden' name='id' value={tournament.id} />
<button type='submit'>Delete</button>
</form>
<form method="POST" action="?/update" style="display:inline">
  <input type="hidden" name="id" value={tournament.id} />
  <input name="name" value={tournament.name} />
  <button type="submit">Update</button>
</form>
</div>
{/each}