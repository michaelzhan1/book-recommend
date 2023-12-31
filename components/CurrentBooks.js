'use client'


export default function CurrentBooks (props) {
  return (
    <>
      <div className="flex-grow overflow-y-scroll lg:px-48 md:px-32 px-8 pb-3 custom-scrollbar">
        <div className="flex flex-col">
          {props.bookList.length > 0 ? (
            <>
              { props.bookList.map((book, index) => {
                return (
                  <div key={index}>
                    {index !== 0 && <hr className='my-2 bg-gray-400 h-px border-0'/>}
                    <div className="flex flex-row justify-between mb-2">
                      <h3 className="font-bold text-xl">{book.bookProps.title}</h3>
                      <button onClick={() => props.handleRemove(book)} className="underline hover:text-gray-600">Remove book</button>
                    </div>

                    <div className="flex justify-between">
                      <div className="flex flex-col w-1/4">
                        { book.bookProps.authors?.map((author, index2) => {
                          return (
                            <p key={index2}>{author}</p>
                          )
                        })}
                        { book.bookProps.imageLinks?.smallThumbnail ? (
                          <img src={book.bookProps.imageLinks?.smallThumbnail} alt={book.bookProps.title} className="w-36 h-auto"/>
                        ) : (
                          <img src='/missing.jpg' alt={book.bookProps.title} className="w-36 h-auto"/>
                        )}
                      </div>
                      <div className="w-3/4 text-md ms-3">
                        { book.bookProps.description? (
                          <p>{book.bookProps.description}</p>
                        ) : (
                          <p>No description available.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </>
          ) : (
            <h3 className="text-center mt-32 font-bold text-gray-500 text-xl">No books added yet!</h3>
          )}
        </div>
      </div>
    </>
  )
}