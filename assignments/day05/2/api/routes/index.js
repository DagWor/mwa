const express = require('express')
const router = express.Router();
const gameController = require('../controller/games.controller')
const publisherController = require('../controller/publisher.controller')

router.route('/games')
.get(gameController.gameGetAll)
.post(gameController.gamesAddOne)


router.route('/games/:id')
.get(gameController.gameGetById)
.put(gameController.gamesUpdateOne)
.delete(gameController.gamesDeleteOne)
.patch(gameController.gamesPatchOne)


router.route('/games/:id/publisher')
.get(publisherController.gameGetPublisher)
.post(publisherController.publishersAddOne)
.delete(publisherController.deleteOnePublisher)
.patch(publisherController.publisherPatchOne)


module.exports = router;