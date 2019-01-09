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
  var uploadCnt = require('../controllers/uploadController');

  app.route('/upload/image')
    .post(upload.single("uploadfile"),uploadCnt.addImg);
    //.get(uploadCnt.getImg);

    app.route('/images')
    //.post(upload.single("uploadfile"),uploadCnt.addImg)
    .post(uploadCnt.getImg);

    app.route('/image/:photo')
    .get(uploadCnt.findImg);

    };