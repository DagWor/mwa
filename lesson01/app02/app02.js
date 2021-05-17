require("../app01/instantHello")
const index = require("./talk")
const question = require("./talk/question")

const answer = question.ask("What is your name?")
console.log(answer);


index.greeting("Dagmawi")
index.intro()