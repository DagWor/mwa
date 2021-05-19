const express = require('express')
const router = express.Router();
const collection = require('../controllers/games.controller')

router.route('/games')
.get(collection.games)


module.exports = router