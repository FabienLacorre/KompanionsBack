const router = require("express").Router();
const { Race } = require("./schema");

router.get("/", (req, res) => {
  console.log("RACE ROUTE");
  res.send(200);
});

router.post("/add", (req, res) => {
  const { name } = req.body;
  Race.create({ name })
    .then(() => {
      res.send(200);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});

module.exports = router;
