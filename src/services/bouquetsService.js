const gravatar = require("gravatar");
const { Op } = require("sequelize");
const { Bouquet } = require("../models");

const normalizeParams = (query) => {
  const page = Math.max(Number.parseInt(query.page || query._page || "1", 10), 1);
  const limit = Math.max(Number.parseInt(query.limit || query.perPage || query._per_page || "15", 10), 1);
  const search = String(query.query || query.search || query.q || "").trim();
  const sort = String(query.sort || "oldest").trim().toLowerCase();
  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    search,
    sort,
    offset,
  };
};

const createGravatarURL = (title) => {
  const email = `${String(title || "bouquet").toLowerCase().replace(/\s+/g, "-")}@flora.local`;
  return gravatar.url(email, {
    protocol: "https",
    s: "250",
    d: "identicon",
  });
};

const getBouquets = async (query = {}) => {
  const { page, limit, search, sort, offset } = normalizeParams(query);
  const where = search
    ? {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const order = sort === "newest" ? [["id", "DESC"]] : [["id", "ASC"]];

  const { rows, count } = await Bouquet.findAndCountAll({
    where,
    limit,
    offset,
    order,
  });

  return {
    rows,
    count,
    page,
    limit,
  };
};

const getBouquetById = async (bouquetId) => {
  return Bouquet.findByPk(bouquetId);
};

const addBouquet = async (body) => {
  return Bouquet.create({
    ...body,
    photoURL: body.photoURL || createGravatarURL(body.title),
    favorite: body.favorite ?? false,
  });
};

const updateBouquet = async (bouquetId, body) => {
  const bouquet = await Bouquet.findByPk(bouquetId);

  if (!bouquet) return null;

  return bouquet.update(body);
};

const deleteBouquet = async (bouquetId) => {
  const bouquet = await Bouquet.findByPk(bouquetId);

  if (!bouquet) return null;

  await bouquet.destroy();
  return bouquet;
};

const updateStatusBouquet = async (bouquetId, body) => {
  const bouquet = await Bouquet.findByPk(bouquetId);

  if (!bouquet) return null;

  return bouquet.update({ favorite: body.favorite });
};

const updateBouquetPhoto = async (bouquetId, photoURL) => {
  const bouquet = await Bouquet.findByPk(bouquetId);

  if (!bouquet) return null;

  return bouquet.update({ photoURL, image2x: photoURL });
};

module.exports = {
  getBouquets,
  getBouquetById,
  addBouquet,
  updateBouquet,
  deleteBouquet,
  updateStatusBouquet,
  updateBouquetPhoto,
};
