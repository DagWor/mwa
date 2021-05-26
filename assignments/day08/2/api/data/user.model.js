const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['author', 'user'],
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    }
})

module.exports = User = mongoose.model('users', UserSchema);