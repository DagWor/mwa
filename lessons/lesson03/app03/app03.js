const express = require('express');
const path = require('path');
const app = express();
const api = require('./api/routes');
require('./api/data/db');
require('./api/data/db.connection').opened();

app.set("port", 5000);

app.use('/css', (req, res, next) => {
    console.log(req.method, req.url);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use('/api', api);

const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
});
