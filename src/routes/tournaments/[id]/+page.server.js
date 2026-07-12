import { dbPool } from '$lib/server/db.js';

export async function load({params}) {
const tournamentId = params.id;
const playersResult = await dbPool.query('SELECT * FROM players');
const joinedResult = await dbPool.query(
  'SELECT players.id, players.name FROM tournament_players JOIN players ON tournament_players.player_id = players.id WHERE tournament_players.tournament_id = $1',
  [tournamentId]
);
const matchesResult = await dbPool.query(
  `SELECT matches.id, p1.name AS player1_name, p2.name AS player2_name, w.name AS winner_name
   FROM matches
   JOIN players p1 ON matches.player1_id = p1.id
   JOIN players p2 ON matches.player2_id = p2.id
   JOIN players w ON matches.winner_id = w.id
   WHERE matches.tournament_id = $1`,
  [tournamentId]
);
const rankingsResult = await dbPool.query(
  `SELECT players.name, COUNT(matches.winner_id) AS wins
   FROM matches
   JOIN players ON matches.winner_id = players.id
   WHERE matches.tournament_id = $1
   GROUP BY players.name
   ORDER BY wins DESC
   LIMIT 3`,
  [tournamentId]
);
return {
  tournamentId,
  allPlayers: playersResult.rows,
  joinedPlayers: joinedResult.rows,
  matches: matchesResult.rows,
  rankings: rankingsResult.rows
}
}
export const actions = {
  addPlayer: async ({ request }) => {
    const formData = await request.formData();
    const tournamentId = formData.get('tournamentId');
    const playerId = formData.get('playerId');
    await dbPool.query('INSERT INTO tournament_players (tournament_id, player_id) VALUES ($1, $2)', [tournamentId, playerId]);
  },
generateMatches: async ({ request }) => {
  const formData = await request.formData();
  const tournamentId = formData.get('tournamentId');

  const playersResult = await dbPool.query(
    'SELECT players.id FROM tournament_players JOIN players ON tournament_players.player_id = players.id WHERE tournament_players.tournament_id = $1',
    [tournamentId]
  );
  const players = playersResult.rows;

  // shuffle
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  // pair and save matches
  for (let i = 0; i < players.length - 1; i += 2) {
    const player1 = players[i].id;
    const player2 = players[i + 1].id;
    const winner = Math.random() < 0.5 ? player1 : player2;
    await dbPool.query(
      'INSERT INTO matches (tournament_id, player1_id, player2_id, winner_id) VALUES ($1, $2, $3, $4)',
      [tournamentId, player1, player2, winner]
    );
  }
},
removePlayer: async ({ request }) => {
  const formData = await request.formData();
  const tournamentId = formData.get('tournamentId');
  const playerId = formData.get('playerId');
  await dbPool.query('DELETE FROM tournament_players WHERE tournament_id = $1 AND player_id = $2', [tournamentId, playerId]);
}
};