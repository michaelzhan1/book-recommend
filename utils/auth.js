import { compare } from 'bcrypt';
import { pool } from '@/utils/database';


export async function verifyPassword(credentials) {
  const { username, password } = credentials;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    client.release();
    
    if (result.rows.length === 0) {
      throw new Error('No user found');
    }

    const user = result.rows[0];

    if (await compare(password, user.password)) {
      return user;
    } else {
      throw new Error('Password does not match');
    }
  } catch {
    throw new Error('Database error');
  }
}