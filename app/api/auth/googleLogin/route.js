import { pool } from '@/utils/database';
import { hash } from 'bcrypt';


export async function POST(request) {
  const body = await request.json();
  const { email } = body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [email]);
    if (result.rows.length === 0) {
      const newPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await hash(newPassword, 10);
      await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [email, hashedPassword]);
    }
    client.release();
    return new Response('User registered', {
      status: 200,
    });
  } catch (error) {
    console.log('Error during registration', error);
    return new Response('Internal server error', {
      status: 500,
    })
  }
}