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
    setQuery('');
    setRes([]);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!e.target.searchBarQuery.value) {
      return;
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
      <form onSubmit={ handleSearch }>
        <input type="text" placeholder="Search" name="searchBarQuery" value={query} onChange={ (e) => handleTyping(e) }/>
        <button type="submit">Search</button>
      </form>
      <div>
        { loading ? (
          <p>Loading...</p> 
        ) : (
          res.map((item, index) => {
          return (
            <div key={index} onClick={ () => handleBookClick(item.volumeInfo, item.id) } >
              <h3>Title: {item.volumeInfo.title}</h3>
              { item.volumeInfo.authors?.map((author, index) => {
                return (
                  <p key={index}>Author: {author}</p>
                )
              })}
              <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt={item.volumeInfo.title} />
            </div>
          )
        }))}
      </div>
    </>
  )
}