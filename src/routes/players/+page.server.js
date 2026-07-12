import {dbPool} from '$lib/server/db.js'; 
export async function load() {
    const result = await dbPool.query('SELECT * FROM players order by created_at desc');
    return {
        players: result.rows
    };
}

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name');
    await dbPool.query('INSERT INTO players (name) VALUES ($1)', [name]);
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id');
    await dbPool.query('DELETE from players where id = $1', [id]);
},
update: async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  await dbPool.query('UPDATE players SET name = $1 WHERE id = $2', [name, id]);
}
};