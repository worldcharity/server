'use strict';
module.exports = function(app) {
  var prefCnt = require('../controllers/prefController');

  // prefCnt Routes
  app.route('/prefs/byuser/:userId')
    .get(prefCnt.findAll);
  app.route('/prefs')
    .post(prefCnt.create);

   app.route('/prefs/:prefId')
    .get(prefCnt.findById)
    //.put(prefCnt.update_an_pref)
    .delete(prefCnt.delete);
    };