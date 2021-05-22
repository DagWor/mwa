const Student = require('../data/student.model')

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

module.exports.getAllAddress = (req, res) => {
    Student.findById(req.params.id).exec((err, student) => {
        if(err) res.status(400).send("Student not found")
        else {
                if(student.address && student.address.length !== 0) {
                    res.status(200).send(student.address)
                }
                else res.status(400).send("Address not found")
            }
    })
}


module.exports.addressAddOne = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    if (req.params.id) {
        Student.findById(req.params.id).exec((err, student) => {
            if (err) {
                response.status = 500;
                response.message = 'Server'
            } else if (!student) {
                response.status = 400;
                response.message = 'student not found'
            } else {
                let address = {}
                address.country = req.body.country
                address.city = req.body.city
                address.zip = req.body.zip

                if (student.address) student.address.push(address)
                else student.address = [address]
                student.save((err, updated) => {

                    if (err) {
                        response.status = 500;
                        response.message = err
                    } else if (!student) {
                        response.status = 400;
                        response.message = 'student not found'
                    } else {
                        response.message = updated
                        response.status = 201
                    }
                    res.status(response.status).json(response.message)
                })
            }
        })
    } else {
        response.status = 400;
        response.message = 'Game not found'

        res.status(response.status).json(response.message);
    }
}

module.exports.addressPatchOne = (req, res) => {
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
                    if (err) res.status(200).json({ 'message': 'Student not found' })
                    else if (!student) res.status(404).json({ 'message': `Could not get student with ID ${req.params.id}` })
                    else if (student.address && student.address.length !== 0) {
                        let address = student.address.find(a => a._id == req.params.addressId);
                        let addressIndex = student.address.findIndex(a => a._id == req.params.addressId);
                        let newAddress = {}

                        if (req.body.country) newAddress.country = req.body.country
                        else newAddress.country = address.country

                        if (req.body.city) newAddress.city = req.body.city
                        else newAddress.city = address.city

                        if (req.body.zip) newAddress.zip = req.body.zip
                        else newAddress.zip = address.zip

                        newAddress._id = address._id

                        if (addressIndex !== -1) {
                            student.address[addressIndex] = newAddress

                            student.save((err, updatedstudent) => {
                                if (err) {
                                    response.status = 500
                                    response.message = err
                                } else {
                                    console.log(updatedstudent)
                                    response.message = updatedstudent
                                }
                                res.status(response.status).json(response.message)
                            })
                        } else res.status(404).json({ 'message': "review not found" })

                    } else res.status(404).json({ 'message': "review not found" })

            }
        })
    }
}

module.exports.addressUpdateOne = (req, res) => {
    if (req.params.id) {
        Student.findById(req.params.id).exec((err, student) => {
            const response = {
                status: 201,
                message: student
            }

            if (err) res.status(500).json({ 'message': 'Student not found' })
            else if (!student) {
                response.status = 404
                response.message = 'student not found'
            }
            else if (response.status !== 201) res.status(response.status).json(response.message)

            else {
                Student.findById(req.params.id).exec((err, student) => {
                    if (err) res.status(200).json({ 'message': 'student not found' })
                    else if (!student) res.status(404).json({ 'message': `Could not get student with ID ${req.params.id}` })
                    else if (student.address && student.address.length !== 0) {
                        let address = student.address.find(a => a._id == req.params.addressId);
                        let addressIndex = student.address.findIndex(a => a._id == req.params.addressId);
                        let newAddress = {}

                        if(req.body && req.body.country && req.body.city && req.body.zip){
                            if (req.body.country) newAddress.country = req.body.country
                            if (req.body.city) newAddress.city = req.body.city
                            if (req.body.zip) newAddress.zip = req.body.zip
                            newAddress._id = address._id
    
                            if (addressIndex !== -1) {
                                student.address[addressIndex] = newAddress
    
                                student.save((err, updatedstudent) => {
                                    if (err) {
                                        response.status = 500
                                        response.message = err
                                    } else {
                                        console.log(updatedstudent)
                                        response.message = updatedstudent
                                    }
                                    res.status(response.status).json(response.message)
                                })
                            } else res.status(404).json({ 'message': "review not found" })
                        } else res.status(404).json({ 'message': "missing data to update" })

                    } else res.status(404).json({ 'message': "review not found" })

                });
            }
        })
    }
}

module.exports.addressDeleteOne = (req, res) => {
    if (req.params.id) {
        Student.findById(req.params.id, (err, student) => {
            let response = {
                status: 204,
                message: ""
            }
            if (err) {
                response.status = 500
                response.message = "Internal Server Error"
            } else if (!student) {
                response.status = 404
                response.message = "student not found in database"
            } else {
                response.status = 204
                response.message = "student Deleted Successfully"
            }

            let address = student.address.findIndex(a => a._id == req.params.addressId);
            student.address.pop(address)
            
            student.save((err, updatedstudent) => {
                if (err) {
                    response.status = 500
                    response.message = err
                } else {
                    console.log(updatedstudent)
                    response.message = updatedstudent
                }
                res.status(response.status).json(response.message)
            })

        })
    } else {
        response.status = 404
        response.message = "No Game ID provided"
        res.status(response.status).json(response.message)
    }

}