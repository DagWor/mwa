const dbConnection = require('../data/db.connection');
const data = require('../data/MOCK_DATA.json')

module.exports.gameGetAll = (req, res) => {
    var offset = 0
    var count = 5

    if(req.query && req.query.offset) offset = parseInt(req.query.offset)
    if(req.query && req.query.count) count = parseInt(req.query.count)
    const db = dbConnection.get();
    const parsedData = data.slice(offset, offset + count)
    res.status(200).json(parsedData);
}

module.exports.gameGetById = (req, res) => {
    console.log("Games found");
    
    res.status(200).json(data[req.params.id]);
}

module.exports.gamesAddOne = (req, res) => {
    console.log("new game");
    console.log(req.body);
    res.status(200).json(req.body);
}
