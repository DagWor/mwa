const mongoose = require('mongoose');
require('./book.model')
const dbname = 'booktopia';
const dburl = `mongodb://127.0.0.1:27017/${dbname}`;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true });

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Connection close by App Termination");
    })
})

process.on("SIGTERM", () => {
    mongoose.connection.close(() => {
        console.log("Connection close by App Termination");
    })
})

process.once("SIGUSR2", () => {
    mongoose.connection.close(() => {
        console.log("Connection closed by App Restart");
        process.kill(process.pid, 'SIGUSR2')
    })
})

mongoose.connection.on("connected", () => {
    console.log(`DB connected`);
})

mongoose.connection.on("disconnected", () => {
    console.log(`DB unable to connect`);
})

mongoose.connection.on("error", () => {
    console.log(`DB failure`);
})