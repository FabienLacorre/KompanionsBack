const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    date: {
        type: Date,
        default: null,
    },
    name: {
        type: String,
        default: "",
    }
})

const Event = mongoose.model('Event', schema);

module.exports = { Event };