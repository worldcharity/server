'use strict';
module.exports = function(app) {
  var causeCnt = require('../controllers/collabController');

  // causeCnt Routes
  app.route('/collabs/byevent/:eventId')
    .get(causeCnt.findByEvent)
app.route('/collabs/bycharitypending/:userId')
    .get(causeCnt.findByCharityPending)
app.route('/collab/update/:collabId')
    .put(causeCnt.confirmOrRefuseCollab)
app.route('/collab/total/:eventId/:typeId')
    .get(causeCnt.total)
app.route('/collabs')
    .post(causeCnt.createCollab);

  /* app.route('/causes/:causeId')
    .get(causeCnt.findById)
    //.put(causeCnt.update_an_cause)
    .delete(causeCnt.delete);*/
    };