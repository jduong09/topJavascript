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
/*
In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype. They remember where the property was found and reuse it in the next request.

For instance, for pockets.glasses they remember where they found glasses (in head), and next time will search right there. They are also smart enough to update internal caches if something changes, so that optimization is safe.
*/


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