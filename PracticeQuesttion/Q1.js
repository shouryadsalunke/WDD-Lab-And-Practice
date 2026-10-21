function checkAge() {
    let age = document.getElementById("age").value;

    if (age < 18) {
        window.alert('Error occurred! \nYou are a minor.');
        // document.getElementById("result").innerHTML = "Minor";
    }
    else {
        document.getElementById("result").innerHTML = "Adult";
    }
}