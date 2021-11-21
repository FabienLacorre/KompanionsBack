const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
        type:String,
        default:'',
    },
});

const Race = mongoose.model('Race', schema);

module.exports = { Race };

