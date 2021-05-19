const mongoClient = require('mongodb').MongoClient;
const dbname = 'meanGames';
const dburl = `mongodb://127.0.0.1:27017/${dbname}`;

var _connection = null;

const open = () => {
    mongoClient.connect(dburl, { useUnifiedTopology: true }, (err, client) => {
        if(err) {
            console.log("DB connection failed" + err);
            return;
        }
        _connection = client.db(dbname);
        console.log("DB connection open");
    })
}

const get = () => {
    return _connection;
}

module.exports = {
    opened: open,
    get: get
}