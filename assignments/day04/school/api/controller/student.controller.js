const Student = require('../data/student.model')

module.exports.studentGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if(req.params && req.params.id){
        Student.findById(req.params.id).exec((err, student) => res.status(200).json(student));
        return;
    }
    if (req.query && req.query.offset) offset = parseInt(req.query.offset)
    if (req.query && req.query.count) count = parseInt(req.query.count)
    
    // Another approach to get students with limitations
    Student.find({}, {}, {skip: offset, limit: count}, (err, students) => res.status(200).json(students));
}
module.exports.studentGetById = (req, res) => Student.findById(req.params.id).exec((err, student) => res.status(200).json(student));

module.exports.getAddresses = (req, res) => {
    Student.findById(req.params.id).exec((err, student) => {
        if(err) res.status(400).send("Student not found")
        else {
                if(student.address) res.status(200).send(student.address);
                else res.status(400).send("Address not found")
            }
    })
}

module.exports.getAddress = (req, res) => {
    Student.findById(req.params.id).select("address").exec((err, student) => {
        if(err) res.status(400).send("Student not found")
        else {
                if(student.address) {
                    let add = student.address.filter(a => a._id == req.params.addressId);
                    res.status(200).send(add)
                }
                else res.status(400).send("Address not found")
            }
    })
}
