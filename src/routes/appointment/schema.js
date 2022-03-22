const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  name: {
    type: String,
    default: "",
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = mongoose.model("Appointment", schema);

module.exports = { Appointment };
