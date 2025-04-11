import React from 'react';

function BookList({ books, onEdit, onDelete }) {
  return (
    <div>
      {books.map(book => (
        <div key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p><strong>Authors:</strong> {book.authors}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Edition:</strong> {book.edition}</p>
          <p><strong>Year:</strong> {book.year}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Page Count:</strong> {book.pageCount}</p>
          <p><strong>Buy Link:</strong> 
            {book.buyLink ? (
              <a href={book.buyLink} target="_blank" rel="noopener noreferrer">
                {book.buyLink}
              </a>
            ) : ' N/A'}
          </p>
          {book.coverImage && (
            <img src={book.coverImage} alt="Cover" style={{ maxWidth: '100px', marginTop: '0.5rem' }} />
          )}
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book.id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
