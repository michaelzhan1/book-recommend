'use client'


export default function CurrentBooks (props) {
  return (
    <>
      <div className="flex-grow overflow-y-scroll px-10">
        <div className="flex flex-col">
          { props.bookList.map((book, index) => {
            return (
              <>
                {index !== 0 && <hr className='my-2 bg-gray-400 h-px border-0'/>}
                <div key={index}>
                  <img src={book.bookProps.imageLinks?.smallThumbnail} alt={book.bookProps.title} />
                  <h3>{book.bookProps.title}</h3>
                  { book.bookProps.authors?.map((author, index) => {
                    return (
                      <p key={index}>Author: {author}</p>
                    )
                  })}
                  <p>{book.bookProps.description}</p>
                  
                  <button onClick={() => props.handleRemove(book)}>Remove book</button>
                </div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}