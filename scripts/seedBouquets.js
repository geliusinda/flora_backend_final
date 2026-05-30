const path = require("path");
const fs = require("fs/promises");
const { connectDatabase, sequelize } = require("../src/configs/database");
const { Bouquet } = require("../src/models");

const seedBouquets = async () => {
  await connectDatabase();
  await sequelize.sync({ alter: true });

  const dbPath = path.join(__dirname, "..", "data", "db.json");
  const db = JSON.parse(await fs.readFile(dbPath, "utf-8"));
  const bouquets = db.bouquets.map((bouquet) => ({
    photoURL: bouquet.photoURL,
    image2x: bouquet.image2x,
    alt: bouquet.alt,
    title: bouquet.title,
    description: bouquet.description,
    price: bouquet.price,
    favorite: false,
  }));

  await Bouquet.destroy({ where: {} });
  await Bouquet.bulkCreate(bouquets);
  console.log("Bouquets seeded successfully");
  await sequelize.close();
};

seedBouquets().catch(async (error) => {
  console.error("Seed error:", error.message);
  await sequelize.close();
  process.exit(1);
});
