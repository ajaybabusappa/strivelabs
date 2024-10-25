const {sequelize} = require("../utils/db");
const {Sequelize, DataTypes} = require("sequelize");

const Models = {
    KeyValueModel: require('./keyValue.model.js')(sequelize, DataTypes),
    TenantModel: require('./tenant.model.js')(sequelize, DataTypes)
};

module.exports = {
    Models
};