const router = require("express").Router();
const { Pet } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({}).exec();
    res.send(pets);
  } catch (err) {
    errorHandler(res, err, "Impossible de récuperer la liste des Kompanions.");
  }
});

router.post("/add", async (req, res) => {
  const { name } = req.body;
  try {
    const createdPet = await Pet.create({ name });
    res.send(createdPet);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter un nouveau Kompanion.");
  }
});

router.post("/edit", async (req, res) => {
  const { id, name } = req.body;
  try {
    await Pet.findByIdAndUpdate(id, { name }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier ce Kompanion.");
  }
});

router.delete("/remove", async (req, res) => {
  const { id } = req.body;
  try {
    await Pet.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer ce Kompanion.");
  }
});

module.exports = router;
