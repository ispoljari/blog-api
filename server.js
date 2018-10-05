'use strict';

// Import the main libraries
const express = require('express');
const morgan = require('morgan');

// Import the router module
const postsRouter = require('./postsRouter');

// Create an instance of the Express app
const app = express();

// Log the HTTP layer
app.use(morgan('common'));

// Route the requests to the appropriate router module
app.use('/blog-posts', postsRouter);

//  function for running the server. returns a promise to prevent a race condition
// when running tests

let server;

function runServer() {
  const PORT = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      console.log(`The proces started listening at ${PORT}`);
      resolve(server);
    }).on('error', (err) => {
      console.error(`Starting the server produced an error ${err} while starting`);
      reject(err);
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('The server is closing.');
    server.close(function(err) {
      if(err) {
        console.error(`Closing the server produced an error ${err}`);
        reject(err);
        return;
      }
      resolve();
    });
  });
}


// Add the ability to start the server if the script is called from the commandline

if(require.main === module) {
  runServer().catch(err => {console.error(err)});
}

module.exports = {app, runServer, closeServer};



