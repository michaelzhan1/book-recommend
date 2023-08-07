'use client'


import Search from '@/components/Search'
import CurrentBooks from '@/components/CurrentBooks'
import { useState } from 'react';


export default function Books (props) {
  const [bookList, setBookList] = useState([]);

  const handleAdd = (book) => {
    setBookList([...bookList, book]);
  }

  return (
    <>
      <Search handleAdd={handleAdd}/>
      <CurrentBooks bookList={bookList}/>
    </>
  )
}