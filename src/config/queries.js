const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "orcidDB",
  username: "postgres",
  password: "1111",
  host: "localhost",
  port: 5432,
});

module.exports = sequelize;
