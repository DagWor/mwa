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

module.exports.studentAddOne = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    if (req.body && req.body.name && req.body.gpa && req.body.address) {
        const newStudent = {};
        newStudent.name = req.body.name
        newStudent.gpa = req.body.gpa
        newStudent.address = req.body.address;

        Student.create(newStudent, (err, student) => {
            if (err) {
                response.status = 500;
                response.message = err
            } else response.message = student

            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = 'Student not found'

        res.status(response.status).json(response.message);
    }
}

module.exports.studentUpdateOne = (req, res) => {
    if(req.params.id){
        Student.findById(req.params.id).exec((err, student) => {
            const response = {
                status: 201,
                message: student
            }

            if (err) res.status(500).json({ 'message': 'Student not found' })
            else if (!student) {
                response.status = 404   
                response.message = 'Student not found'
            }
            else if(response.status !== 201) res.status(response.status).json(response.message)
                
            else {
                if(req.body && req.body.name && req.body.gpa && req.body.address){
                    student.name = req.body.name
                    student.gpa = req.body.gpa
                    student.address = req.body.address
                    student.save((err, updatedStudent) => {
                        if(err) {
                            response.status = 500
                            response.message = err
                        } else {
                            console.log(updatedStudent)
                            response.message = updatedStudent
                        }
                    })
                    res.status(response.status).json(response.message)
                } else {
                    response.status = 400
                    response.message = 'missing information'
                    res.status(response.status).json(response.message)
                }
            }
        
        });
    }
}

module.exports.studentPatchOne = (req, res) => {
    if (req.params.id) {
        Student.findById(req.params.id).exec((err, student) => {
            const response = {
                status: 201,
                message: student
            }

            if (err) res.status(500).json({ 'message': 'student not found' })
            else if (!student) {
                response.status = 404
                response.message = 'student not found'
            }
            else if (response.status !== 201) res.status(response.status).json(response.message)

            else {
                if(req.body.name) student.name = req.body.name
                if(req.body.gpa) student.gpa = req.body.gpa
                if(req.body.address) student.address = req.body.address
                student.save((err, updatedstudent) => {
                    if (err) {
                        response.status = 500
                        response.message = err
                    } else {
                        response.message = updatedstudent
                    }
                })
                res.status(response.status).json(response.message)
            }

        });
    }
}


module.exports.studentDeleteOne = (req, res) => {
    if (req.params.id) {
        Student.findByIdAndDelete(req.params.id, (err, student) => {
            let response = {
                status: 204,
                message: ""
            }
            if (err) {
                response.status = 500
                response.message = "Internal Server Error"
            } else if(!student) {
                response.status = 404
                response.message = "student not found in database"
            } else {
                response.status = 204
                response.message = "student Deleted Successfully"
            }

            res.status(response.status).json({'message': response.message})
        })
    } else {
        response.status = 404
        response.message = "No Student ID provided"
        res.status(response.status).json(response.message)
    }

}