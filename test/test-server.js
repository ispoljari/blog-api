const chai = require('chai');
const chaiHttp = require('chai-http');

// setup chai-http
const expect = chai.expect;
chai.use(chaiHttp);

// import from server.js
const {app, runServer, closeServer} = require('../server');

describe("Blog", function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  // test retrieving resources from the GET route handler
  it('should return a list of blogs on GET', function() {
    return chai
    .request(app)
    .get('/blog-posts')
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      expect(res.body.length).to.be.above(0);
      res.body.forEach(function(blog) {
        expect(blog).to.be.a('object');
        expect(blog).to.have.all.keys('id', 'title', 'content', 'author', 'publishDate');
      });
    });
  });

  it('should create a blog post on POST', function() {
    const newBlogPost = {
      title: 'Test',
      content: 'I am testing how to create a blog on http POST',
      author: 'George',
      publishDate: '05/05/2018'
    }
    return chai
    .request(app)
    .post('/blog-posts')
    .send(newBlogPost)
    .then(function(res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.have.all.keys('id', 'title', 'content', 'author', 'publishDate');
    });
  });

  it('should update a blog post on PUT', function() {
    const updatePOST = {
      title: 'Update Post',
      content: 'I am testing if I can update a blog post on PUT',
      author: 'James',
      publishDate: '04/04/2010'
    };

    return chai
    .request(app)
    .get('/blog-posts')
    then(function(res) {
      updatePOST.id = res.body[0].id;
      return chai
      .request(app)
      .put(`/blog-posts/${updatePost.id}`)
      .send(updatePost)
    })
    .then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.deep.equal(updatePOST);
    });
  });

  it('should delete a blog post on DELETE', function() {
    return chai
    .request(app)
    .get('/blog-posts')
    then(function(res) {
      const postID = res.body[0].id;
      return chai
      .request(app)
      .delete(`/blog-posts/${postID}`)
    })
    .then(function(res) {
      expect(res).to.have.status(204);
    });
  });
});