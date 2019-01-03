'use strict';
module.exports = function(app) {
  var causeCnt = require('../controllers/causeController');

  // causeCnt Routes
  app.route('/causes')
    .get(causeCnt.findAll)
    .post(causeCnt.create);

  /* app.route('/causes/:causeId')
    .get(causeCnt.findById)
    //.put(causeCnt.update_an_cause)
    .delete(causeCnt.delete);*/
    };