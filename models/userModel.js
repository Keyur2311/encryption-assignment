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
        type: DataTypes.STRING(600),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(600),
        allowNull: false,
        unique: true,
    },
    role: {
        // type: DataTypes.ENUM('Admin', 'Editor', 'Viewer'),
        type: DataTypes.STRING(500),
        allowNull: false,
    },
});

module.exports = User;