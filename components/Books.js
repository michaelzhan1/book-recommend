'use client'


import Search from '@/components/Search'
import CurrentBooks from '@/components/CurrentBooks'
import { useState, useEffect } from 'react';


async function fetchData (username) {
  const res = await fetch('/api/getBooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  });
  const data = await res.json();
  return data;
}


export default function Books (props) {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    async function fetchBooks () {
      const data = await fetchData(props.username);
      setBookList(data);
    }
    fetchBooks();
  }, []);

  const handleAdd = async (book) => {
    const res = await fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.username,
        volumeId: book.bookId,
        title: book.bookProps.title,
        authors: book.bookProps.authors?.join(','),
        description: book.bookProps.description,
        categories: book.bookProps.categories?.join(','),
        thumbnailUrl: book.bookProps.imageLinks?.smallThumbnail
      })
    });
    if (res.ok) {
      console.log('Book added')
      setBookList([...bookList, book]);
    } else {
      console.error('Error adding book');
    }
  }

  const handleRemove = async (book) => {
    console.log(props.username, book.bookId)
    const res = await fetch('/api/removeBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.username,
        volumeId: book.bookId
      }),
    });
    if (!res.ok) {
      console.error('Error removing book');
    } else {
      console.log('Book removed')
      setBookList(bookList.filter(b => b.bookId !== book.bookId));
    }
  }

  return (
    <>
      <div className='flex flex-col items-center mb-4 text-center w-full'>
        <h1 className='text-5xl font-bold text-gray-700 mb-2 leading-snug'>Your bookshelf</h1>
        <Search handleAdd={handleAdd} />
      </div>
      <CurrentBooks bookList={bookList} handleRemove={handleRemove} />
    </>
  )
}