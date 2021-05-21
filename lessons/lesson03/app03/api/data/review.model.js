const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = ReviewSchema
// module.exports = Review = mongoose.model('reviews', ReviewSchema);