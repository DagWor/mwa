const mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const ReviewSchema = new Schema({
    review: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        required: true
    }
})

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: String,
        default: `${new Date(Date.now()).getFullYear()}`,
        required: true
    },
    edition: {
        type: Number,
        default: 1,
        required: true
    },
    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users',
    //     required: true
    // },
    author: {
        type: String,
        default: 'Future work'
    },
    reviews: [ReviewSchema],
    createdDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Book = mongoose.model('books', BookSchema);