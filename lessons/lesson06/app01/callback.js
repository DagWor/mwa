/*const myInsert = function(data, callback) {
    console.log("Insertion ", data)
    const rand = Math.random() * 10;
    if(rand > 5) callback(null, rand);
    else callback({err: "unable to save save"})
}

myInsert(4, function(err, res){
    if (err) console.log(err)
    else console.log(err)
})*/

/*const { exec } = require('child_process');

const readFromDbById = function (data, callback) {
    console.log("Insertion ", data)
    const rand = Math.random() * 10;

    exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {

        for (let j = 0; j < 100000; j++)
            for (let k = 0; k < 100000; k++) {
                if (j === 99999 && k === 99999) callback(null, rand);
            }
    });


}

const afterRead = function (err, res) {
    if (err) console.log(err)
    else console.log(res)
}

readFromDbById(7, afterRead)
console.log("heyy")*/

/*const readFromDbById = function(data, callback) {
    console.log("Insertion ", data)
    const rand = Math.random() * 10;
    if(rand > 5) callback(null, rand);
    else callback({err: "unable to save save"})
}

const afterRead = function(err, res){
    if (err) console.log(err)
    else console.log(res)
}

readFromDbById(7, afterRead)*/