
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  name: {
    type: String,
    default: "",
  },
  race: {
    Type: ObjectId,
    ref: "Race",
  },
});

const Pet = mongoose.model("Pet", schema);

module.exports = { Pet };
