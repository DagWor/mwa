const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})


module.exports = User = mongoose.model('users', UserSchema);