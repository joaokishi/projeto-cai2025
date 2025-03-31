const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});