const { ObjectId } = require('bson');
const dbConnection = require('../data/db.connection');
const data = require('../data/MOCK_DATA.json')

module.exports.gameGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if(req.query && req.query.offset) offset = parseInt(req.query.offset)
    if(req.query && req.query.count) count = parseInt(req.query.count)

    const db = dbConnection.get();
    const collection = db.collection('games');

    collection.find().skip(offset).limit(count).toArray((err, docs) => {
        res.status(200).json(docs);
    });
}

module.exports.gameGetById = (req, res) => {
    console.log("Games found");
    const collection = dbConnection.get().collection('games');

    collection.findOne({_id: ObjectId(req.params.id)}, (err, data) => res.status(200).json(data))
    
}

module.exports.gamesAddOne = (req, res) => {
    console.log("new game");
    console.log(req.body);
    res.status(200).json(req.body);
}
