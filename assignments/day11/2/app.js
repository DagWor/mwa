const express = require('express');
const app = express();
const api = require('./api/routes/book.route');
const path = require('path')
require('./api/data/db');

app.set('port', 5000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: false}));
app.use('/api', api);

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
})