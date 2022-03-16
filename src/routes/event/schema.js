const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  petId: {
    type: Schema.Types.ObjectId,
    ref: "Pet",
  },
  name: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: null,
  },
  numberDays: {
    type: Number,
    default: 0,
  },
});

const Event = mongoose.model("Event", schema);

module.exports = { Event };
