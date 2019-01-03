const db = require('../config/db.config.js');
const Post = db.post;
const User = db.user;
const Cause = db.cause;
const Comment = db.comment;
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
    as: 'User'
  },
  {
    model: Comment,
    as: 'Comments'
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
   { all: true }],
 where: { causeId: req.params.causeId },
  
  order: sequelize.col('createdAt')
  


}).then(event => {
		
		res.send(event);
	})
};