// Import the main libraries
const express = require('express');
const morgan = require('morgan');

// Create an instance of the Express app
const app = express();

// Log the HTTP layer
app.use(morgan('common'));


// Open the server port 8080
app.listen(process.env.PORT || 8080, () => {
  console.log(`The process started listening at port ${process.env.PORT || 8080}`);
});


