const filename = "index.js"

const intro = function () {
    console.log("File name is " + filename);
}

module.exports = {
    greeting: function (name) {
        console.log("Hello " + name);
    },
    intro: intro
}