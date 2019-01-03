'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('donationtype', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: type.STRING,
        quota: type.DOUBLE
    })
}
