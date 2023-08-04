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
      return {
        status: 409,
        body: {
          error: 'Username already exists'
        }
      }
    }

    const hashedPassword = await hash(password, 10);
    await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    client.release();

    return new Response({
      status: 200,
      body: {
        message: 'User registered'
      }
    });
  } catch (error) {
    console.log('Error during registration', error);
    return new Response({
      status: 500,
      body: {
        error: 'Internal server error'
      }
    })
  }
}