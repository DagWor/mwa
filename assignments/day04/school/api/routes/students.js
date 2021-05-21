const express = require('express')
const router = express.Router();
const controller = require('../controller/student.controller')

router.route('/students')
.get(controller.studentGetAll)


router.route('/students/:id')
.get(controller.studentGetById);

router.route('/students/:id/addresses')
.get(controller.getAddresses);

router.route('/students/:id/addresses/:addressId')
.get(controller.getAddress);

module.exports = router;