const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Model for the User table for MySQL
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(400),
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        allowNull: false,
    },
});

module.exports = User;