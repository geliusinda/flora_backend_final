const normalizeBouquet = (bouquet) => {
  if (!bouquet) return null;

  const plainBouquet = bouquet.toJSON ? bouquet.toJSON() : bouquet;
  const photoURL = plainBouquet.photoURL || plainBouquet.photo || plainBouquet.image || "";

  return {
    ...plainBouquet,
    photoURL,
    photo: photoURL,
    image: photoURL,
    image2x: plainBouquet.image2x || photoURL,
    alt: plainBouquet.alt || `${plainBouquet.title || "Flora"} bouquet`,
    favorite: Boolean(plainBouquet.favorite),
  };
};

module.exports = normalizeBouquet;
