const Game = require('../data/game.model')

module.exports.gameGetAll = (req, res) => {
    let offset = 0
    let count = 5

    let maxCount = 10;

    if (req.query && req.query.offset) offset = parseInt(req.query.offset);
    if (req.query && req.query.count) count = parseInt(req.query.count);

    if (isNaN(offset) || isNaN(count)) res.status(400).json({ 'message': 'Query String offset and count should be numbers' });

    if(count > maxCount) res.status(400).json({'message': 'Count can not be greater than ' + maxCount});

    // Another approach to get games with limitations
    Game.find({}, {}, { skip: offset, limit: count }, (err, games) => {
        if (err) res.status(500).json(err);
        else res.status(200).json(games);
    })

    /*Game.find().skip(offset).limit(count).exec((err, games) => {
        res.status(200).json(games);
    })*/
}

// module.exports.gameGetById = (req, res) => Game.findById(req.params.id, (err, game) => res.status(200).json(game));
module.exports.gameGetById = (req, res) => Game.findById(req.params.id).exec((err, game) => {
    if(err) res.status(200).json({'message' : 'Game not found'})
    else if(!game) res.status(404).json({'message': `Could not get game with ID ${req.params.id}`})
    else res.status(200).json(game);

});

module.exports.gamesAddOne = (req, res) => {
    const response = {
        status: 201,
        message: ""
    }
    if (req.body && req.body.title && req.body.price && req.body.rate) {
        const newGame = {};
        newGame.title = req.body.price
        newGame.price = req.body.title
        newGame.rate = req.body.rate
        Game.create(newGame, (err, game) => {
            if(err){
                response.status = 500;
                response.message = err
            } else response.message = game

            res.status(response.status).json(response.message);
        })
    } else {
        response.status = 400;
        response.message = 'Game not found'

        res.status(response.status).json(response.message);
    }

    /*if (req.body && req.body.title && req.body.price && req.body.rate) {

        let newGame = new Game({
            price: req.body.price,
            title: req.body.title,
            rate: req.body.rate
        })

        newGame
            .save()
            .then((newGame) => res.status(200).send(`Successfully Added ${newGame.title} Game.`))
            .catch((err) => console.log(err));

    } else res.status(400).json({ error: "Missing information" })*/
}

module.exports.gameGetPublisher = (req, res) => {
    Game.findById(req.params.id).exec((err, game) => {
        if (game.publisher) res.status(200).json(game.publisher)
        else res.status(400).send('Publisher not found for Game')
    });
}