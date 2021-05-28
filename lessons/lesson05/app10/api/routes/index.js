const express = require('express')
const router = express.Router();
const gameController = require('../controller/games.controller')
const publisherController = require('../controller/publisher.controller')
const reviewController = require('../controller/review.controller')
const userController = require('../controller/user.controller')

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

router.route('/games/:id/review')
.post(reviewController.reviewAddOne)
.get(reviewController.reviewGetAll)

router.route('/games/:id/review/:reviewId')
.delete(reviewController.reviewDeleteOne)
.patch(reviewController.reviewPatchOne)
.put(reviewController.reviewUpdateOne)
.get(reviewController.reveiwGetById)

router.route('/users')
.post(userController.registerUser)
.patch()
.put()

router.route('/auth')
.post(userController.authenticateUser)

module.exports = router;