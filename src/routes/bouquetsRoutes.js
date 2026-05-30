const express = require("express");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const validateBody = require("../helpers/validateBody");
const upload = require("../middlewares/upload");
const {
  addBouquetSchema,
  updateBouquetSchema,
  updateFavoriteSchema,
} = require("../schemas/bouquetsSchemas");
const {
  getAllBouquets,
  getOneBouquet,
  createBouquet,
  putBouquet,
  removeBouquet,
  patchFavoriteBouquet,
  patchBouquetPhoto,
} = require("../controllers/bouquetsController");

const router = express.Router();

router.get("/", ctrlWrapper(getAllBouquets));
router.get("/:bouquetId", ctrlWrapper(getOneBouquet));
router.post("/", validateBody(addBouquetSchema), ctrlWrapper(createBouquet));
router.put("/:bouquetId", validateBody(updateBouquetSchema), ctrlWrapper(putBouquet));
router.delete("/:bouquetId", ctrlWrapper(removeBouquet));
router.patch("/:bouquetId/favorite", validateBody(updateFavoriteSchema), ctrlWrapper(patchFavoriteBouquet));
router.patch("/:bouquetId/photo", upload.single("photo"), ctrlWrapper(patchBouquetPhoto));

module.exports = router;
