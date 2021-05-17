const fs = require("fs");

console.log("1: Start");
const file = fs.readFileSync("../app05/longFile.txt");

const onFileLoad = function (err, f) {
    console.log(f);
}

fs.readFile(file, onFileLoad)

console.log("2: Got File");
console.log("3: End");
