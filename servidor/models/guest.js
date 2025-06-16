'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Guest.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    menu: DataTypes.STRING,
    tieneAcompanante: DataTypes.BOOLEAN,
    nombreAcompnanante: DataTypes.STRING,
    apellidoAcompanante: DataTypes.STRING,
    menuAcompanante: DataTypes.STRING,
    mail:{
      type: DataTypes.STRING,
      unique: true,
      notEmpty: true, 
    } 
  }, {
    sequelize,
    modelName: 'Guest',
    underscored: true,
    timestamps: false
  });
  return Guest;
};