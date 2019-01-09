'use strict';

const db = require('../config/db.config.js');
const User = db.user;
const Sub = db.sub;
const Collab = db.collab;
const Event = db.event;
const EventType = db.donationtype;
const Fav = db.fav;
const Cause = db.cause;
const Comment = db.comment;
const Vote = db.vote;
const Post = db.post;
const sequelize = require('sequelize');
const firebase = require('../../firebaseService');


exports.checkUser = (req, res) => {
	User.findOrCreate({
			where: {
				social_id: req.body.social_id,
				social_platform: req.body.social_platform
			}
		})
		.spread((user, created) => {
			if(created)
			{
				User.update({
					name: req.body.first_name,
					last_name: req.body.last_name,
					photo: req.body.photo
				}, {
					where: {
						id: user.id
					}
				}).then(() => {
					User.findAll({
						where: {
							id: user.id,
						}
					}).then(users => {
						users.forEach((resultSetItem) => {
							var r = resultSetItem.get({
							  plain: true
							});
							res.json({
								created: created,
								user: r
							});
					});
					
				});
	
	
			})
			}
			else{
				User.update({
				}, {
					where: {
						id: user.id
					}
				}).then(() => {
					User.findAll({
						where: {
							id: user.id,
						}
					}).then(users => {
						users.forEach((resultSetItem) => {
							var r = resultSetItem.get({
							  plain: true
							});
							res.json({
								created: created,
								user: r
							});
					});
					
				});
	
	
			})
			}
			
})};
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
		photo: "192.168.43.172:3000/image/" +req.file.fieldname + "-" + req.file.originalname
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
		confirmation_photo: "192.168.43.172:3000/image/" + req.file.fieldname + "-" + req.file.originalname
	}, {
		where: {
			id: req.params.userId
		}
	}).then(() => {
		res.status(200).send("updated successfully a user with id = " + id);
	});
};

exports.follow = (req, res) => {
	var registrationToken = req.body.token;
	var message = {
		data: {
			title : 'New follower',
			body : req.body.name + ' started following you',
			notif_type: '1',
			notif_id: req.body.SubId
			  },
		  topic: 'user_'+req.body.userId
	}
	 //'YOUR_REGISTRATION_TOKEN';
	Sub.create({
		id_user: req.body.userId,
		id_sub: req.body.SubId
	}).then(sub => {
		res.send(sub);
		firebase.sendMsg(message);
		console.log(message);
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
	
		res.send(collabs);
	});

};

// FETCH all Followers
exports.user = (req, res) => {
	User.findAll({
		where: {
			id: req.params.userId,
		},
		include: [
			{
				model: Post,
				as: 'Posts',
				include: [
					{
				 model: User,
				 as: 'user'
			   },
			   {
				 model: Vote,
				 as: 'Votes',
				 include:[
				 {model: User,
				 as: 'user'},
				 { all: true }]
			   },
			   {
				 model: Comment,
				 as: 'Comments',
				 include:[
				 { all: true },
				 {
				 model: Vote,
				 as: 'Votes',
				 include:[
				 {model: User,
				 as: 'user'},
				 { all: true }]
			   }]
			   },
			   { all: true }]
			  },
		{
				model:Event,
				as:"Favourites",
				include: [{
					model: User,
					as: 'user'
				  },
				  {
					model: Cause,
					as: 'cause'
				  },
				  {
					model: Comment,
					as: 'Comments',
					include:[
					{ all: true },
					{
					model: Vote,
					as: 'Votes',
					include:[
					{model: User,
					as: 'user'},
					{ all: true }]
				  }]
				  },
				  {
					model: Vote,
					as: 'Votes',
					include:[
					{model: User,
					as: 'user'},
					{ all: true }]
				  },
				  {
					model: Collab,
					as: 'Collabs',
					include:[
					{model: User,
					as: 'user'},
					{model: EventType,
					as: 'donationtype'},
					{ all: true }]
				  },
				  {
					model: EventType,
					as: 'Types'
				  },
				  {
					  all:true
				  }]
		},
		{
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
	db.sequelize.query('SELECT COALESCE(((SELECT count(v.id) From comments com JOIN votes v ON v.commentId = com.id WHERE v.type = ? and u.id = ?)-(SELECT count(v.id) From comments com JOIN votes v ON v.commentId = com.id WHERE v.type = ? and u.id = ?)+(SELECT count(v.id) From posts p JOIN votes v ON v.postId = p.id WHERE v.type = ? and p.userId = ?)-(SELECT count(v.id) From posts p JOIN votes v ON v.postId = p.id WHERE v.type = ? and p.userId = ?)+(SELECT sum(d.quota * c.amount) FROM collabs c JOIN donationtypes d ON c.donationtypeId = d.id JOIN users u ON c.userId = u.id WHERE c.state = 1 and c.userId = ?)),0) as rating, COALESCE((SELECT count(c.id) FROM collabs c JOIN donationtypes d ON c.donationtypeId = d.id JOIN users u ON c.userId = u.id WHERE c.state = 1 and c.userId = ?),0) as collabs From users u where u.id = ?', {
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
exports.followers = (req, res) => {
	Sub.findAll({
		where: {
		  id_user: req.params.userId,
		}
	  }).then(users => {
		users.forEach((resultSetItem) => {
		  var r = resultSetItem.get({
			  plain: true
		  });
		  console.log(r.id_user);
	  });
	  res.send("");
	  
	  });

};
exports.updatelocalisation = (req, res) => {
	const id = req.params.userId;
	User.update( {  longitude: req.params.longitude, latitude: req.params.latitude
	  },
					 { where: {id: req.params.userId} }
				   ).then(() => {
					 res.status(200).send("updated successfully an event with id = " + id);
				   });
};