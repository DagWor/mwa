const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);



const ReviewSchema = new Schema({
    name: String,
    review: String,
    // todo - date
    date: Number

})

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10,
        default: 1
    },
    minAge: Number,
    designers: String,
    publisher: {
        type: Schema.Types.ObjectId,
        rel: "publishers"
    },
    reviews: [ReviewSchema]
})

module.exports = Game = mongoose.model('games', GameSchema);