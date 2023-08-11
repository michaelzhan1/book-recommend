'use client'


import { useState, useRef, useEffect } from 'react';


export default function Search (props) {
  const [res, setRes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTimerId, setCurrentTimerId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside (e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [dropdownRef]);

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
      const url = `https://www.googleapis.com/books/v1/volumes?q=${input.replaceAll(' ', '+')}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
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
    setDropdownOpen(true);
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
    const url = `https://www.googleapis.com/books/v1/volumes?q=${e.target.searchBarQuery.value.replaceAll(' ', '+')}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
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
      <div className='w-11/12 lg:w-1/2 relative' ref={dropdownRef}>
        <form onSubmit={ handleSearch } className='flex bg-white shadow-md appearance-none'>
          <input type="text" placeholder="Add a book!" name="searchBarQuery" value={query} onChange={ (e) => handleTyping(e) } className='border py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow ps-4'/>
          <button type="submit" className='bg-gray-500 px-4 text-white'>Add</button>
        </form>

        {dropdownOpen && (
          <div className='w-full absolute'>
          { !loading && res.length > 0 && (
            <div className='flex flex-col text-start bg-gray-100 py-3'>
              {res.map((item, index) => {
              return (
                <div key={index}>
                  { index !== 0 && <hr className='my-2 bg-gray-400 h-px border-0'/> }
                  <div onClick={ () => handleBookClick(item.volumeInfo, item.id) } className='flex mx-3'>
                    <div>
                      { item.volumeInfo.imageLinks?.smallThumbnail ? (
                        <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt={item.volumeInfo.title} className='h-24 w-auto'/>
                      ) : (
                        <img src='missing.jpg' alt={item.volumeInfo.title} className='h-24 w-auto'/>
                      )}
                    </div>
                    <div className="flex flex-col ms-3">
                      <h3 className='font-bold text-lg'>{item.volumeInfo.title}</h3>
                      { item.volumeInfo.authors?.map((author, index) => {
                        return (
                          <p key={index}>Author: {author}</p>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
              })}
            </div>
            )}
          </div>
        )}
      </div>
      
    </>
  )
}