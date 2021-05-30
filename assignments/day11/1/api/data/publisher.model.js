const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const PublisherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = Publisher = mongoose.model('publishers', PublisherSchema);