const path = require("path");
const fs = require("fs/promises");

const dbPath = path.join(__dirname, "..", "..", "data", "db.json");

const normalizePositiveInteger = (value, fallback) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

const paginate = (items, queryParams) => {
  const page = normalizePositiveInteger(queryParams.page, 1);
  const perPage = normalizePositiveInteger(queryParams.limit || queryParams.perPage, 100);
  const start = (page - 1) * perPage;
  const data = items.slice(start, start + perPage);

  return {
    data,
    total: items.length,
    page,
    perPage,
    totalPages: Math.ceil(items.length / perPage) || 1,
  };
};

const readDb = async () => {
  const file = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(file);
};

const getCollection = (collectionName) => async (req, res) => {
  const db = await readDb();
  const items = db[collectionName];

  if (!Array.isArray(items)) {
    return res.status(404).json({ message: "Collection not found" });
  }

  return res.status(200).json(paginate(items, req.query));
};

const createPlaceholder = (resourceName) => (req, res) => {
  res.status(201).json({ message: `${resourceName} POST route is ready`, body: req.body });
};

const updatePlaceholder = (resourceName) => (req, res) => {
  res.status(200).json({ message: `${resourceName} PUT route is ready`, id: req.params.id, body: req.body });
};

const deletePlaceholder = (resourceName) => (req, res) => {
  res.status(200).json({ message: `${resourceName} DELETE route is ready`, id: req.params.id });
};

module.exports = {
  getCollection,
  createPlaceholder,
  updatePlaceholder,
  deletePlaceholder,
};
