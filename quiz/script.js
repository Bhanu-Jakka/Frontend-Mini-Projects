const questions = [
    {
        type: "single",
        question: "Which language is used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: "HTML"
    },

    {
        type: "single",
        question: "Which language is mainly used for styling web pages?",
        options: ["HTML", "CSS", "Java", "C++"],
        answer: "CSS"
    },

    {
        type: "multiple",
        question: "Which of the following are programming languages?",
        options: ["JavaScript", "Python", "HTML", "Java"],
        answer: ["JavaScript", "Python", "Java"]
    },

    {
        type: "fill",
        question: "Which keyword is used to declare a variable that cannot be reassigned in JavaScript?",
        answer: "const"
    },

    {
        type: "single",
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<p>", "<a>", "<img>", "<link>"],
        answer: "<a>"
    },

    {
        type: "multiple",
        question: "Which are JavaScript data types?",
        options: ["String", "Number", "Boolean", "Table"],
        answer: ["String", "Number", "Boolean"]
    },

    {
        type: "single",
        question: "Which method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "getElement()",
            "selectById()",
            "queryClass()"
        ],
        answer: "getElementById()"
    },

    {
        type: "fill",
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answer: "//"
    }
];


let currentQuestion = 0;

let score = 0;

let selectedAnswers = [];

let answerChecked = false;


const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextBtn");

const progressElement =
    document.getElementById("progress");

const resultElement =
    document.getElementById("result");

const quizBox =
    document.querySelector(".quiz-box");

const scoreElement =
    document.getElementById("score");

const restartButton =
    document.getElementById("restartBtn");


function loadQuestion() {

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    optionsElement.innerHTML = "";

    feedbackElement.textContent = "";

    feedbackElement.className = "";

    selectedAnswers = [];

    answerChecked = false;

    nextButton.disabled = false;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish"
            : "Next";


    if (current.type === "fill") {

        const input = document.createElement("input");

        input.type = "text";

        input.placeholder = "Type your answer";

        input.id = "answerInput";

        optionsElement.appendChild(input);

        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {
                checkAnswer();
            }

        });

        return;
    }


    current.options.forEach(function(option) {

        const button = document.createElement("button");

        button.textContent = option;

        button.className = "option";

        button.addEventListener("click", function() {

            if (answerChecked) {
                return;
            }


            if (current.type === "single") {

                document
                    .querySelectorAll(".option")
                    .forEach(function(item) {

                        item.classList.remove("selected");

                    });

                button.classList.add("selected");

                selectedAnswers = [option];

            }


            else {

                button.classList.toggle("selected");


                if (selectedAnswers.includes(option)) {

                    selectedAnswers =
                        selectedAnswers.filter(
                            item => item !== option
                        );

                }

                else {

                    selectedAnswers.push(option);

                }

            }

        });


        optionsElement.appendChild(button);

    });

}


function checkAnswer() {

    if (answerChecked) {
        return;
    }


    const current = questions[currentQuestion];


    if (current.type === "fill") {

        const input =
            document.getElementById("answerInput");

        const userAnswer =
            input.value.trim().toLowerCase();


        if (userAnswer === "") {

            feedbackElement.textContent =
                "Please enter an answer.";

            feedbackElement.className =
                "wrong-text";

            return;

        }


        answerChecked = true;

        input.disabled = true;


        if (userAnswer === current.answer.toLowerCase()) {

            score++;

            feedbackElement.textContent =
                "Correct!";

            feedbackElement.className =
                "correct-text";

        }

        else {

            feedbackElement.textContent =
                `Wrong! Correct answer: ${current.answer}`;

            feedbackElement.className =
                "wrong-text";

        }


        nextButton.disabled = false;

        return;
    }


    if (selectedAnswers.length === 0) {

        feedbackElement.textContent =
            "Please select an answer.";

        feedbackElement.className =
            "wrong-text";

        return;
    }


    answerChecked = true;


    const correctAnswers =
        Array.isArray(current.answer)
            ? current.answer
            : [current.answer];


    const optionButtons =
        document.querySelectorAll(".option");


    optionButtons.forEach(function(button) {

        const option = button.textContent;


        if (correctAnswers.includes(option)) {

            button.classList.remove("selected");

            button.classList.add("correct");

        }


        else if (selectedAnswers.includes(option)) {

            button.classList.remove("selected");

            button.classList.add("wrong");

        }


        button.disabled = true;

    });


    const isCorrect =
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every(function(answer) {

            return correctAnswers.includes(answer);

        });


    if (isCorrect) {

        score++;

        feedbackElement.textContent =
            "Correct!";

        feedbackElement.className =
            "correct-text";

    }

    else {

        feedbackElement.textContent =
            `Wrong! Correct answer${correctAnswers.length > 1 ? "s are" : " is"}: ${correctAnswers.join(", ")}`;

        feedbackElement.className =
            "wrong-text";

    }

}


nextButton.addEventListener("click", function() {

    if (!answerChecked) {

        checkAnswer();

        return;

    }


    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    }

    else {

        showResult();

    }

});


function showResult() {

    quizBox.style.display = "none";

    resultElement.style.display = "block";


    scoreElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

}


restartButton.addEventListener("click", function() {

    currentQuestion = 0;

    score = 0;

    selectedAnswers = [];

    answerChecked = false;


    resultElement.style.display = "none";

    quizBox.style.display = "block";


    loadQuestion();

});


loadQuestion();