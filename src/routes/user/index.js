const router = require("express").Router();
const { User } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.send(users);
  } catch (err) {
    errorHandler(
      res,
      err,
      "Impossible de récuperer la liste des utilisateurs."
    );
  }
});

router.post("/add", async (req, res) => {
  const { firstname, lastname } = req.body;
  try {
    const createdUser = await User.create({ firstname, lastname });
    res.send(createdUser);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter un nouvel utilisateur.");
  }
});

router.post("/edit", async (req, res) => {
  const { id, firstname, lastname } = req.body;
  try {
    await User.findByIdAndUpdate(id, { firstname, lastname }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier cet utilisateur.");
  }
});

router.delete("/remove", async (req, res) => {
  const { id } = req.body;
  try {
    await User.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer cet utilisateur.");
  }
});

module.exports = router;
