'use strict';
module.exports = function(app) {
  var comCnt = require('../controllers/commentController');

  // eventCnt Routes
  app.route('/commentevent')
    .post(comCnt.createCommentEvent);
  app.route('/commentpost')
    .post(comCnt.createCommentPost);

   app.route('/comment/hide/:commentId')
    .put(comCnt.hideShowComment)
    .delete(comCnt.delete);
    };