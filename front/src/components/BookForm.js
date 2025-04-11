import React, { useEffect, useState } from 'react';

function BookForm({ onSubmit, editingBook }) {
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    isbn: '',
    edition: '',
    year: '',
    publisher: '',
    pages: '',
    image: '',
    purchase_link: ''
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      // Se não estiver editando, limpa o formulário
      setFormData({
        title: '',
        authors: '',
        isbn: '',
        edition: '',
        year: '',
        publisher: '',
        pages: '',
        image: '',
        purchase_link: ''
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Limpa o formulário após adicionar ou editar
    setFormData({
      title: '',
      authors: '',
      isbn: '',
      edition: '',
      year: '',
      publisher: '',
      pages: '',
      image: '',
      purchase_link: ''
    });
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
      <input type="text" name="authors" placeholder="Authors" value={formData.authors} onChange={handleChange} />
      <input type="text" name="isbn" placeholder="ISBN" value={formData.isbn} onChange={handleChange} />
      <input type="text" name="edition" placeholder="Edition" value={formData.edition} onChange={handleChange} />
      <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} />
      <input type="text" name="publisher" placeholder="Publisher" value={formData.publisher} onChange={handleChange} />
      <input type="text" name="pages" placeholder="Number of Pages" value={formData.pages} onChange={handleChange} />
      <input type="text" name="image" placeholder="Cover Image URL" value={formData.image} onChange={handleChange} />
      <input type="text" name="purchase_link" placeholder="Purchase Link" value={formData.purchase_link} onChange={handleChange} />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
}

export default BookForm;
