'use strict';

const db = require('../config/db.config.js');
const Cause = db.cause;
const Event = db.event;
const User = db.user;

exports.findAll = (req, res) => {
	Cause.findAll({
		include: [
			{
		    model: Event,
		    as: 'Events',
				include: [
					{
			    model: User,
			    as: 'user'
			  },
			  { all: true }]
		  }]
  }).then(causes => {
	  // Send all causes to Client
	  res.send(causes);
	});

};

exports.create = (req, res) => {
	// Save to MySQL database
	Cause.create({
	name: req.body.name,
	description: req.body.description,
	photo: req.body.photo

	}).then(cause => {
		
		res.send(cause);
	});
};