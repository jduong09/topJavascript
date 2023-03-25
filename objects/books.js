/*
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${this.read ? 'completed' : 'not read yet'}`;
  }
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

console.log(theHobbit);
console.log(theHobbit.info());

// javascript.info/prototype-inheritance
// Working with prototype
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

console.log( rabbit.jumps ); // ? (1)
// true, jumps exists on rabbit key.
delete rabbit.jumps;
console.log( rabbit.jumps ); // ? (2)
// null, jumps does not exist on rabbit key, it goes to animal prototype and finds key.
delete animal.jumps;
console.log( rabbit.jumps ); // ? (3)
// undefined, it will delete from animal, and therefore be undefined.

// Searching algorithm

// Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets → bed → table → head. For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).
// Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.

let head = {
  glasses: 1
};

let table = {
  __proto__: head,
  pen: 3
};

let bed = {
  __proto__: table,
  sheet: 1,
  pillow: 2
};

let pockets = {
  __proto__: bed,
  money: 2000
};

console.log( pockets.pen === 3 );
console.log( bed.glasses === 1 );
// should be faster to get glasses as head.glasses

// correct answer
In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

For instance, for pockets.glasses they remember where they found glasses (in head), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.


let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
  stomach: []
};

let lazy = {
  __proto__: hamster,
  stomach: []
};

// This one found the food
speedy.eat("apple");
console.log( speedy.stomach ); // apple

// This one also has it, why? fix please.
console.log( lazy.stomach ); // apple

// Fixed by giving each one their own stomach.

// Explanation of THIS in javascript.
// Function Invocation: Expression evaluates to a function object, followed by a pair of parenthesis with an argument.
// 'this' is the global object in a function invocation.
// The global object is determined by the execution environment.
// In a browser, the global object is window object.
// 'this' is undefined in a function invocation in strict mode.
const numbers = {
  numberA: 5,
  numberB: 10,
  sum: function() {
    console.log(this === numbers); // => true
    function calculate() {
      // this is window or undefined in strict mode
      console.log(this === numbers); // => false
      return this.numberA + this.numberB;
    }
    // use .call() method to modify the context
    return calculate.call(this);
  }
};
// numbers.sum(); // => NaN or throws TypeError in strict mode
// console.log(numbers.sum());
*/
// Method Invocation: 
// Method invocation is performed when an expression in a form of property accessor that evaluates to a function object is followed by an open parenthesis.
// 'this' is the object that owns the method in a method invocation.
/*
const calc = {
  num: 0,
  increment() {
    console.log(this === calc); // => true
    this.num += 1;
    return this.num;
  }
};

calc.increment();
calc.increment();
console.log(calc);
*/
/*
const myDog = Object.create({
  sayName() {
    console.log(this === myDog); // => true
    return this.name;
  }
});

myDog.name = 'Milo';
// method invocation. this is myDog
myDog.sayName(); // => 'Milo'

*/
/*
class Planet {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this === earth); // => false
    return this.name;
  }
}

const earth = new Planet('Earth');

// Pitfall: Separate the method from the object into a separate variable
// Solve: A bound function fixes the context by binding 'this' to the object that owns the method.
const method = earth.getName.bind(earth);
method(); // => This is function invocation, therefore this is the global object or undefined in strict mode.
*/
/*
function Pet(type, legs) {
  this.type = type;
  this.legs = legs;

  // An alternative solution is to define logInfo as an arrow function, which binds 'this' lexically
  this.logInfo = () => {
    console.log(this === myCat);
    console.log(`The ${this.type} has ${this.legs} legs`)
  }
}

// When passed as a parameter in the setTimeout arguments, the method is separated from the object
// 'this' is global object or undefined in strict mode.
const myCat = new Pet('Cat', 4);
setTimeout(myCat.logInfo, 1000);

// solve by binding function.
const boundLogInfo = myCat.logInfo.bind(myCat);
setTimeout(boundLogInfo, 1000);
*/

// Constructor invocation
// Performed when new keyword is followed by an expression that to a function object, an open parenthesis (, a comma separated list of arguments expressions and a close parenthesis ).
// Examples: new Pet('cat', 4), new RegExp('\\d');
/*
function Country(name, traveled) {
  this.name = name ? name : "United Kingdom";
  this.traveled = Boolean(traveled);
}

Country.prototype.travel = function() {
  this.traveled = true;
  return `Travel to ${this.name}`;
}
// Constructor invocation
const FRANCE = new Country('France', false);

// Constructor invocation
console.log(FRANCE.travel());
*/
/*
class City {
  constructor(name, traveled) {
    this.name = name;
    this.traveled = traveled;
  }

  travel() {
    this.traveled = true;
  }
}

const paris = new City('Paris', false);
*/
// 'this' is the newly created object in a constructor invocation
/*
function Foo () {
  // this is fooInstance
  this.property = 'Default Value';
}

// Constructor invocation
const fooInstance = new Foo();
console.log(fooInstance.property); // => 'Default value'
// new Foo() is making a constructor call where the context is fooInstance.
// Inside Foo the object is initialized: this.property is assigned with a default value.

function Vehicle(type, wheelsCount) {
  this.type = type;
  this.wheelsCount = wheelsCount;
  return this;
}

// Function Invocation
const car = Vehicle('Car', 4);
console.log(car.type);
console.log(car.wheelsCount);
console.log(car instanceof Vehicle);
*/
// Indirect invocation
// Indirect invocation is performed when a function is called using myFun.call() or myFun.apply() methods.
// .call and .apply are used to invoke the function with a configurable context.

// myFunction.call(thisArg, arg1, arg2, ...) accepts the first argument 'thisArg' as the context of the invocation
// and a list of arguments that are passed as arguments to the called function.
/*
// Example
function sum(number1, number2) {
  return number1 + number2;
}

console.log(sum(10, 2));
console.log(sum.call(undefined, 10, 2));
console.log(sum.apply(undefined, [10, 2]));
// 'this' is the first argument of .call() or .apply() in an indirect invocation

const rabbit = {
  name: 'White Rabbit'
};

function concatName(string) {
  console.log(this === rabbit); // true
  return string + this.name;
}

// Indirect invocations
console.log(concatName.call(rabbit, 'Hello ')); // => 'Hello White Rabbit'
console.log(concatName.apply(rabbit, ['Bye '])); // => Bye White Rabbit
// indirect invocation is useful when a function should be executed with a specific context.

// Another practical example is creating hierarchies of classes in ES5 to call the parent constructor:

function Runner(name) {
  console.log(this instanceof Rabbit); // => true
  this.name = name;
}

function Rabbit(name, countLegs) {
  console.log(this instanceof Rabbit); // => true
  // Indirect invocation. Call parent constructor.
  Runner.call(this, name);
  this.countLegs = countLegs;
}

const myRabbit = new Rabbit('White Rabbit', 4);
console.log(myRabbit);
*/
/*
// Bound function
// A bound function is a function whose context and/or arguments are bound to specific values.
// You create a bound function using .bind() method.
function multiply(number) {
  return this * number;
}

// create a bound function with context
const double = multiply.bind(2);
// invoke the bound function
console.log(double(3)) // => 6
console.log(double(10)) // => 20
// The role of .bind() is to create a new function, which invocation will have the context as the first argument passed to .bind()
// It is a powerful technique that allows creating functions with a predefined this value.

const numbers = {
  array: [3, 5, 10],

  getNumbers() {
    return this.array;
  }
};

// Create a bound function
const boundGetNumbers = numbers.getNumbers.bind(numbers);
console.log(boundGetNumbers()); // => [3, 5, 10];
// numbers.getNumbers.bind(numbers) returns a function boundGetNumbers which context is bound to numbers.
// Then boundGetNumbers() is invoked with 'this' as 'numbers' and returns the correct array object.
// Extract method from object
const simpleGetNumbers = numbers.getNumbers;
console.log(simpleGetNumbers());
*/
// Tight context binding
// .bind() makes a permanent context link and will always keep it.
// A bound function cannot change its linked context when using .call() or .apply() with a different context or even a rebound doesn't have any effect.

function getThis() {
  return this;
}

const one = getThis.bind(1);

console.log(one());
// this === 1

console.log(one.call(2));
// this === 1, .call does not change the context of this.

// only new one() changes the context of the bound function. Other Types of invocation always have this equal to 1.

// Arrow function
// Arrow function is designed to declare the function is a shorter form and lexically bind the context.

const hello = (name) => {
  return 'Hello ' + name;
};

console.log(hello('World')); // => 'Hello World'
// 'this' is the enclosing context where the arrow function is defined.
// The Arrow function doesn't create its own execution context but takes 'this' from the outer function where it is defined.

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  log() {
    console.log(this === myPoint); // => true
    setTimeout(() => {
      console.log(this === myPoint); // => true
      console.log(this.x + ':' + this.y) // => '95:165';
    }, 1000);
  }
}
const myPoint = new Point(95, 165);
myPoint.log();

// Pitfall: defining method with an arrow function
// You might want to use arrow functions to declare methods on an object. 

function Period (hours, minutes) {
  this.hours = hours;
  this.minutes = minutes;
}

Period.prototype.format = () => {
  console.log(this === undefined); // => true
  return this.hours + ' hours and ' + this.minutes + ' minutes ';
};

// Since format is an arrow function and is defined in the global context (topmost scope), it has this as window object.

const walkPeriod = new Period(2, 30);
const boundFunction = walkPeriod.format.bind(walkPeriod);
console.log(boundFunction()) // => 'undefined hours and undefined minutes;
