function checkGuess() {
    let guess = document.getElementById("guess").value;
    var correctNumber = Math.floor(Math.random() * 10) + 1; // Generates a random number between 1 and 10
    if (guess == correctNumber) {
        document.getElementById("result").innerHTML = "Congratulations! You guessed the correct number.";
    } else if (guess < correctNumber) {
        document.getElementById("result").innerHTML = "That's not the correct number. Try a higher number!";
    } else {
        document.getElementById("result").innerHTML = "That's not the correct number. Try a lower number!";
    }
}