import { hash } from 'bcrypt';
import { pool } from '@/utils/database';

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      client.release();
      return new Response('User already present', {
        status: 400
      })
    }

    const hashedPassword = await hash(password, 10);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    client.release();

    return new Response('User registered', {
      status: 200,
    });
  } catch (error) {
    client.release();
    console.log('Error during registration', error);
    return new Response('Internal server error', {
      status: 500,
    })
  }
}