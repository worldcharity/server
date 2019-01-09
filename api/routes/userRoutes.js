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
  var userCnt = require('../controllers/userController');
  // causeCnt Routes
  app.route('/user')
    .post(userCnt.checkUser)
  app.route('/role')
    .post(userCnt.editRole)
  app.route('/users/infos/:userId')
    .get(userCnt.infos)
  app.route('/users/findauser/:userId')
    .get(userCnt.user)
  app.route('/users/followers/:userId')
    .get(userCnt.followers)
  app.route('/users/charities')
    .get(userCnt.charities)
  app.route('/users/collabs/:userId')
    .get(userCnt.collabs)
  app.route('/users/follow')
    .post(userCnt.follow)
  app.route('/users/unfollow/:userId/:SubId')
    .delete(userCnt.unfollow)
  app.route('/users/fav')
    .post(userCnt.addToFav)
  app.route('/users/unfav/:userId/:eventId')
    .delete(userCnt.unfav)

  app.route('/usermodif/:userId/:firstname/:description')
    .post(upload.single("uploadfile"),userCnt.update);
    //.get(eventCnt.getImg);

    app.route('/logomodif/:userId')
    .post(upload.single("uploadfile"),userCnt.updatephoto);

    app.route('/userloc/:eventId/:longitude/:latitude')
    .post(userCnt.updatelocalisation);
    };