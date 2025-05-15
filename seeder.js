// mongodb_seeder.js
// Seeder script for MongoDB using Node.js (native driver)
// Usage: node mongodb_seeder.js

const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "labm12";

// Data to seed
const heroKategoriData = [
  { _id: new ObjectId(), nama: "Tank" },
  { _id: new ObjectId(), nama: "Fighter" },
  { _id: new ObjectId(), nama: "Mage" },
  { _id: new ObjectId(), nama: "Assassin" },
  { _id: new ObjectId(), nama: "Marksman" },
];

const heroData = [
  {
    _id: new ObjectId(),
    nama: "Aldous",
    kategori: 2, // Fighter (index starting at 1)
    attack: 80,
    defend: 60,
    skill: [
      {
        _id: new ObjectId(),
        nama_skill: "Contract: Soul Steal",
        deskripsi_skill: "Stacks damage over time",
      },
      {
        _id: new ObjectId(),
        nama_skill: "Contract: Explosion",
        deskripsi_skill: "Unleashes a powerful burst",
      },
    ],
  },
  {
    _id: new ObjectId(),
    nama: "Miya",
    kategori: 5, // Marksman
    attack: 75,
    defend: 50,
    skill: [
      {
        _id: new ObjectId(),
        nama_skill: "Moon Arrow",
        deskripsi_skill: "Fires a piercing arrow",
      },
      {
        _id: new ObjectId(),
        nama_skill: "Turbo Stealth",
        deskripsi_skill: "Gains movement speed",
      },
    ],
  },
  // add more heroes as needed...
];

async function seed() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const db = client.db(dbName);

    // Clear existing collections
    await db.collection("hero_kategori").deleteMany({});
    await db.collection("hero").deleteMany({});

    // Insert kategori and heroes
    const { insertedCount: katCount } = await db
      .collection("hero_kategori")
      .insertMany(heroKategoriData);
    console.log(`Inserted ${katCount} hero_kategori documents`);

    const { insertedCount: heroCount } = await db
      .collection("hero")
      .insertMany(heroData);
    console.log(`Inserted ${heroCount} hero documents`);
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    await client.close();
  }
}

seed();
