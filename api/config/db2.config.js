const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../models/userModel')(sequelize, Sequelize);
db.cause = require('../models/causeModel')(sequelize, Sequelize);
db.collab = require('../models/collabModel')(sequelize, Sequelize);
db.comment = require('../models/commentModel')(sequelize, Sequelize);
db.donationtype = require('../models/donationTypeModel')(sequelize, Sequelize);
db.photo = require('../models/photoModel')(sequelize, Sequelize);
db.vote = require('../models/voteModel')(sequelize, Sequelize);
db.event = require('../models/eventModel')(sequelize, Sequelize);
db.post = require('../models/postModel')(sequelize, Sequelize);
db.donationevent = require('../models/donationEventModel')(sequelize, Sequelize);
db.sub = sequelize.define('sub', {})
db.fav = sequelize.define('fav', {})
db.pref = sequelize.define('pref', {})

db.user.belongsToMany(db.event, { as: 'Favourites', through: db.fav , foreignKey: 'id_user' })
db.event.belongsToMany(db.user, { as: 'FavBy', through: db.fav, foreignKey: 'id_event' })

db.user.belongsToMany(db.cause, { as: 'Prefrences', through: db.pref , foreignKey: 'id_user' })
db.cause.belongsToMany(db.user, { as: 'PrefBy', through: db.pref, foreignKey: 'id_cause' })

db.cause.hasMany(db.post, {as: 'Posts'});
db.comment.belongsTo(db.user, {as: 'User'});

db.comment.hasMany(db.vote, {as: 'Votes'});

db.collab.belongsTo(db.user, {as: 'user'});
db.vote.belongsTo(db.user, {as: 'user'});
db.event.belongsTo(db.cause);
db.cause.hasMany(db.event, {as: 'Events'});
db.event.hasMany(db.photo, {as: 'Photos'});
db.event.hasMany(db.collab, {as: 'Collabs'});
db.event.hasMany(db.vote, {as: 'Votes'});
db.event.hasMany(db.comment, {as: 'Comments'});
db.post.hasMany(db.vote, {as: 'Votes'});
db.post.hasMany(db.comment, {as: 'Comments'});
//db.user.belongsToMany(db.user, { as: 'Subs', through: 'sub' })
db.event.belongsTo(db.user);
db.user.hasMany(db.event, {as: 'Events'});
db.user.hasMany(db.post, {as: 'Posts'});
db.post.belongsTo(db.user, {as: 'user'});
db.user.belongsToMany(db.user, { as: 'Subs', through: db.sub , foreignKey: 'id_user' })
db.user.belongsToMany(db.user, { as: 'Users', through: db.sub, foreignKey: 'id_sub' })

//db.collab.belongsTo(db.donationtype);
db.collab.belongsTo(db.donationtype, {as: 'donationtype'});
db.collab.belongsTo(db.event);
db.donationtype.belongsToMany(db.event, { as: 'Events', through: db.donationevent , foreignKey: 'id_donationtype' })
db.event.belongsToMany(db.donationtype, { as: 'Types', through: db.donationevent, foreignKey: 'id_event' })

//db.collab.belongsTo(db.donationtype, { constraints: false });


module.exports = db;
