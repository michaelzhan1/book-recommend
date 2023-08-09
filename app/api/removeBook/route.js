import { pool } from '@/utils/database';


export async function POST(request) {
  const body = await request.json()
  const { username, volumeId } = body;

  try {
    const client = await pool.connect();
    await client.query('DELETE FROM books WHERE username = $1 AND volumeid = $2', [username, volumeId]);
    client.release();
    return new Response('Book removed', {
      status: 200,
    });
  } catch (error) {
    console.log('Error during removing book', error);
    return new Response('Internal server error',{
      status: 500,
    })
  }
}