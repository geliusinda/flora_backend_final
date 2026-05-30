const express = require("express");
const {
  getCollection,
  createPlaceholder,
  updatePlaceholder,
  deletePlaceholder,
} = require("../controllers/collectionController");

const createCollectionRouter = (collectionName) => {
  const router = express.Router();

  router.get("/", getCollection(collectionName));
  router.post("/", createPlaceholder(collectionName));
  router.put("/:id", updatePlaceholder(collectionName));
  router.delete("/:id", deletePlaceholder(collectionName));

  return router;
};

module.exports = createCollectionRouter;
