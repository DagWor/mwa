const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
    name: String,
    location: {
        type: "Point",
        coordinates:{
            type: [Number],
            index: '2dsphere'
        }
    }
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
    publisher: PublisherSchema
})

module.exports = Game = mongoose.model('games', GameSchema);