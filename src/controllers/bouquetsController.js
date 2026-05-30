const path = require("path");
const fs = require("fs/promises");
const HttpError = require("../helpers/HttpError");
const normalizeBouquet = require("../helpers/normalizeBouquet");
const {
  getBouquets,
  getBouquetById,
  addBouquet,
  updateBouquet,
  deleteBouquet,
  updateStatusBouquet,
  updateBouquetPhoto,
} = require("../services/bouquetsService");

const getAllBouquets = async (req, res) => {
  const { rows, count, page, limit } = await getBouquets(req.query);

  res.status(200).json({
    data: rows.map(normalizeBouquet),
    total: count,
    page,
    perPage: limit,
    totalPages: Math.ceil(count / limit) || 1,
  });
};

const getOneBouquet = async (req, res) => {
  const bouquet = await getBouquetById(req.params.bouquetId);

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(normalizeBouquet(bouquet));
};

const createBouquet = async (req, res) => {
  const bouquet = await addBouquet(req.body);
  res.status(201).json(normalizeBouquet(bouquet));
};

const putBouquet = async (req, res) => {
  const bouquet = await updateBouquet(req.params.bouquetId, req.body);

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(normalizeBouquet(bouquet));
};

const removeBouquet = async (req, res) => {
  const bouquet = await deleteBouquet(req.params.bouquetId);

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(normalizeBouquet(bouquet));
};

const patchFavoriteBouquet = async (req, res) => {
  const bouquet = await updateStatusBouquet(req.params.bouquetId, req.body);

  if (!bouquet) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(normalizeBouquet(bouquet));
};

const patchBouquetPhoto = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "Photo file is required");
  }

  const bouquet = await getBouquetById(req.params.bouquetId);

  if (!bouquet) {
    await fs.unlink(req.file.path);
    throw HttpError(404, "Not found");
  }

  const photosDir = path.join(process.cwd(), "public", "photos");
  await fs.mkdir(photosDir, { recursive: true });

  const extension = path.extname(req.file.originalname) || ".jpg";
  const filename = `bouquet-${req.params.bouquetId}-${Date.now()}${extension}`;
  const finalPath = path.join(photosDir, filename);

  await fs.rename(req.file.path, finalPath);

  const photoURL = `/photos/${filename}`;
  const updatedBouquet = await updateBouquetPhoto(req.params.bouquetId, photoURL);

  res.status(200).json(normalizeBouquet(updatedBouquet));
};

module.exports = {
  getAllBouquets,
  getOneBouquet,
  createBouquet,
  putBouquet,
  removeBouquet,
  patchFavoriteBouquet,
  patchBouquetPhoto,
};
