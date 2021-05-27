const express = require('express')
const router = express.Router();
const controller = require('../controller/games.controller')

router.route('/games')
.get(controller.gameGetAll)
.post(controller.gamesAddOne)


router.route('/games/:id')
.get(controller.gameGetById)
.put(controller.gamesUpdateOne)

router.route('/games/:id/publisher')
.get(controller.gameGetPublisher)

router.route('/games/:id/publisher')
.get(controller.gameGetPublisher)
.post(controller.publishersAddOne)

module.exports = router;