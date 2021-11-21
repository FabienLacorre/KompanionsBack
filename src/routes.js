const router = require('express').Router();

const routesPet = require('./routes/pet');
const routesRace = require('./routes/race');

router.use('/pet', routesPet);
router.use('/race', routesRace);

module.exports = router;
