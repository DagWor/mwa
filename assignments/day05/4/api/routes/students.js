const express = require('express')
const router = express.Router();
const studentController = require('../controller/student.controller')
const addressController = require('../controller/address.controller')

router.route('/students')
.get(studentController.studentGetAll)
.post(studentController.studentAddOne)


router.route('/students/:id')
.get(studentController.studentGetById)
.put(studentController.studentUpdateOne)
.patch(studentController.studentPatchOne)
.delete(studentController.studentDeleteOne)

router.route('/students/:id/address')
.get(addressController.getAllAddress)
.post(addressController.addressAddOne)

router.route('/students/:id/address/:addressId')
.get(addressController.getAddress)
.patch(addressController.addressPatchOne)
.put(addressController.addressUpdateOne)
.delete(addressController.addressDeleteOne)

module.exports = router;