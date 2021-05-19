const mongoClient = require('mongodb').MongoClient;
const dbname = 'meanGames';
const dburl = `mongodb://127.0.0.1:27017/${dbname}`;

var connection;

const open = () => {
    mongoClient.connect(dburl, { useUnifiedTopology: true}, (err, client) => {
        if(err) {
            console.log("DB connection failed" + err);
            return;
        }
        connection = client.db(dbname);
        console.log("DB connection open");
    })
}

const getConnection = () => {
    return connection;
}

module.exports = {
    open: open,
    get: getConnection
}