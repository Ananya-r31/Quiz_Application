const questions = [
    {
        id: 1,
        question: "Which HTML element is used to display the largest heading?",
        options: ["<h1>", "<h6>", "<head>", "<header>"],
        answer: "<h1>",
        difficulty: "Easy"
    },
    {
        id: 2,
        question: "Which CSS property is used to change the text color?",
        options: ["font-color", "text-color", "color", "background"],
        answer: "color",
        difficulty: "Easy"
    },
    {
        id: 3,
        question: "Which HTML tag is used to insert an image?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        answer: "<img>",
        difficulty: "Easy"
    },
    {
        id: 4,
        question: "Which JavaScript keyword is used to declare a variable that can be reassigned?",
        options: ["const", "let", "fixed", "static"],
        answer: "let",
        difficulty: "Easy"
    },
    {
        id: 5,
        question: "Which HTML tag is used to create an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        answer: "<ul>",
        difficulty: "Easy"
    },
    {
        id: 6,
        question: "Which CSS property is used to make text bold?",
        options: ["font-weight", "font-bold", "text-style", "font-boldness"],
        answer: "font-weight",
        difficulty: "Easy"
    },
    {
        id: 7,
        question: "Which JavaScript function converts a string into an integer?",
        options: ["parseInt()", "parseString()", "toInteger()", "NumberString()"],
        answer: "parseInt()",
        difficulty: "Easy"
    },
    {
        id: 8,
        question: "Which JavaScript method removes the first element from an array?",
        options: ["pop()", "shift()", "remove()", "delete()"],
        answer: "shift()",
        difficulty: "Medium"
    },
    {
        id: 9,
        question: "Which CSS property controls the space inside an element?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        answer: "padding",
        difficulty: "Medium"
    },
    {
        id: 10,
        question: "Which JavaScript method returns the first element that satisfies a condition?",
        options: ["filter()", "find()", "search()", "select()"],
        answer: "find()",
        difficulty: "Medium"
    },
    {
        id: 11,
        question: "Which HTML attribute provides alternative text for an image?",
        options: ["title", "src", "alt", "description"],
        answer: "alt",
        difficulty: "Medium"
    },
    {
        id: 12,
        question: "Which CSS property is used to create rounded corners?",
        options: ["corner-radius", "border-radius", "radius", "round-border"],
        answer: "border-radius",
        difficulty: "Medium"
    },
    {
        id: 13,
        question: "What does the JavaScript method forEach() primarily do?",
        options: [
            "Creates a new array",
            "Loops through each array element",
            "Removes array elements",
            "Sorts an array"
        ],
        answer: "Loops through each array element",
        difficulty: "Medium"
    },
    {
        id: 14,
        question: "Which CSS unit is relative to the root element's font size?",
        options: ["em", "px", "rem", "%"],
        answer: "rem",
        difficulty: "Medium"
    },
    {
        id: 15,
        question: "What is the output of typeof null in JavaScript?",
        options: ["null", "object", "undefined", "string"],
        answer: "object",
        difficulty: "Hard"
    },
    {
        id: 16,
        question: "Which JavaScript method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.object()",
            "JSON.convert()"
        ],
        answer: "JSON.parse()",
        difficulty: "Hard"
    },
    {
        id: 17,
        question: "Which JavaScript concept allows a function to remember variables from its outer scope?",
        options: ["Hoisting", "Closure", "Inheritance", "Prototype"],
        answer: "Closure",
        difficulty: "Hard"
    },
    {
        id: 18,
        question: "Which CSS layout system is specifically designed for two-dimensional layouts?",
        options: ["Flexbox", "Grid", "Float", "Inline-block"],
        answer: "Grid",
        difficulty: "Hard"
    },
    {
        id: 19,
        question: "What is the purpose of the JavaScript Promise.all() method?",
        options: [
            "Runs one function repeatedly",
            "Waits for multiple promises to complete",
            "Creates a new promise every second",
            "Stops all asynchronous operations"
        ],
        answer: "Waits for multiple promises to complete",
        difficulty: "Hard"
    },
    {
        id: 20,
        question: "Which JavaScript mechanism moves variable and function declarations to the top of their scope during compilation?",
        options: ["Closure", "Hoisting", "Callback", "Iteration"],
        answer: "Hoisting",
        difficulty: "Hard"
    }
];


let selectedDifficulty = "";
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let timer;
let timeLeft = 30;
let quizAnswers = [];

const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");
const historyScreen = document.getElementById("history-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionCounter = document.getElementById("question-counter");
const liveScore = document.getElementById("live-score");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const finalPercentage = document.getElementById("final-percentage");
const finalCorrect = document.getElementById("final-correct");
const finalTotal = document.getElementById("final-total");
const gradeLetter = document.getElementById("grade-letter");
const reviewButton = document.getElementById("review-btn");
const reviewContainer = document.getElementById("review-container");
const historyContainer = document.getElementById("history-container");

function showScreen(screen) {
    homeScreen.classList.remove("active-screen");
    quizScreen.classList.remove("active-screen");
    resultsScreen.classList.remove("active-screen");
    historyScreen.classList.remove("active-screen");
    screen.classList.add("active-screen");
}

function startQuiz(difficulty) {
    selectedDifficulty = difficulty;

    quizQuestions = questions.filter(function(question) {
        return question.difficulty === difficulty;
    });

    currentQuestion = 0;
    score = 0;
    quizAnswers = [];
    selectedAnswer = "";

    showScreen(quizScreen);
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];

    questionCounter.textContent =
        "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;

    liveScore.textContent = "Score: " + score;

    const progress =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    progressBar.style.width = progress + "%";

    questionText.textContent = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach(function(option) {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", function() {
            selectAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });

    selectedAnswer = "";
    nextButton.disabled = true;

    startTimer();
}

function selectAnswer(button, answer) {
    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(function(btn) {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");

    selectedAnswer = answer;

    nextButton.disabled = false;
}

function startTimer() {
    clearInterval(timer);

    timeLeft = 30;

    timerDisplay.textContent = timeLeft;

    timer = setInterval(function() {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

function submitAnswer() {
    clearInterval(timer);

    const question = quizQuestions[currentQuestion];

    const isCorrect =
        selectedAnswer === question.answer;

    if (isCorrect) {
        score = score + 10;
    }

    quizAnswers.push({
        question: question.question,
        userAnswer: selectedAnswer || "No answer",
        correctAnswer: question.answer,
        isCorrect: isCorrect
    });

    const buttons =
        document.querySelectorAll(".option-btn");

    buttons.forEach(function(button) {
        button.disabled = true;

        if (button.textContent === question.answer) {
            button.classList.add("correct");
        }

        if (
            button.textContent === selectedAnswer &&
            selectedAnswer !== question.answer
        ) {
            button.classList.add("incorrect");
        }
    });

    nextButton.disabled = true;

    setTimeout(function() {
        currentQuestion++;

        if (currentQuestion < quizQuestions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    }, 700);
}

nextButton.addEventListener("click", function() {
    submitAnswer();
});

function finishQuiz() {
    clearInterval(timer);

    const total = quizQuestions.length;

    const correct =
        quizAnswers.filter(function(answer) {
            return answer.isCorrect;
        }).length;

    const percentage =
        Math.round((correct / total) * 100);

    let grade;

    if (percentage >= 90) {
        grade = "A";
    } else if (percentage >= 75) {
        grade = "B";
    } else if (percentage >= 60) {
        grade = "C";
    } else if (percentage >= 40) {
        grade = "D";
    } else {
        grade = "F";
    }

    finalScore.textContent = score;
    finalPercentage.textContent = percentage;
    finalCorrect.textContent = correct;
    finalTotal.textContent = total;
    gradeLetter.textContent = grade;

    saveResult({
        difficulty: selectedDifficulty,
        score: score,
        percentage: percentage,
        date: new Date().toLocaleString()
    });

    showScreen(resultsScreen);
}

function saveResult(result) {
    let history =
        JSON.parse(localStorage.getItem("quizHistory"));

    if (history === null) {
        history = [];
    }

    history.push(result);

    localStorage.setItem(
        "quizHistory",
        JSON.stringify(history)
    );

    updateStatistics();
}

function updateStatistics() {
    let history =
        JSON.parse(localStorage.getItem("quizHistory"));

    if (history === null || history.length === 0) {
        document.getElementById("stat-attempts").textContent = 0;
        document.getElementById("stat-best").textContent = 0;
        document.getElementById("stat-average").textContent = 0;
        return;
    }

    document.getElementById("stat-attempts").textContent =
        history.length;

    let bestScore = 0;

    history.forEach(function(result) {
        if (result.score > bestScore) {
            bestScore = result.score;
        }
    });

    document.getElementById("stat-best").textContent =
        bestScore;

    let totalScore = 0;

    history.forEach(function(result) {
        totalScore = totalScore + result.score;
    });

    const average =
        Math.round(totalScore / history.length);

    document.getElementById("stat-average").textContent =
        average;
}

reviewButton.addEventListener("click", function() {
    if (!reviewContainer.classList.contains("hidden")) {
        reviewContainer.classList.add("hidden");
        reviewButton.textContent = "Review Answers";
        return;
    }

    let reviewHTML = "";

    quizAnswers.forEach(function(answer, index) {
        let resultClass;

        if (answer.isCorrect) {
            resultClass = "correct";
        } else {
            resultClass = "incorrect";
        }

        reviewHTML += `
            <div class="review-item ${resultClass}">
                <p>
                    <strong>Question ${index + 1}:</strong>
                    ${answer.question}
                </p>
                <p>
                    <strong>Your Answer:</strong>
                    ${answer.userAnswer}
                </p>
                <p>
                    <strong>Correct Answer:</strong>
                    ${answer.correctAnswer}
                </p>
            </div>
        `;
    });

    reviewContainer.innerHTML = reviewHTML;

    reviewContainer.classList.remove("hidden");

    reviewButton.textContent = "Hide Review";
});

document
    .getElementById("view-history-btn")
    .addEventListener("click", function() {
        let history =
            JSON.parse(localStorage.getItem("quizHistory"));

        if (history === null || history.length === 0) {
            historyContainer.innerHTML =
                "<p>No quiz attempts found.</p>";
        } else {
            historyContainer.innerHTML = "";

            for (
                let i = history.length - 1;
                i >= 0;
                i--
            ) {
                const result = history[i];

                const historyItem =
                    document.createElement("div");

                historyItem.className =
                    "history-item";

                historyItem.innerHTML = `
                    <span>
                        ${result.difficulty} Quiz - ${result.date}
                    </span>
                    <span class="history-score">
                        ${result.score} points (${result.percentage}%)
                    </span>
                `;

                historyContainer.appendChild(historyItem);
            }
        }

        showScreen(historyScreen);
    });

document
    .getElementById("clear-history-btn")
    .addEventListener("click", function() {
        const confirmDelete =
            confirm(
                "Are you sure you want to clear quiz history?"
            );

        if (confirmDelete) {
            localStorage.removeItem("quizHistory");
            updateStatistics();
        }
    });

document
    .getElementById("back-home-btn")
    .addEventListener("click", function() {
        showScreen(homeScreen);
    });

document
    .getElementById("play-again-btn")
    .addEventListener("click", function() {
        showScreen(homeScreen);
    });

const difficultyButtons =
    document.querySelectorAll(
        ".difficulty-buttons .btn"
    );

difficultyButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const difficulty =
            button.getAttribute("data-difficulty");

        startQuiz(difficulty);
    });
});

updateStatistics();