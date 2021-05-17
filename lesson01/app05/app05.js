const fs = require("fs");

console.log("1: Start");
const file = fs.readFileSync("longFile.txt");

fs.readFile("longFile.txt", function (err, file) {
    console.log(file.length);
})

console.log("2: Got File");
console.log("3: End");
