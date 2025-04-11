const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const dataPath = path.join(__dirname, 'db', 'books.json');

app.use(cors());
app.use(express.json());

function loadBooks() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]');
  }
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function saveBooks(books) {
  fs.writeFileSync(dataPath, JSON.stringify(books, null, 2));
}

let books = loadBooks();

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const newBook = req.body;
  newBook.id = Date.now();
  books.push(newBook);
  saveBooks(books);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(book => book.id == id);
  if (index !== -1) {
    books[index] = { ...books[index], ...req.body };
    saveBooks(books);
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  books = books.filter(book => book.id != id);
  saveBooks(books);
  res.status(204).send();
});

app.post('/api/reset', (req, res) => {
  books = [];
  saveBooks(books);
  res.json({ message: 'All books have been reset.' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
