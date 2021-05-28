const Game = require('../data/game.model')

const _addPublisher = (req, res, game, response) => {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country
    game.save((err, updatedGame) => {
        if (err) {
            response.status = 500;
            response.message = err;
        } else response.message = updatedGame

        res.status(response.status).json(response.message)
    })
}

module.exports.publishersAddOne = (req, res) => {
    const gameId = req.params.id;
    Game.findById(gameId).exec((err, game) => {
        const response = {
            status: 201,
            message: game
        }

        if (err) {
            reqponse.status = 500;
            response.message = err;
        } else if (!game) {
            response.status = 404;
            response.message = 'Game not found'
        }

        if (game) _addPublisher(req, res, game, response);
        else res.status(response.status).json(response.message);
        // const publisher = game.publisher.id()
    })
}

module.exports.gameGetPublisher = (req, res) => {
    Game.findById(req.params.id).exec((err, game) => {
        if (game.publisher) res.status(200).json(game.publisher)
        else res.status(400).send('Publisher not found for Game')
    });
}

module.exports.deleteOnePublisher = (req, res) => {
    const response = {
        status: 204,
        message: "Deleted publisher"
    }
    Game.findById(req.params.id).exec((err, game) => {
        if (err) {
            response.satus = 500
            response.message = 'Internal Server Error'
        } else if (!game.publisher) {
            response.status = 404
            response.message = 'Publisher not found'
        }
        else if (game.publisher) {
            game.publisher.remove()
            game.save((err, game) => {
                if (err) {
                    response.satus = 500
                    response.message = 'Internal Server Error'
                } else if (!game) {
                    response.status = 404
                    response.message = 'Publisher not found'
                }

                res.status(response.status).json(response.message)
            })
        } else res.status(response.status).json(response.message)
    });
}

module.exports.publisherPatchOne = (req, res) => {
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
                if (game.publisher) {
                    if (req.body.name) game.publisher.name = req.body.name
                    if (req.body.country) game.publisher.country = req.body.country
                    game.save((err, updatedGame) => {
                        if (err) {
                            response.status = 500
                            response.message = err
                        } else {
                            console.log(updatedGame)
                            response.message = updatedGame
                        }
                    })
                    res.status(response.status).json(response.message)
                } else res.status(404).json({'message': 'publisher not found'})
            }
        });
    }
}

