const router = require("express").Router();
const { Pet } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    let pets = await Pet.find({}).populate("race").lean().exec();
    res.send(pets);
  } catch (err) {
    errorHandler(res, err, "Impossible de récuperer la liste des Kompanions.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let pets = await Pet.findOne({ _id: req.params.id })
      .populate("race")
      .lean()
      .exec();
    res.send(pets);
  } catch (err) {
    errorHandler(res, err, "Impossible de récuperer la liste des Kompanions.");
  }
});

router.post("/add", async (req, res) => {
  const { name, adoptionLocation, identificationNumber, birthDate, race } =
    req.body;
  console.log(req.body);
  try {
    const createdPet = await Pet.create({
      name,
      adoptionLocation,
      identificationNumber,
      birthDate,
      race,
    });
    res.send(createdPet);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter un nouveau Kompanion.");
  }
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, adoptionLocation, identificationNumber, birthDate, race } =
    req.body;
  try {
    await Pet.findByIdAndUpdate(id, {
      name,
      adoptionLocation,
      identificationNumber,
      birthDate,
      race,
    }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier ce Kompanion.");
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Pet.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer ce Kompanion.");
  }
});

module.exports = router;
