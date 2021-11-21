const Race = require('./schema')
const { Schema } = mongoose;

const RaceSchema = new Schema({
    name: {
        type:String,
        default:'',
    },
});

const Race = mongoose.model('Race', RaceSchema);

module.exports = { Race };

