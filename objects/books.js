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