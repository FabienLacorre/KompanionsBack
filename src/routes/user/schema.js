const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    default: "",
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", schema);

module.exports = { User };
