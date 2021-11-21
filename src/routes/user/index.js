const router = require("express").Router();
const { User } = require("./schema");
const { errorHandler } = require("../../utils");
const bcrypt = require("bcrypt");

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

router.post("/connect", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        res.send(user);
      } else {
        errorHandler(res, null, "Mot de passe incorrect.");
      }
    } else {
      errorHandler(res, null, "Utilisateur introuvable.");
    }
  } catch (err) {
    errorHandler(res, err, "Impossible de se connecter.");
  }
});

router.post("/add", async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);

    const createdUser = await User.create({
      email,
      firstname,
      lastname,
      password: hash,
    });
    res.send(createdUser);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter un nouvel utilisateur.");
  }
});

router.post("/edit", async (req, res) => {
  const { id, firstname, lastname, email } = req.body;
  try {
    await User.findByIdAndUpdate(id, { firstname, lastname, email }).exec();
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
