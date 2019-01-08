const db = require('../config/db.config.js');
const Post = db.post;
const User = db.user;
const Cause = db.cause;
const Comment = db.comment;
const Vote = db.vote;
const sequelize = db.sequelize;

exports.findAll = (req, res) => {
	Post.findAll({
  	include: [
 
  { all: true }]
}).then(posts => {
	  // Send all prefs to Client
	  res.send(posts);
	});
	
};
exports.findByCauseId = (req, res) => {
	
	Post.findAll({
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
  { all: true }], 

  where: { causeId: req.params.causeId }
}).then(event => {
	res.send(event);
	})
};
exports.findByComments = (req, res) => {
	Post.findAll({
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
   { all: true }],
 where: { causeId: req.params.causeId },
  
  order: sequelize.col('createdAt')

}).then(event => {
		
		res.send(event);
	})
};

exports.create = (req, res) => {

	Post.create({
	  title: req.body.title,
    body: req.body.body,
    causeId: req.body.causeId,
    userId: req.body.userId

	}).then(event => {
    res.send(event);
    
	});
};