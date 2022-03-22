const router = require("express").Router();
const { Appointment } = require("./schema");
const { errorHandler } = require("../../utils");

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find({}).exec();
    res.send(appointments);
  } catch (err) {
    errorHandler(res, err, "Impossible de recuperer la liste des rendez-vous.");
  }
});

router.get("/userAndPet/:petId", async (req, res) => {
  console.log(req.session);
  const { petId } = req.params;
  try {
    const appointments = await Appointment.find({ petId: petId }).exec();
    res.send(appointments);
  } catch (err) {
    errorHandler(res, err, "Impossible de recuperer les rendez-vous.");
  }
});

module.exports = router;
