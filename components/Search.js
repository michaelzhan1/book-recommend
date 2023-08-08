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

  const handleSearch = async (input) => {
    if (!input) {
      setRes([]);
      return;
    }
    setLoading(true);
    try {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${input}&projection=lite&key=${process.env.NEXT_PUBLIC_API_KEY}`;
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
    debounce(handleSearch, 1000)(e.target.value);
  }

  return (
    <>
      <input type="text" placeholder="Search" value={query} onChange={ (e) => handleTyping(e) }/>
      <div>
        { loading ? (
          <p>Loading...</p> 
        ) : (
          res.map((item, index) => {
          return (
            <div key={index} onClick={ () => {
              props.handleAdd({
                title: item.volumeInfo.title,
                author: item.volumeInfo.author,
                image: item.volumeInfo.imageLinks?.smallThumbnail
              });
              setQuery('');
              setRes([]);
            }}>
              <h3>Title: {item.volumeInfo.title}</h3>
              <p>{item.volumeInfo.author}</p>
              <img src={item.volumeInfo.imageLinks?.smallThumbnail} alt={item.volumeInfo.title} />
            </div>
          )
        }))}
      </div>
    </>
  )
}