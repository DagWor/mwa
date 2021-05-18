const express = require('express')
const router = express.Router();
const controller = require('../controller/games.controller')

router.route('/addition/:number')
.get(controller.addition);

module.exports = router;