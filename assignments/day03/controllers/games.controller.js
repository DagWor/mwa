const dbConnection = require('../services/db.connection')

module.exports.games = (req, res) => {

    const db = dbConnection.get();
    const connection = db.collection('games');
    if(req.query && parseInt(req.query.limit) < 8 ){
        let limit = parseInt(req.query.limit)
        connection.find().limit(limit).toArray((err, games) => res.status(200).json(games))
    } else {
        connection.find().limit(3).toArray((err, games) => {
            if(err) {
                res.status(400).send("No Games found")
            }
            else res.status(200).json(games);
        })
    }
}