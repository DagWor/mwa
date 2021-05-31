const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller')
const userController = require('../controller/user.controller')
const reviewController = require('../controller/review.controller')
const authController = require('../controller/auth.controller')

router.route('/books')
.get(bookController.getAllBooks)
.post(bookController.addOneBook)

router.route('/book/:id')
.get(bookController.getBookById)
.put(bookController.updateOneBook)
.patch(bookController.patchOneBook)
.delete(bookController.deleteOneBook)

router.route('/book/:id/author')
.get(userController.getBookAuthor)
.delete(userController.deleteOneAuthor)
.put(userController.updateOneAuthor)
.patch(userController.patchOneAuthor)

router.route('/authors')
.get(userController.getAllAuthors)

router.route('/author/:id')
.get(userController.getAuthorBooks)


router.route('/book/:id/reviews')
.get(reviewController.getAllReviews)
.post(reviewController.addOneReview)

router.route('/book/:id/reviews/:reviewId')
.get(reviewController.getReviewById)
.put(reviewController.updateOneReview)
.patch(reviewController.patchOneReview)
.delete(reviewController.deleteOneReview)

router.route('/users')
.post(userController.registerUser)

router.route('/auth')
.post(authController.authenticateUser)

module.exports = router