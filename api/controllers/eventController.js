'use strict';

const db = require('../config/db.config.js');
const Event = db.event;
const User = db.user;
const Cause = db.cause;
const Comment = db.comment;
const Vote = db.vote;
const EventType = db.donationtype;
const Collab = db.collab;


exports.create = (req, res) => {
	// Save to MySQL database
	Event.create({
	  name: req.body.name,
	  description: req.body.description,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    posting_date: req.body.posting_date,
    type: req.body.type

	}).then(event => {

		res.send(event);
	});
};

// FETCH all Events
exports.findAll = (req, res) => {
	Event.findAll({
    where: {
      causeId: req.params.causeId,
    },
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
}).then(events => {
	  // Send all events to Client
	  res.send(events);
	});

};

// FETCH all Events
exports.findAllEvents = (req, res) => {
	Event.findAll({
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
}).then(events => {
	  // Send all events to Client
	  res.send(events);
	});

};

// Find a Event by Id
exports.findById = (req, res) => {
	Event.findById(req.params.eventId).then(event => {
		res.send(event);
	})
};

exports.findByUser = (req, res) => {
	Event.findAll({
    where: {
      userId: req.params.userId,
    },
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
}).then(events => {
	  // Send all events to Client
	  res.send(events);
	});

};

//exports.update = (req, res) => {
/*	const id = req.params.eventId;
	Event.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age },
					 { where: {id: req.params.eventId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a event with id = " + id);
				   });
};*/

// Delete a Event by Id
exports.delete = (req, res) => {
	const id = req.params.eventId;
	Event.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a event with id = ' + id);
	});
};
