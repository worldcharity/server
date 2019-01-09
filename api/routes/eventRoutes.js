'use strict';
const multer = require('multer');

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + file.originalname)
    }

  });
  
  var upload = multer({storage: storage});
module.exports = function(app) {
  var eventCnt = require('../controllers/eventController');

  // eventCnt Routes
  app.route('/events/bycause/:causeId')
    .get(eventCnt.findAll);
    app.route('/donationtypes')
    .get(eventCnt.findAllDonation);
  app.route('/events/add')
    .post(eventCnt.create);
  app.route('/events/bytype/:type')
    .get(eventCnt.findByType);
  app.route('/events/byuser/:userId')
    .get(eventCnt.findByUser);
  app.route('/allevents')
    .get(eventCnt.findAllEvents);
  app.route('/events/addTypes')
    .post(eventCnt.addDonationEvent);
  app.route('/eventmodif/:eventId/:longitude/:latitude')
    .post(eventCnt.updatelocalisation);
    app.route('/eventphotos/:eventId')
    .post(upload.single("uploadfile"),eventCnt.updatephoto);


   app.route('/events/:eventId')
    .get(eventCnt.findById)
    //.put(eventCnt.update_an_event)
    .delete(eventCnt.delete);
    };