'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('cause', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        description: type.STRING,
        photo: type.STRING
    })
}
