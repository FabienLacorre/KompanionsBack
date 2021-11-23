
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = new Schema({
  // STRING 
  name: {
    type: String,
    default: "",
  },
  adoptionLocation: {
    type: String,
    default: "",
  },
  identificationNumber: {
    type: String,
    default: "",
  },
   img: {
    type: String,
    default: "",
  },
  // DATES
  birthDate: {
    type: Date,
    default: null,
  },
  // OBJECT ID 
  race: {
    type: ObjectId,
    ref: "Race",
    default: null,
  },
 
});

const Pet = mongoose.model("Pet", schema);

module.exports = { Pet };
