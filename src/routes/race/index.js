const router = require("express").Router();
const { Race } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const races = await Race.find({}).exec();
    res.send(races);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.post("/add", async (req, res) => {
  const { name } = req.body;
  try {
    await Race.create({ name });
    res.send(200);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.post("/edit", async (req, res) => {
  const { id, name } = req.body;
  try {
    await Race.findByIdAndUpdate(id, { name }).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err);
  }
});

router.delete("/remove", async (req, res) => {
  const { id } = req.body;
  try {
    await Race.findByIdAndRemove(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err);
  }
});

module.exports = router;
