'use strict';

const db = require('../config/db.config.js');
const Collab = db.collab;
const User = db.user;
const Event = db.event;
const EventType = db.donationtype;
const sequelize = require('sequelize');
exports.findByEvent = (req, res) => {
	Collab.findAll({
        where: {
            eventId: req.params.eventId
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

exports.findByCharityPending = (req, res) => {
	Collab.findAll({
        where: {
            state:0
        },
          include: [{
                  model: Event,
                  as: 'event',
                  where: {
                    userId: req.params.userId
                  }
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

exports.createCollab = (req, res) => {
	// Save to MySQL database
	    Collab.create({
    body: req.body.body,
    amount: req.body.amount,
    state: 0,
    eventId: req.body.id_event,
    userId : req.body.id_user,
    donationtypeId: req.body.id_type

	}).then(collab => {
		res.send(collab);
	});
};
exports.confirmOrRefuseCollab = (req, res) => {
	const id = req.params.collabId;
	Collab.update( { state: req.body.state},
					 { where: {id: req.params.collabId} }
				   ).then(() => {
					 res.status(200).send("updated successfully a comment with id = " + id);
				   });
};

exports.total = (req, res) => {
	db.sequelize.query('SELECT COALESCE(SUM(amount),0) as total from collabs WHERE eventId = ? and donationtypeId = ? and state = 1', {
		replacements: [req.params.eventId, req.params.typeId],
		type: sequelize.QueryTypes.SELECT
	}).then(result => {
		res.send(result)
	})
};