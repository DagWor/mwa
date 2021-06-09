const express = require('express');
const app = express();
const api = require('./api/routes/book.route');
const path = require('path')
require('./api/data/db');
const cors = require('cors')

app.set('port', 5000);

app.use(cors())
app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type-Accept")
    next();
})


app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.json({extended: false}));
app.use('/api', api);

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
})