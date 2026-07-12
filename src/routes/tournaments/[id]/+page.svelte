<script>
let {data} = $props();
</script>

<h1>Tournament #{data.tournamentId}</h1>

<h2>Already in tournament:</h2>
{#each data.joinedPlayers as player}
  <div>{player.name}
    <form method="POST" action="?/removePlayer" style="display:inline">
      <input type="hidden" name="tournamentId" value={data.tournamentId} />
      <input type="hidden" name="playerId" value={player.id} />
      <button type="submit">Remove</button>
    </form>
  </div>
{/each}

<h2>All players:</h2>
{#each data.allPlayers as player}
  <form method="POST" action="?/addPlayer" style="display:inline">
    <input type="hidden" name="tournamentId" value={data.tournamentId} />
    <input type="hidden" name="playerId" value={player.id} />
    <button type="submit">{player.name} - Add</button>
  </form>
{/each}
<form method="POST" action="?/generateMatches">
  <input type="hidden" name="tournamentId" value={data.tournamentId} />
  <button type="submit">Generate Matches</button>
</form>
<h2>Matches:</h2>
{#each data.matches as match}
  <p>{match.player1_name} vs {match.player2_name} — Winner: {match.winner_name}</p>
{/each}
<h2>Rankings:</h2>
{#each data.rankings as ranking, i}
  <p>{i + 1}. {ranking.name} — {ranking.wins} wins</p>
{/each}