'use strict';

const db = require('../config/db.config.js');
const Event = db.event;
const User = db.user;
const Cause = db.cause;
const Comment = db.comment;
const Vote = db.vote;
const Photo = db.photo;
const EventType = db.donationtype;
const DonationEvent = db.donationevent;
const Collab = db.collab;
const Sub = db.sub;
var firebase = require('firebase-admin');
var request = require('request');


exports.findAllDonation = (req, res) => {
	EventType.findAll({
  	include: [
 
  { all: true }]
}).then(donations => {
	  // Send all prefs to Client
	  res.send(donations);
	});
	
};
exports.updatelocalisation = (req, res) => {
	const id = req.params.eventId;
	Event.update( {  longitude: req.params.longitude, latitude: req.params.latitude
	  },
					 { where: {id: req.params.eventId} }
				   ).then(() => {
					 res.status(200).send("updated successfully an event with id = " + id);
				   });
};


exports.create = (req, res) => {
	var registrationToken = req.body.token; //'YOUR_REGISTRATION_TOKEN';
	Event.create({
	  name: req.body.name,
	  description: req.body.description,
    starting_date: req.body.starting_date,
    ending_date: req.body.ending_date,
    type: req.body.type,
    infoline: req.body.infoline,
    causeId: req.body.causeId,
    userId: req.body.charity

	}).then(event => {
    Sub.findAll({
      where: {
        id_user: req.body.charity,
      }
      }).then(users => {
      users.forEach((resultSetItem) => {
        var r = resultSetItem.get({
          plain: true
        });
        var message = {
          data: {
            title : 'New event',
            body : req.body.nameCharity + ' added a new event',
            notif_type: '2',
            notif_id: event.id
              },
            topic: 'user_'+r.id_sub
        }
        console.log(r.id_sub);
      });    
      });
  
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

exports.findByType = (req, res) => {
	Event.findAll({
    where: {
      type: req.params.type,
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
exports.addDonationEvent = (req, res) => {
	DonationEvent.create({
	id_donationtype: req.body.typeId,
  id_event: req.body.eventId,
  goal: req.body.goal
	}).then(comment => {
		res.send(comment);
	});
};
exports.updatephoto = (req, res) => {
	Photo.create( { 
	 url : req.file.fieldname + "-" + req.file.originalname ,
	 eventId : req.params.eventId
	  }).then(comment => {
		Photo.findAll({
			where: {
			  id: comment.id,
			},
			include:[
			{ all: true },
			]
		})}).then(event => {
		
		res.send(event);
	});
};
