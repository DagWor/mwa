const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    zip: {
        type: Number,
        required: true
    }
})

const JobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    location: LocationSchema,
    postDate: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String
    },
    experience: {
        type: Number
    },
    skills: {
        type: [String]
    }
})

module.exports = Job = mongoose.model('jobs', JobSchema);