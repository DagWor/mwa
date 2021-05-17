const fs = require("fs");

console.log("1: Start");
const f = fs.readFileSync("longFile.txt");

fs.readFile(f, function (err, file) {
    console.log(file.length);
})

console.log("2: Got File");
console.log("3: End");
