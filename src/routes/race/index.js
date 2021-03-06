const router = require("express").Router();
const { Race } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const races = await Race.find({}).exec();
    res.send(races);
  } catch (err) {
    errorHandler(
      res,
      err,
      "Impossible de récuperer la liste des races de Kompanions disponible."
    );
  }
});

router.post("/add", async (req, res) => {
  const { name } = req.body;
  try {
    const createdRace = await Race.create({ name });
    res.send(createdRace);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter une nouvelle race.");
  }
});

router.post("/edit/id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Race.findByIdAndUpdate(id, { name }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier cette race.");
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Race.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer cette race.");
  }
});

module.exports = router;
