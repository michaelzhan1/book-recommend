import { pool } from '@/utils/database';


export async function POST(request) {
  const books = [];
  const body = await request.json();
  const { username } = body;
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT * FROM books WHERE username = $1', [username]);
    for (let row of res.rows) {
      books.push({
        bookId: row.volumeid,
        bookProps: {
          title: row.title,
          authors: row.authors?.split(','),
          description: row.description,
          categories: row.categories?.split(','),
          imageLinks: {
            smallThumbnail: row.thumbnailurl
          }
        }
      })
    }
    client.release();
    return new Response(JSON.stringify(books), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log('Error during fetching books', error);
    return new Response('Internal server error',{
      status: 500,
    })
  }
}