'use strict';
module.exports = function(app) {
  var postCnt = require('../controllers/PostController');

  // prefCnt Routes
  app.route('/posts')
    .get(postCnt.findAll)
  app.route('/posts/:causeId')
    .get(postCnt.findByCauseId)
  app.route('/poststrending/:causeId')
    .get(postCnt.findByComments)
  app.route('/posts/add')
    .post(postCnt.create);     
   

  
    };