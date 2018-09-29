'use strict';

// Import the main libraries

const express = require('express');
const router = express.Router();

const app = express();

// Import the data layer model module
const {BlogPosts} = require('./models.js');

// Import body parse to enable body parsing
const bodyParser = require('body-parser');

// Create a few example blog posts
BlogPosts.create('My first Blog', 'Hi. My name is George. This is my first blog post.', 'George B.S.', '1/21/2016');

BlogPosts.create('Inspirational Quote', 'Live as if you were to die tommorow. Learn as if you were to live forever.', 'Mahatma Gandhi', '8/13/1940');

BlogPosts.create('Lady Windermere\'s Fan', 'We are all in the gutter, but some of us are looking at the stars.', 'Oscar Wilde', '3/17/1893');

// GET requests route handler
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// Export the module 
module.exports = router;