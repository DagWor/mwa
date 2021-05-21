const Game = require('../data/game.model')

module.exports.gameGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if (req.query && req.query.offset) offset = parseInt(req.query.offset)
    if (req.query && req.query.count) count = parseInt(req.query.count)
    
    // Another approach to get games with limitations
    Game.find({}, {}, {skip: offset, limit: count}, (err, games) => res.status(200).json(games));
}

// module.exports.gameGetById = (req, res) => Game.findById(req.params.id, (err, game) => res.status(200).json(game));
module.exports.gameGetById = (req, res) => Game.findById(req.params.id).exec((err, game) => res.status(200).json(game));
