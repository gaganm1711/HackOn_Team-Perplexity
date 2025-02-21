document.addEventListener("DOMContentLoaded", () => {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const nextButton = document.getElementById("next-btn");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const resultContainer = document.getElementById("result-container");

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 15;

    // Sample quiz questions
    const quizData = [
        {
            question: "Who was the first Emperor of India?",
            options: ["Ashoka", "Chandragupta Maurya", "Akbar", "Shivaji"],
            answer: "Chandragupta Maurya"
        },
        {
            question: "In which year did India gain independence?",
            options: ["1942", "1945", "1947", "1950"],
            answer: "1947"
        },
        {
            question: "What was the ancient name of Patna?",
            options: ["Takshashila", "Pataliputra", "Indraprastha", "Ayodhya"],
            answer: "Pataliputra"
        },
        {
            question: "Who wrote the Arthashastra?",
            options: ["Kalidasa", "Chanakya", "Tulsidas", "Valmiki"],
            answer: "Chanakya"
        }
    ];

    // Function to start the timer
    function startTimer() {
        timeLeft = 15;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                selectAnswer(null); // Auto-submit when time is up
            }
        }, 1000);
    }

    // Function to display the question
    function showQuestion() {
        clearInterval(timer);
        startTimer();

        let currentQuestion = quizData[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
        optionsContainer.innerHTML = "";

        currentQuestion.options.forEach(option => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option-btn");
            button.addEventListener("click", () => selectAnswer(option));
            optionsContainer.appendChild(button);
        });
    }

    // Function to handle answer selection
    function selectAnswer(selectedOption) {
        clearInterval(timer);
        let currentQuestion = quizData[currentQuestionIndex];

        if (selectedOption === currentQuestion.answer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            document.getElementById("feedback").textContent = "✅ Correct!";
        } else {
            document.getElementById("feedback").textContent = `❌ Incorrect! Answer: ${currentQuestion.answer}`;
        }

        nextButton.style.display = "block";
    }

    // Function to move to the next question
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
            nextButton.style.display = "none";
            document.getElementById("feedback").textContent = "";
        } else {
            showResults();
        }
    });

    // Function to display results
    function showResults() {
        questionContainer.textContent = "Quiz Completed!";
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
        timerDisplay.style.display = "none";
        resultContainer.innerHTML = `<h3>Your Final Score: ${score} / ${quizData.length}</h3>`;
    }

    // Start the first question
    showQuestion();
});
