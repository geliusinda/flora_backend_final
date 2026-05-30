const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const apiRoutes = require("./src/routes/api");
const notFound = require("./src/middlewares/notFound");
const errorHandler = require("./src/middlewares/errorHandler");
const { CLIENT_URL } = require("./src/configs/env");

const app = express();
const publicDir = path.join(__dirname, "public");
const photosDir = path.join(publicDir, "photos");

app.use(cors({ origin: CLIENT_URL === "*" ? true : CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(publicDir));
app.use("/photos", express.static(photosDir));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", apiRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
