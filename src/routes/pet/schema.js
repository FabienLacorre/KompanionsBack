const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PetSchema = new Schema({
  name: {
    type: String,
    default: "",
  },
  race: {
    Type: ObjectId,
    ref: "Race",
  },
});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = { Pet };
