module.exports = (sequelize, DataTypes) => {
    const TenantModel = sequelize.define("tenants_table", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false, 
        },
        storage_limit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        current_usage: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    } , {
        freezeTableName: true,
        timestamps: false
    });

    return TenantModel;
};