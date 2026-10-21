const subjects = 6;

for (let i = 1; i <= subjects; i++) {

    const firstMark = document.getElementById("marks" + i + "a");
    const secondMark = document.getElementById("marks" + i + "b");
    const totalBox = document.getElementById("total" + i);

    function calculateSubject() {

        let mark1 = Number(firstMark.value) || 0;
        let mark2 = Number(secondMark.value) || 0;

        if (mark1 > 100) {
            mark1 = 100;
            firstMark.value = 100;
        }

        if (mark2 > 100) {
            mark2 = 100;
            secondMark.value = 100;
        }

        const total = mark1 + mark2;

        totalBox.value = total;
    }

    firstMark.addEventListener("input", calculateSubject);
    secondMark.addEventListener("input", calculateSubject);
}



document.getElementById("resultForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        let grandTotal = 0;

        for (let i = 1; i <= subjects; i++) {

            const firstMark =
                Number(document.getElementById(
                    "marks" + i + "a"
                ).value) || 0;

            const secondMark =
                Number(document.getElementById(
                    "marks" + i + "b"
                ).value) || 0;

            const total = firstMark + secondMark;

            document.getElementById(
                "total" + i
            ).value = total;

            grandTotal += total;
        }


        const maximumMarks = subjects * 200;

        const percentage =
            (grandTotal / maximumMarks) * 100;


        let grade;
        let status;


        if (percentage >= 90) {

            grade = "A+";

        } else if (percentage >= 80) {

            grade = "A";

        } else if (percentage >= 70) {

            grade = "B+";

        } else if (percentage >= 60) {

            grade = "B";

        } else if (percentage >= 50) {

            grade = "C";

        } else {

            grade = "F";
        }


        if (percentage >= 50) {

            status = "PASS";

        } else {

            status = "FAIL";
        }


        const studentName =
            document.getElementById("studentName").value;

        const rollNumber =
            document.getElementById("rollNumber").value;


        document.getElementById(
            "displayName"
        ).textContent = studentName;

        document.getElementById(
            "displayRoll"
        ).textContent = rollNumber;

        document.getElementById(
            "grandTotal"
        ).textContent = grandTotal;

        document.getElementById(
            "percentage"
        ).textContent =
            percentage.toFixed(2) + "%";

        document.getElementById(
            "grade"
        ).textContent = grade;

        document.getElementById(
            "gradeText"
        ).textContent = grade;

        document.getElementById(
            "status"
        ).textContent = status;


        document.getElementById(
            "resultDisplay"
        ).classList.add("show");


        document.getElementById(
            "resultDisplay"
        ).scrollIntoView({
            behavior: "smooth"
        });

    }
);



document.getElementById("resultForm").addEventListener(
    "reset",
    function() {

        setTimeout(function() {

            for (let i = 1; i <= subjects; i++) {

                document.getElementById(
                    "total" + i
                ).value = 0;

            }

            document.getElementById(
                "resultDisplay"
            ).classList.remove("show");

        }, 10);

    }
);