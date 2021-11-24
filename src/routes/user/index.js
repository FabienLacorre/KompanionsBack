const router = require("express").Router();
const { User } = require("./schema");
const { errorHandler, hashPassword } = require("../../utils");
const bcrypt = require("bcrypt");
const jwt    = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY_JWT;

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
        const expireIn = 24 * 60 * 60;
        const token = jwt.sign(
        {user: user},
        SECRET_KEY,
        {expiresIn: expireIn});
        res.header('Authorization', 'Bearer ' + token);
        res.send(user);
      } else {
        errorHandler(res, null, "Mot de passe incorrect.", 401);
      }
    } else {
      errorHandler(res, null, "Utilisateur introuvable.", 401);
    }
  } catch (err) {
    errorHandler(res, err, "Impossible de se connecter.");
  }
});

router.post("/editPassword", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      errorHandler(res, {}, "les mots de passe ne correspondent pas.");
      return;
    }
    const hash = await hashPassword(password);
    await User.findOneAndUpdate({ email }, { password: hash }, { new: true });
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier le mot de passe.");
  }
});

router.post("/add", async (req, res) => {
  const { firstname, lastname, password, email } = req.body;
  try {
    const hash = await hashPassword(password);
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

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email } = req.body;
  try {
    await User.findByIdAndUpdate(id, { firstname, lastname, email }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier cet utilisateur.");
  }
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer cet utilisateur.");
  }
});

module.exports = router;
