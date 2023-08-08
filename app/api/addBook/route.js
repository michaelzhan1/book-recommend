import { pool } from '@/utils/database';


export async function POST(request) {
  const body = await request.json();
  const { username, volumeId, title, authors, description, categories, thumbnailUrl } = body;

  try {
    const client = await pool.connect();
    const bookPresent = await client.query('SELECT * FROM books WHERE volumeid = $1 and username = $2', [volumeId, username]);
    if (bookPresent.rows.length > 0) {
      client.release();
      return new Response({
        status: 409,
        body: {
          error: 'Book already exists'
        }
      });
    }

    await client.query('INSERT INTO books (username, volumeid, title, authors, description, categories, thumbnailurl) VALUES ($1, $2, $3, $4, $5, $6, $7)', [username, volumeId, title, authors, description, categories, thumbnailUrl]);

    client.release();
    return new Response({
      status: 200,
      body: {
        message: 'Book added'
      }
    });
  } catch (error) {
    client.release();
    console.log('Error during adding book', error);
    return new Response({
      status: 500,
      body: {
        error: 'Internal server error'
      }
    })
  }
}