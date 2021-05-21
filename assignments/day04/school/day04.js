const express = require('express');
const app = express();
const api = require('./api/routes/students');
require('./api/data/db');

app.set('port', 5000);

app.use(express.json({extended: false}));
app.use('/api', api);

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
})