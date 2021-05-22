const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);


const AddressSchema = new Schema({
    country: String,
    city: String,
    zip: Number
})

const StudentSchema = new Schema({
    name: String,
    gpa: Number,
    address: [AddressSchema]
})

module.exports = Student = mongoose.model('students', StudentSchema);