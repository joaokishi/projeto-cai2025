import React, { useState, useEffect } from 'react';

function BookForm({ onSubmit, initialData, onCancel }) {
  const [book, setBook] = useState({
    title: '',
    authors: '',
    isbn: '',
    edition: '',
    year: '',
    publisher: '',
    pageCount: '',
    buyLink: '',
    coverImage: ''
  });

  useEffect(() => {
    if (initialData) {
      setBook(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.authors) return;
    onSubmit(book);
    setBook({
      title: '',
      authors: '',
      isbn: '',
      edition: '',
      year: '',
      publisher: '',
      pageCount: '',
      buyLink: '',
      coverImage: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} required />
      <input name="authors" placeholder="Authors" value={book.authors} onChange={handleChange} required />
      <input name="isbn" placeholder="ISBN" value={book.isbn} onChange={handleChange} />
      <input name="edition" placeholder="Edition" value={book.edition} onChange={handleChange} />
      <input name="year" placeholder="Year" value={book.year} onChange={handleChange} />
      <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />
      <input name="pageCount" placeholder="Page Count" value={book.pageCount} onChange={handleChange} />
      <input name="buyLink" placeholder="Buy Link" value={book.buyLink} onChange={handleChange} />
      <input name="coverImage" placeholder="Cover Image URL" value={book.coverImage} onChange={handleChange} />
      <button type="submit">{initialData ? 'Update' : 'Add'} Book</button>
      {initialData && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

export default BookForm;
