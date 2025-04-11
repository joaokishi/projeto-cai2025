import React, { useState, useEffect } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3001/api/books');
    const data = await response.json();
    setBooks(data);
  };

  const addBook = async (book) => {
    const response = await fetch('http://localhost:3001/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    const newBook = await response.json();
    setBooks([...books, newBook]);
  };

  const updateBook = async (book) => {
    const response = await fetch(`http://localhost:3001/api/books/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    const updatedBook = await response.json();
    setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b));
    setEditingBook(null);
  };

  const deleteBook = async (id) => {
    await fetch(`http://localhost:3001/api/books/${id}`, {
      method: 'DELETE',
    });
    setBooks(books.filter(b => b.id !== id));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="container" style={{ padding: '1rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>Book Manager</h1>
      <BookForm
        onSubmit={editingBook ? updateBook : addBook}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />
      <BookList books={books} onEdit={handleEdit} onDelete={deleteBook} />
    </div>
  );
}

export default App;
