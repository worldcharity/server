'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('event', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        description: type.TEXT,
        starting_date: type.DATE,
        ending_date: type.DATE,
        infoline: type.STRING,
        type: type.STRING,
        longitude: type.DOUBLE,
        latitude: type.DOUBLE
    })
}
