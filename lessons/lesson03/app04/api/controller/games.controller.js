const Game = require('../data/game.model')

module.exports.gameGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if (req.query && req.query.offset) offset = parseInt(req.query.offset)
    if (req.query && req.query.count) count = parseInt(req.query.count)


    
    // Another approach to get games with limitations
    Game.find({}, {}, {skip: offset, limit: count}, (err, games) => res.status(200).json(games))

    /*Game.find().skip(offset).limit(count).exec((err, games) => {
        res.status(200).json(games);
    })*/
}

// module.exports.gameGetById = (req, res) => Game.findById(req.params.id, (err, game) => res.status(200).json(game));
module.exports.gameGetById = (req, res) => Game.findById(req.params.id).exec((err, game) => res.status(200).json(game));

module.exports.gamesAddOne = (req, res) => {
    if (req.body && req.body.title && req.body.price && req.body.rate) {

        let newGame = new Game({
            price: req.body.price,
            title: req.body.title,
            rate: req.body.rate
        })
        
        newGame
            .save()
            .then((newGame) => res.send("Successfully Added Game."))
            .catch((err) => console.log(err));

    } else res.status(400).json({error: "Missing information"})
}
