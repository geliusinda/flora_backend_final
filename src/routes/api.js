const express = require("express");
const createCollectionRouter = require("./collectionsRoutes");
const bouquetsRouter = require("./bouquetsRoutes");
const ordersRouter = require("./ordersRoutes");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", project: "flora_backend" });
});

router.use("/flowers", createCollectionRouter("flowers"));
router.use("/bouquets", bouquetsRouter);
router.use("/feedback", createCollectionRouter("feedback"));
router.use("/orders", ordersRouter);

module.exports = router;