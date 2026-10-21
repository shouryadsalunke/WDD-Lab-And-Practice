
// Exercise on functions
//1. calculate square using function
function calculateSquare(number) {
    return number * number;
}
newNumber = 4;
console.log("The square of " + newNumber + " is: " + calculateSquare(newNumber));

//2. even and odd numnbers using functions
function checkEvenOrOdd(number) {
    if (number % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}
numberToCheck = 7;
console.log("The number " + numberToCheck + " is: " + checkEvenOrOdd(numberToCheck));

//3. calculate area of circle using functions
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

let radius = 5;
console.log("The area of the circle with radius " + radius + " is: " + calculateArea(radius));

//4. calculate are of rectangle using functions
function CalculateArea(length, width) {
    return length * width;
}

let length = 10;
let width = 5;
console.log("The area of the rectangle with length " + length + " and width " + width + " is: " + CalculateArea(length, width));

//5. calculate grade (A,B,C,D,F) using functions
function calculateGrade(score) {
    if (score >= 90)
        return "A";
    else if (score >= 80)
        return "B";
    else if (score >= 70)
        return "C"; 
    else if (score >= 60)
        return "D";
    else
        return "F";
}
let score = 64;
console.log("The grade for score " + score + " is: " + calculateGrade(score));

//6. calculate factorial using functions
function calculateFactorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * calculateFactorial(n - 1);
    }   
}
let number = 5;
console.log("The factorial of " + number + " is: " + calculateFactorial(number));