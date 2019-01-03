'use strict';

const db = require('../config/db.config.js');
const User = db.user;
const Sub = db.sub;
const Collab = db.collab;
const Event = db.event;
const EventType = db.donationtype;
const Fav = db.fav;
const sequelize = require('sequelize');

exports.checkUser = (req, res) => {
	User.findOrCreate({
			where: {
				social_id: req.body.social_id,
				social_platform: req.body.social_platform,
				name: req.body.first_name,
				last_name: req.body.last_name,
				photo: req.body.photo
			}
		})
		.spread((user, created) => {
			res.json({
				created: created,
				user: user
			});


		})
};
exports.editRole = (req, res) => {
	const id = req.body.id;
	User.update({
		role: req.body.role
	}, {
		where: {
			id: req.body.id
		}
	}).then(() => {
		res.status(200).send("updated successfully a user with id = " + id)
	})
};
exports.update = (req, res) => {
	const id = req.params.userId;
	User.update({
		name: req.params.firstname,
		description: req.params.description,
		photo: req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname
	}, {
		where: {
			id: req.params.userId
		}
	}).then(() => {
		res.status(200).send("updated successfully a user with id = " + id)
	})
};
exports.updatephoto = (req, res) => {
	const id = req.params.userId;
	User.update({
		confirmation_photo: req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname
	}, {
		where: {
			id: req.params.userId
		}
	}).then(() => {
		res.status(200).send("updated successfully a user with id = " + id);
	});
};

exports.follow = (req, res) => {
	// Save to MySQL database
	Sub.create({
		id_user: req.body.userId,
		id_sub: req.body.SubId
	}).then(sub => {
		res.send(sub);
	});
};

exports.unfollow = (req, res) => {
	const id = req.params.userId;
	const sub = req.params.SubId;
	Sub.destroy({
		where: {
			id_user: id,
			id_sub: sub
		}
	}).then(() => {
		res.status(200).send('deleted successfully a sub with id = ' + id);
	});
};

// FETCH all Collabs
exports.collabs = (req, res) => {
	Collab.findAll({
		where: {
			userId: req.params.userId,
		},
		include: [{
				model: Event,
				as: 'event'
			},
			{
				model: EventType,
				as: 'donationtype'
			},
			{
				all: true
			}
		]
	}).then(collabs => {
		// Send all events to Client
		res.send(collabs);
	});

};

// FETCH all Followers
exports.user = (req, res) => {
	User.findAll({
		where: {
			id: req.params.userId,
		},
		include: [{
			all: true
		}]
	}).then(events => {
		// Send all events to Client
		res.send(events);
	});

};
exports.charities = (req, res) => {
	User.findAll({
		where: {
			role: "charity",
		},
		include: [{
			all: true
		}]
	}).then(events => {
		// Send all events to Client
		res.send(events);
	});

};
exports.infos = (req, res) => {
	db.sequelize.query('SELECT ((SELECT count(v.id) From comments com JOIN votes v ON v.commentId = com.id WHERE v.type = ? and u.id = ?)-(SELECT count(v.id) From comments com JOIN votes v ON v.commentId = com.id WHERE v.type = ? and u.id = ?)+(SELECT count(v.id) From posts p JOIN votes v ON v.postId = p.id WHERE v.type = ? and p.userId = ?)-(SELECT count(v.id) From posts p JOIN votes v ON v.postId = p.id WHERE v.type = ? and p.userId = ?)+(SELECT sum(d.quota * c.amount) FROM collabs c JOIN donationtypes d ON c.donationtypeId = d.id JOIN users u ON c.userId = u.id WHERE c.state = 1 and c.userId = ?)) as rating, (SELECT count(c.id) FROM collabs c JOIN donationtypes d ON c.donationtypeId = d.id JOIN users u ON c.userId = u.id WHERE c.state = 1 and c.userId = ?) as collabs From users u where u.id = ?', {
		replacements: ['upvote', req.params.userId, 'downvote', req.params.userId, 'upvote', req.params.userId, 'downvote', req.params.userId, req.params.userId, req.params.userId, req.params.userId],
		type: sequelize.QueryTypes.SELECT
	}).then(result => {
		res.send(result)
	})
};

exports.addToFav = (req, res) => {
	// Save to MySQL database
	Fav.create({
		id_user: req.body.userId,
		id_event: req.body.eventId
	}).then(sub => {
		res.send(sub);
	});
};

exports.unfav = (req, res) => {
	const id = req.params.userId;
	const event = req.params.eventId;
	Fav.destroy({
		where: {
			id_user: id,
			id_event: event
		}
	}).then(() => {
		res.status(200).send('deleted successfully fav with id = ' + id);
	});
};
