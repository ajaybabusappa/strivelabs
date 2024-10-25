module.exports = (sequelize, DataTypes) => {
    const KeyValueModel = sequelize.define("key_value_table", {
        key: {
            type: DataTypes.STRING(255),
            primaryKey: true,             // Key is a primary key
            allowNull: false,
        },
        value: {
            type: DataTypes.JSON,
            allowNull: false,             // JSON object for the value
        },
        tenant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ttl: {
            type: DataTypes.INTEGER,
            allowNull: true,              // Time-to-live can be null
        }
    } , {
        freezeTableName: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    });

    return KeyValueModel;
};