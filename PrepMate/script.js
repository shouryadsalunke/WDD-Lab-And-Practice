
let questions = JSON.parse(localStorage.getItem("questions")) || [];
let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
let editingId = null;
let quizQuestions = [];
let timeLeft = 0;
let timerId = null;
let quizFinished = false;

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function saveData() {
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(function (section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    if (sectionId === "dashboard") {
        updateDashboard();
    }

    if (sectionId === "bank") {
        showQuestions();
    }

    if (sectionId === "add") {
        document.getElementById("question").focus();
    }
}

function updateDashboard() {
    document.getElementById("totalQuestions").textContent = questions.length;
    document.getElementById("totalQuizzes").textContent = quizHistory.length;

    let latest = quizHistory[quizHistory.length - 1];

    document.getElementById("latestScore").textContent = latest
        ? latest.score + "/" + latest.total
        : "Not attempted";

    let recent = questions.slice(-3).reverse();
    let container = document.getElementById("recentQuestions");

    container.innerHTML = "";

    if (recent.length === 0) {
        container.textContent = "No questions yet. Add your first question!";
    }

    recent.forEach(function (q) {
        let card = document.createElement("div");
        card.className = "questionCard";

        let title = document.createElement("p");
        title.textContent = q.question;

        let meta = document.createElement("p");
        meta.className = "questionMeta";
        meta.textContent = q.subject + " | " + q.topic + " | " + q.difficulty;

        card.append(title, meta);
        container.appendChild(card);
    });
}

function resetForm() {
    document.getElementById("questionForm").reset();
    editingId = null;

    document.getElementById("formHeading").textContent = "Add a Question";
    document.getElementById("saveButton").textContent = "Save Question";
}

document.getElementById("questionForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let question = document.getElementById("question").value.trim();
    let options = {
        A: document.getElementById("optionA").value.trim(),
        B: document.getElementById("optionB").value.trim(),
        C: document.getElementById("optionC").value.trim(),
        D: document.getElementById("optionD").value.trim()
    };

    if (new Set(Object.values(options).map(function (x) {
        return x.toLowerCase();
    })).size !== 4) {
        alert("Please enter four different answer options.");
        return;
    }

    let newQuestion = {
        id: editingId || (Date.now().toString() + Math.random().toString(36).slice(2)),
        question: question,
        options: options,
        correctAnswer: document.getElementById("correctAnswer").value,
        explanation: document.getElementById("explanation").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        topic: document.getElementById("topic").value.trim(),
        difficulty: document.getElementById("difficulty").value
    };

    if (editingId) {
        let index = questions.findIndex(function (q) {
            return q.id === editingId;
        });

        if (index !== -1) {
            questions[index] = newQuestion;
        }
    } else {
        questions.push(newQuestion);
    }

    saveData();
    resetForm();
    updateFilters();
    updateDashboard();
    showQuestions();
    showSection("bank");
});

function updateFilters() {
    let subjects = [...new Set(questions.map(function (q) {
        return q.subject;
    }))].sort();

    ["filterSubject", "quizSubject"].forEach(function (id) {
        let select = document.getElementById(id);
        let oldValue = select.value;

        select.innerHTML = "";

        let allOption = document.createElement("option");
        allOption.value = "All";
        allOption.textContent = "All Subjects";
        select.appendChild(allOption);

        subjects.forEach(function (subject) {
            let option = document.createElement("option");
            option.value = subject;
            option.textContent = subject;
            select.appendChild(option);
        });

        if ([...select.options].some(function (option) {
            return option.value === oldValue;
        })) {
            select.value = oldValue;
        }
    });
}

function showQuestions() {
    let list = document.getElementById("questionList");
    let search = document.getElementById("searchQuestion").value.toLowerCase();
    let subject = document.getElementById("filterSubject").value;
    let difficulty = document.getElementById("filterDifficulty").value;

    list.innerHTML = "";

    let filtered = questions.filter(function (q) {
        return (q.question + " " + q.topic + " " + q.subject)
            .toLowerCase().includes(search)
            && (subject === "All" || q.subject === subject)
            && (difficulty === "All" || q.difficulty === difficulty);
    });

    if (filtered.length === 0) {
        list.textContent = "No matching questions found.";
        return;
    }

    filtered.forEach(function (q) {
        let card = document.createElement("div");
        card.className = "questionCard";

        let optionsHTML = Object.entries(q.options).map(function (entry) {
            return "<p>" + escapeHTML(entry[0]) + ". " +
                escapeHTML(entry[1]) + "</p>";
        }).join("");

        card.innerHTML = `
            <h3>${escapeHTML(q.question)}</h3>
            ${optionsHTML}
            <p class="questionMeta">
                ${escapeHTML(q.subject)} |
                ${escapeHTML(q.topic)} |
                ${escapeHTML(q.difficulty)}
            </p>
            <p><strong>Answer:</strong> ${escapeHTML(q.correctAnswer)}</p>
            <p>${escapeHTML(q.explanation)}</p>
            <button onclick="editQuestion('${q.id}')">Edit</button>
            <button onclick="deleteQuestion('${q.id}')">Delete</button>
        `;

        list.appendChild(card);
    });
}

function editQuestion(id) {
    let q = questions.find(function (item) {
        return item.id === id;
    });

    if (!q) return;

    editingId = id;

    document.getElementById("question").value = q.question;
    document.getElementById("optionA").value = q.options.A;
    document.getElementById("optionB").value = q.options.B;
    document.getElementById("optionC").value = q.options.C;
    document.getElementById("optionD").value = q.options.D;
    document.getElementById("correctAnswer").value = q.correctAnswer;
    document.getElementById("explanation").value = q.explanation;
    document.getElementById("subject").value = q.subject;
    document.getElementById("topic").value = q.topic;
    document.getElementById("difficulty").value = q.difficulty;

    document.getElementById("formHeading").textContent = "Edit Question";
    document.getElementById("saveButton").textContent = "Update Question";

    showSection("add");
}

function deleteQuestion(id) {
    if (!confirm("Are you sure you want to delete this question?")) {
        return;
    }

    questions = questions.filter(function (q) {
        return q.id !== id;
    });

    saveData();
    updateFilters();
    showQuestions();
    updateDashboard();
}

function parseCSV(text) {
    let rows = [];
    let row = [];
    let field = "";
    let quoted = false;

    text = text.replace(/^\uFEFF/, "");

    for (let i = 0; i < text.length; i++) {
        let char = text[i];

        if (char === '"' && quoted && text[i + 1] === '"') {
            field += '"';
            i++;
        } else if (char === '"') {
            quoted = !quoted;
        } else if (char === "," && !quoted) {
            row.push(field.trim());
            field = "";
        } else if ((char === "\n" || char === "\r") && !quoted) {
            if (char === "\r" && text[i + 1] === "\n") i++;

            row.push(field.trim());

            if (row.some(function (cell) {
                return cell !== "";
            })) {
                rows.push(row);
            }

            row = [];
            field = "";
        } else {
            field += char;
        }
    }

    if (quoted) {
        throw new Error("The CSV file has an unclosed quotation mark.");
    }

    row.push(field.trim());

    if (row.some(function (cell) {
        return cell !== "";
    })) {
        rows.push(row);
    }

    return rows;
}

function uploadCSV() {
    let fileInput = document.getElementById("csvFile");
    let message = document.getElementById("uploadMessage");
    let file = fileInput.files[0];

    if (!file) {
        message.textContent = "Please select a CSV file first.";
        return;
    }

    if (!file.name.toLowerCase().endsWith(".csv")) {
        message.textContent = "Please choose a .csv file.";
        return;
    }

    let reader = new FileReader();

    reader.onload = function (event) {
        try {
            let rows = parseCSV(event.target.result);

            if (rows.length < 2) {
                throw new Error("The file has no question rows.");
            }

            let headers = rows[0].map(function (header) {
                return header.trim().toLowerCase();
            });

            let required = [
                "question", "optiona", "optionb", "optionc",
                "optiond", "correctanswer", "explanation",
                "subject", "topic", "difficulty"
            ];

            if (!required.every(function (header) {
                return headers.includes(header);
            })) {
                throw new Error("The CSV headers do not match the sample file.");
            }

            let imported = [];
            let errors = [];

            rows.slice(1).forEach(function (row, index) {
                let data = {};

                headers.forEach(function (header, i) {
                    data[header] = (row[i] || "").trim();
                });

                let options = {
                    A: data.optiona,
                    B: data.optionb,
                    C: data.optionc,
                    D: data.optiond
                };

                let answer = data.correctanswer.toUpperCase();

                if (
                    !data.question ||
                    Object.values(options).some(function (value) {
                        return !value;
                    }) ||
                    new Set(Object.values(options).map(function (x) {
                        return x.toLowerCase();
                    })).size !== 4 ||
                    !["A", "B", "C", "D"].includes(answer) ||
                    !data.explanation ||
                    !data.subject ||
                    !data.topic ||
                    !["Easy", "Medium", "Hard"].includes(data.difficulty)
                ) {
                    errors.push(index + 2);
                    return;
                }

                imported.push({
                    id: Date.now().toString() + Math.random().toString(36).slice(2),
                    question: data.question,
                    options: options,
                    correctAnswer: answer,
                    explanation: data.explanation,
                    subject: data.subject,
                    topic: data.topic,
                    difficulty: data.difficulty
                });
            });

            if (imported.length === 0) {
                throw new Error("No valid questions found. Check the CSV rows.");
            }

            questions.push(...imported);
            saveData();
            updateFilters();
            showQuestions();
            updateDashboard();

            fileInput.value = "";

            message.textContent = imported.length +
                " question(s) imported." +
                (errors.length ? " Skipped invalid row(s): " + errors.join(", ") : "");
        } catch (error) {
            message.textContent = error.message;
        }
    };

    reader.onerror = function () {
        message.textContent = "Could not read the selected file.";
    };

    reader.readAsText(file);
}

function startQuiz() {
    let subject = document.getElementById("quizSubject").value;
    let topic = document.getElementById("quizTopic").value.trim().toLowerCase();
    let difficulty = document.getElementById("quizDifficulty").value;
    let count = Number(document.getElementById("quizCount").value);
    let minutes = Number(document.getElementById("quizTime").value);
    let message = document.getElementById("quizMessage");

    if (!Number.isInteger(count) || count < 1 ||
        !Number.isInteger(minutes) || minutes < 1) {
        message.textContent = "Enter a whole number of questions and minutes.";
        return;
    }

    let available = questions.filter(function (q) {
        return (subject === "All" || q.subject === subject)
            && (!topic || q.topic.toLowerCase().includes(topic))
            && (difficulty === "All" || q.difficulty === difficulty);
    });

    if (available.length === 0) {
        message.textContent = "No questions match these settings.";
        return;
    }

    quizQuestions = available.sort(function () {
        return Math.random() - 0.5;
    }).slice(0, count).map(function (q) {
        return { ...q };
    });

    quizFinished = false;
    clearInterval(timerId);

    timeLeft = minutes * 60;
    message.textContent = "";

    let container = document.getElementById("quizQuestions");
    container.innerHTML = "";

    quizQuestions.forEach(function (q, index) {
        let card = document.createElement("div");
        card.className = "quizQuestion";

        let optionsHTML = Object.entries(q.options).map(function (entry) {
            return `
                <label class="quizOption">
                    <input type="radio" name="answer${index}"
                           value="${entry[0]}">
                    <span>${escapeHTML(entry[0])}. ${escapeHTML(entry[1])}</span>
                </label>
            `;
        }).join("");

        card.innerHTML = `
            <h3>${index + 1}. ${escapeHTML(q.question)}</h3>
            ${optionsHTML}
        `;

        container.appendChild(card);
    });

    document.getElementById("quizProgress").textContent =
        quizQuestions.length + " question(s) in this quiz";

    showSection("quiz");
    updateTimer();

    timerId = setInterval(function () {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            submitQuiz(true);
        }
    }, 1000);
}

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
        "Time: " + String(minutes).padStart(2, "0") +
        ":" + String(seconds).padStart(2, "0");
}

function submitQuiz(timeUp = false) {
    if (quizFinished || quizQuestions.length === 0) return;

    quizFinished = true;
    clearInterval(timerId);

    let score = 0;
    let review = document.getElementById("answerReview");
    review.innerHTML = "";

    quizQuestions.forEach(function (q, index) {
        let selected = document.querySelector(
            'input[name="answer' + index + '"]:checked'
        );

        let userAnswer = selected ? selected.value : "";
        let correct = userAnswer === q.correctAnswer;

        if (correct) score++;

        let card = document.createElement("div");
        card.className = "reviewCard " +
            (correct ? "reviewCorrect" : "reviewWrong");

        let answerText = userAnswer
            ? userAnswer + ". " + q.options[userAnswer]
            : "Not answered";

        card.innerHTML = `
            <h3>${index + 1}. ${escapeHTML(q.question)}</h3>
            <p><strong>Your answer:</strong> ${escapeHTML(answerText)}</p>
            <p><strong>Correct answer:</strong>
                ${escapeHTML(q.correctAnswer)}.
                ${escapeHTML(q.options[q.correctAnswer])}
            </p>
            <p><strong>Explanation:</strong> ${escapeHTML(q.explanation)}</p>
            <p>${correct ? "Correct" : "Incorrect"}</p>
        `;

        review.appendChild(card);
    });

    let total = quizQuestions.length;
    let percentage = Math.round(score / total * 100);

    document.getElementById("score").textContent =
        "Your Score: " + score + "/" + total + " (" + percentage + "%)";

    document.getElementById("scoreMessage").textContent = timeUp
        ? "Time is up! Your quiz has been submitted."
        : "Quiz submitted successfully!";

    quizHistory.push({
        score: score,
        total: total,
        date: new Date().toLocaleString()
    });

    saveData();
    showSection("results");
}

updateFilters();
updateDashboard();
showQuestions();
