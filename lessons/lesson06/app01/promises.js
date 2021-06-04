const promise1 = new Promise((resolve, reject) => {
    let num = Math.random() + 0.5;
    setTimeout(() => {
        if(num > 0.5) resolve(num)
        else reject(num)
    }, 3000)
});

const promise2 = new Promise((resolve, reject) => {
    let num = Math.random() + 0.5;
    setTimeout(() => {
        if(num > 0.5) resolve(num)
        else reject(num)
    }, 1000)
});

const promise3 = new Promise((resolve, reject) => {
    let num = Math.random() + 0.5;
    setTimeout(() => {
        if(num > 0.5) resolve(num)
        else reject(num)
    }, 5000)
});

const success = (val) => {
    console.log("value ", val)
}

const err = (val) => {
    console.log("error value ", val)
}

async function work(){
    console.log("start");
    await promise1.then(success).catch(err)
    await promise2.then(success).catch(err)
    console.log("end");
}

// Promise.race([promise1, promise2, promise3]).then(success).catch(err)
work()

Number.x = 3;

console.log(x)