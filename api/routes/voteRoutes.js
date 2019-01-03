'use strict';
module.exports = function(app) {
  var eventCnt = require('../controllers/voteController');

  // eventCnt Routes
  app.route('/votecomment')
    .post(eventCnt.create);
  app.route('/votepost')
    .post(eventCnt.createVotePost);
  app.route('/voteevent')
    .post(eventCnt.createVoteEvent);

   app.route('/vote/:voteId')
    .put(eventCnt.update)
    .delete(eventCnt.delete);
    };