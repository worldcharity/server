'use strict';

const db = require('../config/db.config.js');
const Comment = db.comment;
const Vote = db.vote;
const User = db.user;

exports.createCommentEvent = (req, res) => {
	// Save to MySQL database
	Comment.create({
	body: req.body.body,
    state: req.body.state,
    eventId: req.body.id_event,
	UserId : req.body.id_user,

	}).then(comment => {
		Comment.findAll({
			where: {
			  id: comment.id,
			},
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
		}).then(comments => {
			  // Send all events to Client
			  res.send(comments);
			});
	});
};
exports.createCommentPost = (req, res) => {
	// Save to MySQL database
	Comment.create({
	body: req.body.body,
    state: req.body.state,
    postId: req.body.id_post,
	UserId : req.body.id_user,
	}).then(comment => {
		Comment.findAll({
			where: {
			  id: comment.id,
			},
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
		}).then(comments => {
			  // Send all events to Client
			  res.send(comments);
			});
	});
};

exports.hideShowComment = (req, res) => {
	const id = req.params.commentId;
	Comment.update( { state: req.body.state},
					 { where: {id: req.params.commentId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a comment with id = " + id);
				   });
};

exports.delete = (req, res) => {
	const id = req.params.commentId;
	Comment.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a comment with id = ' + id);
	});
};
