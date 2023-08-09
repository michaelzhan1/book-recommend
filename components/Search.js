'use client'


import { useState } from 'react';


export default function Search (props) {
  const [res, setRes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTimerId, setCurrentTimerId] = useState(null);

  const debounce = (callback, delay) => {
    return (...args) => {
      if (currentTimerId) {
        clearTimeout(currentTimerId);
      }
      setCurrentTimerId(setTimeout(() => {
        callback(...args);
      }, delay));
    }
  }

  const handleSearchbar = async (input) => {
    if (!input) {
      setRes([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${input}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setRes(data.items.slice(0, 5));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleTyping = (e) => {
    setQuery(e.target.value);
    debounce(handleSearchbar, 1000)(e.target.value);
  }

  const handleBookClick = (bookProps, bookId) => {
    props.handleAdd({
      bookProps: bookProps,
      bookId: bookId
    });
    if (currentTimerId) {
      clearTimeout(currentTimerId);
    }
    setQuery('');
    setRes([]);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!e.target.searchBarQuery.value) {
      return;
    }
    if (currentTimerId) {
      clearTimeout(currentTimerId);
    }
    setLoading(true);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${e.target.searchBarQuery.value}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      console.error('Error fetching data:', data);
      setLoading(false);
      return;
    }
    setLoading(false);
    const topItem = data.items[0];
    props.handleAdd({
      bookProps: topItem.volumeInfo,
      bookId: topItem.id
    });
    setQuery('');
    setRes([]);
  }

  return (
    <>
      <div className='w-full lg:w-1/2 relative'>
        <form onSubmit={ handleSearch } className='w-full flex bg-white shadow-md appearance-none '>
          <input type="text" placeholder="Add a book!" name="searchBarQuery" value={query} onChange={ (e) => handleTyping(e) } className='border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow ps-4'/>
          <button type="submit" className='bg-gray-500 px-4 text-white'>Add</button>
        </form>

        <div className='w-full absolute'>
        { loading ? (
          <p>Loading...</p> 
        ) : (
          <div className='flex flex-col text-start bg-gray-100 pt-3'>
            {res.map((item, index) => {
            return (
              <>
                { index !== 0 && <hr className='my-2 bg-gray-400 h-px border-0'/> }
                <div key={index} onClick={ () => handleBookClick(item.volumeInfo, item.id) } className='flex'>
                  <div>
                    <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt={item.volumeInfo.title} className='w-16 aspect-ratio:auto'/>
                  </div>



                  <div className="flex flex-col">
                    <h3>Title: {item.volumeInfo.title}</h3>
                    { item.volumeInfo.authors?.map((author, index) => {
                      return (
                        <p key={index}>Author: {author}</p>
                      )
                    })}
                  </div>
                </div>
              </>
            )
            })}
          </div>
        )}
      </div>
      </div>
      
    </>
  )
}