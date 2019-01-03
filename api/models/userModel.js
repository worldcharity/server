'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        last_name: type.STRING,
        description: type.TEXT,
        social_id: type.STRING,
        social_platform: type.STRING,
        role: type.STRING,
        photo: type.TEXT,
        confirmation_photo: type.TEXT,
        longitude: type.DOUBLE,
        latitude: type.DOUBLE
    })
}
