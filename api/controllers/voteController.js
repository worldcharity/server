'use strict';

const db = require('../config/db.config.js');
const Vote = db.vote;


exports.create = (req, res) => {
	// Save to MySQL database
	Vote.create({
	name: req.body.name,
    commentId: req.body.id_comment,
	userId : req.body.id_user,
    state: req.body.state,
    type: req.body.type

	}).then(vote => {

		res.send(vote);
	});
};

exports.createVotePost = (req, res) => {
	// Save to MySQL database
	Vote.create({
	name: req.body.name,
    postId: req.body.id_post,
	userId : req.body.id_user,
    state: req.body.state,
    type: req.body.type

	}).then(vote => {

		res.send(vote);
	});
};

exports.createVoteEvent = (req, res) => {
	// Save to MySQL database
	Vote.create({
	name: req.body.name,
    eventId: req.body.id_event,
	userId : req.body.id_user,
    state: req.body.state,
    type: req.body.type

	}).then(vote => {

		res.send(vote);
	});
};

exports.update = (req, res) => {
	const id = req.params.voteId;
	Vote.update( { type: req.body.type},
					 { where: {id: req.params.voteId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a vote with id = " + id);
				   });
};

// Delete a Vote by Id
exports.delete = (req, res) => {
	const id = req.params.voteId;
	Vote.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a vote with id = ' + id);
	});
};
