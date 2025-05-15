const express = require("express");
const app = express();
const port = 3000;
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//konek
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbName = "labm12";
const db = client.db(dbName);

const main = async () => {
  await client.connect();
  console.log("masuk mongodb harusnya");
};
main();

//get all
app.get("/api/m12", async (req, res) => {
  const result = await db.collection("hero").find().toArray();
  return res.status(200).json(result);
});

//get one by name
app.get("/api/m12/:name", async (req, res) => {
  const { name } = req.params;
  const result = await db.collection("hero").findOne({ nama: name.toString() });
  if (!result) {
    return res.status(404).json("data tidak ditemukan");
  }
  return res.status(200).json(result);
});

//post
app.post("/api/m12", async (req, res) => {
  const { nama, kategori, attack, defend } = req.body;
  const skill = req.body.skill;

  await db.collection("hero").insertOne({
    nama: nama,
    kategori: kategori,
    attack: attack,
    defend: defend,
    skill: skill,
  });

  return res.status(200).json("berhasil menambah data");
});

//update
app.put("/api/m12/:id", async (req, res) => {
  const { id } = req.params;
  const { nama, kategori, attack, defend } = req.body;

  const result = await db.collection("hero").updateOne(
    { nama: id.toString() },
    {
      $set: {
        nama: nama,
        kategori: kategori,
        attack: attack,
        defend: defend,
      },
    }
  );
  console.log(result);

  if (result.matchedCount == 0) {
    return res.status(404).json(`id ${id} tidak ditemukan`);
  }

  return res.status(200).json(`berhasil update id ${id}`);
});

//delete by id
app.delete("/api/m12/:id", async (req, res) => {
  const { id } = req.params;
  const result = await db
    .collection("hero")
    .deleteOne({ _id: new ObjectId(id) });
  console.log(result);

  if (result.deletedCount === 0) {
    return res.status(404).json(`id ${id} tidak ditemukan`);
  }
  return res.status(200).json(`berhasil hapus id ${id}`);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
