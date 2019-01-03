'user strict';
module.exports = (sequelize, type) => {
    return sequelize.define('donationevent', {

        goal: type.DOUBLE
    })
}
