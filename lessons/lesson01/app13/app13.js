const express = require('express');
const path = require('path');
const app = express();


app.set("port", 3000);

app.use('/css', (req, res, next) => {
    console.log(req.method, req.url);
    next();
})
app.use(express.static(path.join(__dirname, 'public')));

app.get('/json', (req, res) => {
    console.log("JSON received");
    res.status(200).json({"passed": true})
})

app.get('/file', (req, res) => {
    console.log("JSON received");
    res.status(200).sendFile(path.join(__dirname, 'app13.js'))
})


const server = app.listen(app.get("port"), () => {
    const port = server.address().port;
    console.log(`Listening on port ${port}`);
});
