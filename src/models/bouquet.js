const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/database");

const Bouquet = sequelize.define(
  "bouquet",
  {
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    image2x: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "bouquets",
  }
);

module.exports = Bouquet;
