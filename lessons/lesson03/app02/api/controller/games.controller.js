const ObjectId = require('mongodb').ObjectId;
const dbConnection = require('../data/db.connection');

module.exports.gameGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if (req.query && req.query.offset) offset = parseInt(req.query.offset)
    if (req.query && req.query.count) count = parseInt(req.query.count)

    const db = dbConnection.get();
    const collection = db.collection('games');

    collection.find().skip(offset).limit(count).toArray((err, docs) => {
        res.status(200).json(docs);
    });
}

module.exports.gameGetById = (req, res) => {

    const collection = dbConnection.get().collection('games');

    collection.findOne({ _id: ObjectId(req.params.id) }, (err, data) => res.status(200).json(data))

}

module.exports.gamesAddOne = (req, res) => {

    const collection = dbConnection.get().collection('games');

    if (req.body && req.body.title && req.body.price && req.body.rate) {
        console.log(req.body);
        var newGame = req.body;
        newGame.price = parseFloat(req.body.price);
        newGame.title = req.body.title;
        newGame.rate = parseInt(req.body.rate);

        collection.insert(newGame, (err, response) => {
            console.log(response);
            res.status(201).json(response.ops)
        })

    } else {
        console.log("Missing data");
        res.status(400).json({error: "Missing information"})
    }
}
