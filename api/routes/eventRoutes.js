'use strict';
module.exports = function(app) {
  var eventCnt = require('../controllers/eventController');

  // eventCnt Routes
  app.route('/events/bycause/:causeId')
    .get(eventCnt.findAll);
  app.route('/events/byuser/:userId')
    .get(eventCnt.findByUser);
  app.route('/allevents')
    .get(eventCnt.findAllEvents);

   app.route('/events/:eventId')
    .get(eventCnt.findById)
    //.put(eventCnt.update_an_event)
    .delete(eventCnt.delete);
    };