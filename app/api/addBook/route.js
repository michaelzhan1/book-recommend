import { pool } from '@/utils/database';


export async function POST(request) {
  const body = await request.json();
  const { username, volumeId, title, authors, description, categories, thumbnailUrl } = body;

  try {
    const client = await pool.connect();
    const bookPresent = await client.query('SELECT * FROM books WHERE volumeid = $1 and username = $2', [volumeId, username]);
    if (bookPresent.rows.length > 0) {
      client.release();
      return new Response('Book already present', {
        status: 400
      });
    }

    await client.query('INSERT INTO books (username, volumeid, title, authors, description, categories, thumbnailurl) VALUES ($1, $2, $3, $4, $5, $6, $7)', [username, volumeId, title, authors, description, categories, thumbnailUrl]);

    client.release();
    return new Response('Book added', {
      status: 200,
    });
  } catch (error) {
    client.release();
    console.log('Error during adding book', error);
    return new Response('Internal server error',{
      status: 500,
    })
  }
}