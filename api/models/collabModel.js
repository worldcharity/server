'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('collab', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        state: type.INTEGER,
        amount: type.DOUBLE,
        body: type.TEXT
    })
}
