const router = require("express").Router();

const routesPet = require("./routes/pet");
const routesRace = require("./routes/race");
const routesUser = require("./routes/user");
const routesEvent = require('./routes/event');
const { checkJWT } = require("./middleware/security");

router.use("/user", routesUser);
router.use("/pet", checkJWT, routesPet);
router.use("/race", routesRace);
router.use('/event', routesEvent);

module.exports = router;
