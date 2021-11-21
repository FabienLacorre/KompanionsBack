const router = require('express').Router();

router.get('/', (req, res) => {
    console.log("PET ROUTE");
    res.send(200);
});

module.exports = router;