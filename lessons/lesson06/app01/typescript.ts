class Student {
    name: string;
    gpa: number;

    constructor(name: string, gpa: number){
        this.name = name;
        this.gpa = gpa;
    } 

    greeting(){
        console.log("Hello ", this.name, " with GPA ", this.gpa);
    }
    @getScore(0.5)
    get Gpa() {
        return this.gpa;
    }
}

function getScore(extra: number){
    return function(target: Object, key: string, descriptor: PropertyDescriptor){
        const original = descriptor.get;
        descriptor.get = function(){
            const res = original.apply(this)
            return (res + extra)
        }
    }
}

class DE_Student extends Student {

}

var jack = new Student('Jack', 3.0);
jack.greeting()
console.log("gpa : ", jack.gpa)

const john = new DE_Student('John', 3.5);
john.greeting();