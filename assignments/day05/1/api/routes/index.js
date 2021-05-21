const express = require('express')
const router = express.Router();
const controller = require('../controller/games.controller')

router.route('/games')
.get(controller.gameGetAll)
.post(controller.gamesAddOne)


router.route('/games/:id')
.get(controller.gameGetById)
.put(controller.gamesUpdateOne)
.delete(controller.gamesDeleteOne)
.patch(controller.gamesPatchOne)

module.exports = router;