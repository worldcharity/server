'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('photo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        url: type.TEXT,
        caption: type.STRING
    })
}
