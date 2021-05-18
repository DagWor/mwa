const data = require('../data/MOCK_DATA.json')

module.exports.gameGetAll = (req, res) => {
    console.log("Games found");
    res.status(200).json(data);
}

module.exports.gameGetById = (req, res) => {
    console.log("Games found");
    res.status(200).json(data[req.params.id]);
}