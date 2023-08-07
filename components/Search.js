'use client'


import { useState } from 'react';
import _debounce from 'lodash.debounce';



export default function Search (props) {
  const [res, setRes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input) => {
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

  const debouncedSearch = _debounce(handleSearch, 1500);

  return (
    <>
      <input type="text" placeholder="Search" onChange={ (e) => debouncedSearch(e.target.value) }/>
      <div>
        { loading ? (
          <p>Loading...</p> 
        ) : (
          res.map((item, index) => {
          return (
            <div key={index}>
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