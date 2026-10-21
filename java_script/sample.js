//comment
console.log("Hello World");
// variables: var: variable,let: block-scoped variable,const: constant
let name = "John"; //string variable
let age1 = 30; //number variable
let isStudent = true; //boolean variable
const PI = 3.14; //constant variable with precision

console.log("Name: " + name);
console.log("Age: " + age1);
console.log("Is Student: " + isStudent);
console.log("Value of PI: " + PI);

let num = 10;
let num2 = 5;
result = num + num2; // addition
console.log("Addition is: " + result);

let numb = prompt("Enter a number: "); // kinda not working here (sir said let it be)
console.log("You entered: " + numb);

//if else construct
let age = 18;
if (age >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are a minor.");
}

for (let i = 0; i < 5; i++) {
    console.log("Iteration: " + i);
}

while (age < 21) {
    console.log("You are not yet 21.");
    age++;
}

//print even numbers from 0 to 10
for (let i = 0; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log("Even number: " + i);
    }
}

// print odd numbers from 0 to 10
for (let i = 0; i <= 10; i++) {
    if (i % 2 !== 0) {
        console.log("Odd number: " + i);
    }
}   

//sample function
function greet(name) {
    return "Hello, welcome to the greet function";
}

//function with parameters
function greetUser(name) {
    return "Hello, " + name + "! Welcome to the greetUser function.";
    //or you can use
    // console.log(`Hello, ${name}! Welcome to the greetUser function.`); <- Sir taught this one 
}

console.log(greetUser("Alice"));

// return type function
function addNumbers(a, b) {
    return a + b;
}

let result = addNumbers(5, 10); 
console.log("Result is: " + result);
