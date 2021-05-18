const express = require("express");
const path = require("path")
const app = express();

app.set("port", 3000)

app.get('/', (req, res) => {
    res.status(200).send("Received your GET request")
})

app.get('/json', (req, res) => {
    res.status(200).json({"name": true})
})

app.get('/file', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'app11.js'))
})

const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
})