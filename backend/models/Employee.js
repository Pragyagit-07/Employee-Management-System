const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  position: { type: DataTypes.STRING, allowNull: false },
  salary: { type: DataTypes.DECIMAL, allowNull: false },
  date_of_joining: { type: DataTypes.DATEONLY, allowNull: false },
},{
   timestamps: false, 
  tableName: 'employees',
});

module.exports = Employee;
