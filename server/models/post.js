const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Posts = sequelize.define('Posts', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: { 
        type: DataTypes.UUID,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
      },
    }, {
      timestamps: true,
});

module.exports = Posts;

