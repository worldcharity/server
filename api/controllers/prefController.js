'use strict';

const db = require('../config/db.config.js');
const Prefs = db.pref;
const User = db.user;
const Cause = db.cause;
const Photo = db.photo;


exports.create = (req, res) => {
	// Save to MySQL database
	console.log(req.body);
	Prefs.create({

	  id_user: req.body.id_user,
	  id_cause: req.body.id_cause
 	}).then(pref => {
		
		res.send(pref);
	});
};

exports.findAll = (req, res) => {
	User.findAll({where: {
		id: req.params.userId,
	},attributes: ['id'],
  	include: [
			{ model: Cause,
			as: 'Prefrences' },
  ]
}).then(prefs => {
	  // Send all prefs to Client
	  res.send(prefs);
	});
	
};



// Find a pref by Id
exports.findById = (req, res) => {
	Prefs.findById(req.params.prefId).then(pref => {
		res.send(pref);
	})
};


exports.delete = (req, res) => {
	const id_cause = req.params.causeId;
	const id_user = req.params.userId;
	Prefs.destroy({
	  where: { id_user: id_user , id_cause: id_cause}
	}).then(() => {
		console.log('deleted successfully a pref with cause = ' + id_cause + ' and user = ' + id_user)
	  res.status(200).send('deleted successfully a pref with cause = ' + id_cause + ' and user = ' + id_user);
	});
};
