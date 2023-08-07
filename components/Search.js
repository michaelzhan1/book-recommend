'use client'


import { useState } from 'react';



export default function Search (props) {
  const [res, setRes] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = (e.target.query.value).replaceAll(' ', '+');
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    setRes(data.items.slice(0, 3));
  }



  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="Search" name='query'/>
        <button type="submit">Search</button>
      </form>
      <div>
        { res.map((item, index) => {
          return (
            <div key={index}>
              <h3>{item.volumeInfo.title}</h3>
              <p>{item.volumeInfo.author}</p>
              <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} />
            </div>
          )
        })}
      </div>
    </>
  )
}