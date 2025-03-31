const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const postsPath = path.join(__dirname, '../db/posts.json');

const readPosts = () => {
  try {
    const data = fs.readFileSync(postsPath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const savePosts = (posts) => {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
};

router.get('/user/:userId', (req, res) => {
  const posts = readPosts();
  const userPosts = posts.filter(post => post.userId === req.params.userId);
  res.json(userPosts);
});

router.post('/', (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: Date.now().toString(),
    userId: req.body.userId,
    content: req.body.content,
    createdAt: new Date().toISOString()
  };
  posts.unshift(newPost);
  savePosts(posts);
  res.status(201).json(newPost);
});

module.exports = router;