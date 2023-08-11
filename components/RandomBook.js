'use client'


import { useState, useRef, useEffect } from 'react';


export default function RandomBook (props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupBook, setPopupBook] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside (e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupOpen(false);
        setPopupBook(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [popupRef]);


  async function handleRandom () {
    const authors = []
    const titles = []
    for (const book of props.bookList) {
      for (const author of book.bookProps.authors) {
        if (!authors.includes(author)) {
          authors.push(author);
        }
      }
      titles.push(book.bookProps.title);
    }
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:%22${randomAuthor.replaceAll(' ', '+')}%22&key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      console.error('Error fetching data:', data);
      alert('Error fetching data')
      return;
    }
    const newBooks = data.items.filter(book => !titles.includes(book.volumeInfo.title));
    const randomBook = newBooks[Math.floor(Math.random() * newBooks.length)];
    setPopupBook(randomBook);
    setPopupOpen(true);
  }

  return (
    <>
      { props.bookList.length > 0 && <button onClick={ handleRandom }>Random Book</button> }
      { popupOpen && popupBook && (
        <div className="absolute bg-black bg-opacity-50 w-full h-screen">
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 w-11/12 lg:w-1/2 px-4 py-3' ref={popupRef}>
            <div className='flex justify-between'>
              <button onClick={ () => {
                setPopupOpen(false)
                setPopupBook(null)
              }}>&#10006;</button>
              <button onClick={ () => {
                props.handleAdd({
                  bookProps: popupBook.volumeInfo,
                  bookId: popupBook.id
                });
                setPopupOpen(false);
                setPopupBook(null);
              }} className='bg-gray-500 px-4 py-2 text-white'>Add book</button>
            </div>
            <div>
              <div className='font-bold text-2xl'>{ popupBook.volumeInfo.title }</div>
            </div>
            <div className="flex flex-row">
              <div className='flex flex-col w-1/4'>
                { popupBook.volumeInfo.authors.map((author, index) => (
                  <p key={ index }>{ author }</p>
                ))}
                { popupBook.volumeInfo.imageLinks?.smallThumbnail ? (
                  <img src={ popupBook.volumeInfo.imageLinks?.smallThumbnail } className='w-40 h-auto'/>
                ) : (
                  <img src='/missing.jpg' className="w-40 h-auto"/>
                )}
              </div>
              <div className='w-3/4 ms-3'>
                { popupBook.volumeInfo.description? (
                  <p>{popupBook.volumeInfo.description}</p>
                ) : (
                  <p>No description available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}