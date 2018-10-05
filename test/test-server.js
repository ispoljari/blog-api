const chai = require('chai');
const chaiHttp = require('chai-http');

// setup chai-http
const expect = chai.expect;
chai.use(chaiHttp);

// import the required functions from server.js
const {app, runServer, closeServer} = require('../server');

describe("Blog", function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  // test retrieving resources through the GET route handler
  it('should return existing blogs on GET', function() {

  });
});