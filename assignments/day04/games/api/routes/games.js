const express = require('express')
const router = express.Router();
const controller = require('../controller/games.controller')

router.route('/games')
.get(controller.gameGetAll)


router.route('/games/:id')
.get(controller.gameGetById);

module.exports = router;