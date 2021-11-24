const router = require("express").Router();

const routesPet = require("./routes/pet");
const routesRace = require("./routes/race");
const routesUser = require("./routes/user");

const { checkJWT } = require("./middleware/security");

router.use("/user", routesUser);
router.use("/pet", checkJWT, routesPet);
router.use("/race", routesRace);

module.exports = router;
