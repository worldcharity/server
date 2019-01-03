'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('vote', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: type.TEXT,
        state: type.INTEGER
    })
}
