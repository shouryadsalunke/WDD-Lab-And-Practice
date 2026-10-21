function calculateSquare(num) {
    return num * num;
}

let squareResult = calculateSquare(4);
console.log("Square is: " + squareResult);

function isEven(num) {
    return num % 2 === 0;
}

let evenCheck = isEven(6);
console.log("Is 6 even? " + evenCheck);

let oddCheck = isEven(7);
console.log("Is 7 even? " + oddCheck);

function calculateAreaOfCircle(radius) {
    return Math.PI * radius * radius;
}

let area = calculateAreaOfCircle(5);
console.log("Area of circle is: " + area.toFixed(2));

function calculateAreaOfRectangle(length, width) {
    return length * width;
}

let rectangleArea = calculateAreaOfRectangle(4, 6);
console.log("Area of rectangle is: " + rectangleArea);

function calculateGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

let grade = calculateGrade(85);
console.log("Grade is: " + grade); 

function calculateFactorial(num) {
    if (num === 0 || num === 1) {
        return 1;
    } else {
        let factorial = 1;
        for (let i = 2; i <= num; i++) {
            factorial *= i;
        }
        return factorial;
    }
}

let factorialResult = calculateFactorial(5);
console.log("Factorial is: " + factorialResult);