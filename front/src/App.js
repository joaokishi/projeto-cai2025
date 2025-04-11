import React, { useEffect, useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';
import Navbar from './Navbar';

function App() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState('home');
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3001/books');
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddOrEdit = async (book) => {
    if (book.id) {
      await fetch(`http://localhost:3001/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
    } else {
      await fetch('http://localhost:3001/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
    }

    fetchBooks();
    setEditingBook(null);
    setPage('home');
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/books/${id}`, {
      method: 'DELETE',
    });

    fetchBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setPage('add');
  };

  return (
    <div className="container">
      <Navbar setPage={setPage} />

      {page === 'home' && (
        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {page === 'add' && (
        <BookForm onSubmit={handleAddOrEdit} editingBook={editingBook} />
      )}
    </div>
  );
}

export default App;
