const { DataTypes } = require("sequelize");
const sequelize = require("../config/queries");

const UserData = sequelize.define("User_data", {
  orcid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true, // Встановлюємо поле "orcid" як первинний ключ
  },
  data: {
    type: DataTypes.ARRAY(DataTypes.JSON), // Масив об'єктів
    allowNull: false,
  },
});

module.exports = { UserData };
