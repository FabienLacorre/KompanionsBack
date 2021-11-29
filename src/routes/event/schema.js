const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: null,
  },
});

const Event = mongoose.model("Event", schema);

module.exports = { Event };
