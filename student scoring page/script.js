document.getElementById("resultForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        let internal1 = Number(document.getElementById("internal1").value);
        let external1 = Number(document.getElementById("external1").value);
        let total1 = internal1 + (external1)/2;
        let internal2 = Number(document.getElementById("internal2").value);
        let external2 = Number(document.getElementById("external2").value);
        let total2 = internal2 + (external2)/2;
        let internal3 = Number(document.getElementById("internal3").value);
        let external3 = Number(document.getElementById("external3").value);
        let total3 =  internal3 + (external3)/2;
        let internal4 = Number(document.getElementById("internal4").value);
        let external4 = Number(document.getElementById("external4").value);
        let total4 = internal4 + (external4)/2;
        let totalMarks = total1 + total2 + total3 + total4;
        console.log("Total Marks: " + totalMarks);
        let percentage =
            (totalMarks / 400) * 100;
        console.log(
            "Percentage: " + percentage
        );
        let grade;
        if (percentage >= 90) {
            grade = "A+";
        }
        else if (percentage >= 80) {
            grade = "A";
        }
        else if (percentage >= 70) {
            grade = "B+";
        }
        else if (percentage >= 60) {
            grade = "B";
        }
        else if (percentage >= 50) {
            grade = "C";
        }
        else {
            grade = "F";
        }
        let status;
        if (percentage >= 50) {
            status = "PASS";
        }
        else {
            status = "FAIL";
        }
        document.getElementById("totalMarks").innerHTML = totalMarks;
        document.getElementById("percentage").innerHTML = percentage.toFixed(2);
        document.getElementById("grade").innerHTML = grade;
        document.getElementById("status").innerHTML = status;
        document.getElementById("resultSection").style.display = "block";
    }
);