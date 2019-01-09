'use strict';
var path = require('path');
const db = require('../config/db.config.js');
const Cause = db.cause;

exports.addImg = (req, res) => {
	 console.log(req.file.fieldname + "-" + req.file.originalname);
	  res.json({'msg': 'File uploaded successfully!', 'file': req.file});
	};
	  
exports.getImg = (req, res) => { 
	console.log(req.body.photo);

res.sendFile(path.join(__dirname,"../../uploads/" + req.body.photo));

	};
	exports.findImg = (req, res) => { 
	console.log(req.params.photo);

res.sendFile(path.join(__dirname,"../../uploads/" + req.params.photo));

	};

  