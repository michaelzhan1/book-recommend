'use client'


export default function CurrentBooks (props) {
  return (
    <>
      <h2>Current books</h2>
      { props.bookList.map((book, index) => {
        return (
          <div key={index}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <img src={book.image} alt={book.title} />
          </div>
        )
      })}
    </>
  )
}