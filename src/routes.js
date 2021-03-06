const router = require("express").Router();

const routesPet = require("./routes/pet");
const routesRace = require("./routes/race");
const routesUser = require("./routes/user");
const routesEvent = require("./routes/event");
const routesAppointment = require("./routes/appointment");

const { checkJWT } = require("./middleware/security");

router.use("/user", routesUser);
router.use("/event", routesEvent);
router.use("/race", routesRace);
router.use("/pet", checkJWT, routesPet);
router.use("/appointment", checkJWT, routesAppointment);

module.exports = router;
