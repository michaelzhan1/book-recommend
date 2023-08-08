'use client'


export default function CurrentBooks (props) {
  return (
    <>
      <h2>Current books</h2>
      { props.bookList.map((book, index) => {
        return (
          <div key={index}>
            <h3>{book.bookProps.title}</h3>
            { book.bookProps.authors?.map((author, index) => {
              return (
                <p key={index}>Author: {author}</p>
              )
            })}
            <img src={book.bookProps.imageLinks?.smallThumbnail} alt={book.bookProps.title} />
          </div>
        )
      })}
    </>
  )
}