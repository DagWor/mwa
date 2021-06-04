var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Student = /** @class */ (function () {
    function Student(name, gpa) {
        this.name = name;
        this.gpa = gpa;
    }
    Student.prototype.greeting = function () {
        console.log("Hello ", this.name, " with GPA ", this.gpa);
    };
    Object.defineProperty(Student.prototype, "Gpa", {
        get: function () {
            return this.gpa;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        getScore(0.5)
    ], Student.prototype, "Gpa", null);
    return Student;
}());
function getScore(extra) {
    return function (target, key, descriptor) {
        var original = descriptor.get;
        descriptor.get = function () {
            var res = original.apply(this);
            return (res + extra);
        };
    };
}
var DE_Student = /** @class */ (function (_super) {
    __extends(DE_Student, _super);
    function DE_Student() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DE_Student;
}(Student));
var jack = new Student('Jack', 3.0);
jack.greeting();
console.log("gpa : ", jack.gpa);
var john = new DE_Student('John', 3.5);
john.greeting();
