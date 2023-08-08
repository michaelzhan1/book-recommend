'use client'


import Search from '@/components/Search'
import CurrentBooks from '@/components/CurrentBooks'
import { useState } from 'react';


export default function Books (props) {
  const [bookList, setBookList] = useState([]);

  const handleAdd = async (book) => {
    const authorString = book.bookProps.authors?.join(',');
    const res = await fetch('/api/addBook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.username,
        volumeId: book.bookId,
        title: book.bookProps.title,
        authors: authorString,
        description: book.bookProps.description,
        categories: book.bookProps.categories,
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