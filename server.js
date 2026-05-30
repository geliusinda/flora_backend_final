const app = require("./app");
const { PORT } = require("./src/configs/env");
const { connectDatabase, sequelize } = require("./src/configs/database");
require("./src/models");

const startServer = async () => {
  await connectDatabase();
  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
