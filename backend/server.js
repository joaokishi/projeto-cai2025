const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;
const DB_PATH = path.join(__dirname, 'db', 'books.json');

app.use(cors());
app.use(express.json());

// GET all books
app.get('/books', (req, res) => {
  fs.readFile(DB_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read database.' });
    res.json(JSON.parse(data || '[]'));
  });
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  fs.readFile(DB_PATH, 'utf-8', (err, data) => {
    let books = [];
    if (!err && data) books = JSON.parse(data);
    newBook.id = Date.now();
    books.push(newBook);

    fs.writeFile(DB_PATH, JSON.stringify(books, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write database.' });
      res.status(201).json(newBook);
    });
  });
});

// PUT (edit)
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  fs.readFile(DB_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read database.' });

    let books = JSON.parse(data);
    const index = books.findIndex(b => b.id === bookId);
    if (index === -1) return res.status(404).json({ error: 'Book not found.' });

    books[index] = { ...books[index], ...updatedBook };

    fs.writeFile(DB_PATH, JSON.stringify(books, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to update database.' });
      res.json(books[index]);
    });
  });
});

// DELETE
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  fs.readFile(DB_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read database.' });

    let books = JSON.parse(data);
    books = books.filter(b => b.id !== bookId);

    fs.writeFile(DB_PATH, JSON.stringify(books, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write database.' });
      res.status(204).end();
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
