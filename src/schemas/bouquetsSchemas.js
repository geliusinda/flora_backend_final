const Joi = require("joi");

const bouquetFields = {
  photoURL: Joi.string().trim().min(1),
  image2x: Joi.string().trim().min(1).allow(""),
  alt: Joi.string().trim().min(1).allow(""),
  title: Joi.string().trim().min(1),
  description: Joi.string().trim().min(1),
  price: Joi.string().trim().min(1),
  favorite: Joi.boolean(),
};

const addBouquetSchema = Joi.object({
  photoURL: bouquetFields.photoURL,
  image2x: bouquetFields.image2x,
  alt: bouquetFields.alt,
  title: bouquetFields.title.required(),
  description: bouquetFields.description.required(),
  price: bouquetFields.price.required(),
  favorite: bouquetFields.favorite,
});

const updateBouquetSchema = Joi.object(bouquetFields).min(1).messages({
  "object.min": "Body must have at least one field",
});

const updateFavoriteSchema = Joi.object({
  favorite: bouquetFields.favorite.required(),
});

module.exports = {
  addBouquetSchema,
  updateBouquetSchema,
  updateFavoriteSchema,
};
