function promiseFactory(){
    return new Promise(resolve => setTimeout(() => resolve("done"), 3000))
}

function promiseFactory2(){
    return new Promise(resolve => setTimeout(() => resolve("done"), 1000))
}

async function asyncFun(){
    console.log("start");
    const res = await promiseFactory();
    console.log(`1 `, res);
    const res1 = await promiseFactory2()
    console.log(`2 `, res1);
    console.log("end");
}

asyncFun()
