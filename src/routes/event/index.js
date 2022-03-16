const router = require("express").Router();
const { Event } = require("./schema");
const { errorHandler } = require("../../utils");

const getNextDate = (startDate, numberDays) => {
  if (startDate == null) {
    return null;
  }
  if (numberDays == null) {
    return null;
  }
  const date = new Date(startDate);
  date.setDate(date.getDate() + numberDays);
  while (date < new Date()){
    date.setDate(date.getDate() + numberDays);
  }
  return date;
};

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().lean().exec();
    events.forEach((element) => {
      element.nextDate = getNextDate(element.date, element.numberDays);
    });
    res.send(events);
  } catch (err) {
    errorHandler(res, err, "Impossible de recuperer la liste des evenements.");
  }
});

router.get("/pet/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const events = await Event.find({ petId: id }).lean().exec();
    events.forEach((element) => {
      element.nextDate = getNextDate(element.date, element.numberDays);
    });
    res.send(events);
  } catch (err) {
    errorHandler(res, err, "Impossible de recuperer les evenements.");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id).exec();
    res.send(event);
  } catch (err) {
    errorHandler(res, err, "Impossible de recuperer l'evenement.");
  }
});

router.post("/add", async (req, res) => {
  const { name, date, numberDays, petId } = req.body;
  try {
    const event = await Event.create({ name, date, numberDays, petId });
    res.send(event);
  } catch (err) {
    errorHandler(res, err, "Impossible d'ajouter un nouvel evenement.");
  }
});

router.post("/edit/:id", async (req, res) => {
  const { name, date } = req.body;
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndUpdate(
      id,
      { name, date },
      { $new: true }
    ).exec();
    res.send(event);
  } catch (err) {
    errorHandler(res, err, "Impossible de modifier l'evenement.");
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id).exec();
    res.send(200);
  } catch (err) {
    errorHandler(res, err, "Impossible de supprimer l'evenement.");
  }
});

module.exports = router;
