require("dotenv").config();

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || "*";
const DATABASE_URL = process.env.DATABASE_URL || "";
const DB_SSL = process.env.DB_SSL === "true";

module.exports = {
  PORT,
  CLIENT_URL,
  DATABASE_URL,
  DB_SSL,
};
