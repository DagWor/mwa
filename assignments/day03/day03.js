const express = require('express');
const api = require('./routes/routes');
const app = express();
require('./services/db.connection').open();

app.set('port', 5000);

app.use(express.json({extended: false}));
app.use('/api', api)

const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
})
