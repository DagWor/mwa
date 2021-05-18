const express = require("express");

const app = express();

app.set("port", 3000)

const server = app.listen(app.get("port"), () => {
    console.log(`Listening on port ${app.get("port")}`);
})