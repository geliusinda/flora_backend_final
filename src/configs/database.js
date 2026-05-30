const { Sequelize } = require("sequelize");
const { DATABASE_URL, DB_SSL } = require("./env");

if (!DATABASE_URL) {
  console.error("Database connection error: DATABASE_URL is not set");
  process.exit(1);
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: DB_SSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {},
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDatabase,
};
