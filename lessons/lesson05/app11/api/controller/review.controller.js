const Game = require('../data/game.model')

module.exports.reviewGetAll = (req, res) => {
    let offset = 0
    let count = 5

    let maxCount = 10;

    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count) count = parseInt(req.query.count);

    if (isNaN(offset) || isNaN(count)) res.status(400).json({ 'message': 'Query String offset and count should be numbers' });

    if (count > maxCount) res.status(400).json({ 'message': 'Count can not be greater than ' + maxCount });

    Game.findById(req.params.id).exec((err, game) => {
        const response = {
            status: 200,
            message: game
        }

        if (err) {
            response.status = 500
            response.message = 'Server Issues'
        }
        else if (!game) {
            response.message = 'No Game found'
        }
        else if (!game.reviews) {
            response.message = 'No reviews found'
        } else {
            response.message = game.reviews.slice(offset, count)

        }

        res.status(200).json(response.message)
    })
}

// module.exports.gameGetById = (req, res) => Game.findById(req.params.id, (err, game) => res.status(200).json(game));
module.exports.reveiwGetById = (req, res) => Game.findById(req.params.id).exec((err, game) => {
    if (err) res.status(200).json({ 'message': 'Game not found' })
    else if (!game) res.status(404).json({ 'message': `Could not get game with ID ${req.params.id}` })
    else if (game.reviews && game.reviews.length !== 0) {
        let review = game.reviews.filter(a => a._id == req.params.reviewId);
        res.status(200).json(review);
    } else res.status(404).json({ 'message': "review not found" })

});

module.exports.reviewAddOne = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    if (req.params.id) {
        Game.findById(req.params.id).exec((err, game) => {
            if (err) {
                response.status = 500;
                response.message = 'Server'
            } else if (!game) {
                response.status = 400;
                response.message = 'Game not found'
            } else {
                let review = {}
                review.name = req.body.name
                review.review = req.body.review
                review.date = req.body.date

                if (game.reviews) game.reviews.push(review)
                else game.reviews = [review]
                game.save((err, updated) => {

                    if (err) {
                        console.log("Got here 1 ")
                        response.status = 500;
                        response.message = err
                    } else if (!game) {
                        console.log("Got here 2")
                        response.status = 400;
                        response.message = 'Game not found'
                    } else {
                        console.log("Got here 3")
                        response.message = updated
                        response.status = 201
                    }
                    res.status(response.status).json(response.message)
                })
            }
        })
    } else {
        response.status = 400;
        response.message = 'Game not found'

        res.status(response.status).json(response.message);
    }
}

// TODO

module.exports.reviewUpdateOne = (req, res) => {
    if (req.params.id) {
        Game.findById(req.params.id).exec((err, game) => {
            const response = {
                status: 201,
                message: game
            }

            if (err) res.status(500).json({ 'message': 'Game not found' })
            else if (!game) {
                response.status = 404
                response.message = 'Game not found'
            }
            if (response.status !== 201) res.status(response.status).json(response.message)

            else {
                Game.findById(req.params.id).exec((err, game) => {
                    if (err) res.status(200).json({ 'message': 'Game not found' })
                    else if (!game) res.status(404).json({ 'message': `Could not get game with ID ${req.params.id}` })
                    else if (game.reviews && game.reviews.length !== 0) {
                        let reviewIndex = game.reviews.findIndex(a => a._id == req.params.reviewId);
                        let review = game.reviews.find(a => a._id == req.params.reviewId);
                        let newReview = {}

                        if (req.body.review) newReview.review = req.body.review
                        if (req.body.name) newReview.name = req.body.name
                        if (req.body.date) newReview.date = req.body.date
                        newReview._id = review._id

                        if (reviewIndex !== -1) {
                            game.reviews[reviewIndex] = newReview

                            game.save((err, updatedGame) => {
                                if (err) {
                                    response.status = 500
                                    response.message = err
                                } else {
                                    console.log(updatedGame)
                                    response.message = updatedGame
                                }
                                res.status(response.status).json(response.message)
                            })
                        } else res.status(404).json({ 'message': "review not found" })

                    } else res.status(404).json({ 'message': "review not found" })

                });
            }
        })
    }
}

module.exports.reviewPatchOne = (req, res) => {
    if (req.params.id) {
        Game.findById(req.params.id).exec((err, game) => {
            const response = {
                status: 201,
                message: game
            }

            if (err) res.status(500).json({ 'message': 'Game not found' })
            else if (!game) {
                response.status = 404
                response.message = 'Game not found'
            }
            if (response.status !== 201) res.status(response.status).json(response.message)

            else {
                Game.findById(req.params.id).exec((err, game) => {
                    if (err) res.status(200).json({ 'message': 'Game not found' })
                    else if (!game) res.status(404).json({ 'message': `Could not get game with ID ${req.params.id}` })
                    else if (game.reviews && game.reviews.length !== 0) {
                        let review = game.reviews.find(a => a._id == req.params.reviewId);
                        let reviewIndex = game.reviews.findIndex(a => a._id == req.params.reviewId);
                        let newReview = {}

                        if (req.body.name) newReview.name = req.body.name
                        else newReview.name = review.name

                        if (req.body.review) newReview.review = req.body.review
                        else newReview.review = review.review

                        if (req.body.date) newReview.date = req.body.date
                        else newReview.date = review.date

                        newReview._id = review._id

                        if (reviewIndex !== -1) {
                            game.reviews[reviewIndex] = newReview

                            game.save((err, updatedGame) => {
                                if (err) {
                                    response.status = 500
                                    response.message = err
                                } else {
                                    console.log(updatedGame)
                                    response.message = updatedGame
                                }
                                res.status(response.status).json(response.message)
                            })
                        } else res.status(404).json({ 'message': "review not found" })

                    } else res.status(404).json({ 'message': "review not found" })

                });
            }
        })
    }
}

module.exports.reviewDeleteOne = (req, res) => {
    if (req.params.id) {
        Game.findById(req.params.id, (err, game) => {
            let response = {
                status: 204,
                message: ""
            }
            if (err) {
                response.status = 500
                response.message = "Internal Server Error"
            } else if (!game) {
                response.status = 404
                response.message = "Game not found in database"
            } else {
                response.status = 204
                response.message = "Game Deleted Successfully"
            }

            let review = game.reviews.findIndex(a => a._id == req.params.reviewId);
            game.reviews.pop(review)
            
            game.save((err, updatedGame) => {
                if (err) {
                    response.status = 500
                    response.message = err
                } else {
                    console.log(updatedGame)
                    response.message = updatedGame
                }
                res.status(response.status).json(response.message)
            })
        })
    } else {
        response.status = 404
        response.message = "No Game ID provided"
        res.status(response.status).json(response.message)
    }

}