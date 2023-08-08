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

  return (
    <>
      <Search handleAdd={handleAdd}/>
      <CurrentBooks bookList={bookList}/>
    </>
  )
}