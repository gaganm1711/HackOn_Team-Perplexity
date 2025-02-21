// quiz.js

// Quiz object to store and manage quizzes in the GamifyHistory project
const quiz = {
    id: null, // Unique Quiz ID
    title: "", // Title of the quiz
    description: "", // Description of the quiz
    questions: [], // Array of questions for the quiz
    totalQuestions: 0, // Total number of questions
    duration: 0, // Time duration for the quiz in minutes
    passingScore: 70, // Passing score percentage (default 70%)
    attempts: 0, // Number of attempts taken by the user
    correctAnswers: 0, // Number of correct answers from the user
    score: 0, // Final score percentage
  
    // Method to initialize a quiz
    initQuiz(id, title, description, questions, duration, passingScore) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.questions = questions;
      this.totalQuestions = questions.length;
      this.duration = duration;
      this.passingScore = passingScore;
      this.attempts = 0;
      this.correctAnswers = 0;
      this.score = 0;
    },
  
    // Method to start a quiz (reset scores, etc.)
    startQuiz() {
      this.attempts += 1;
      this.correctAnswers = 0; // Reset correct answers for new attempt
      console.log(`Starting quiz: ${this.title}`);
    },
  
    // Method to submit an answer and track score
    submitAnswer(questionIndex, userAnswer) {
      const question = this.questions[questionIndex];
      if (question.correctAnswer === userAnswer) {
        this.correctAnswers += 1;
        console.log("Correct Answer!");
      } else {
        console.log("Incorrect Answer!");
      }
    },
  
    // Method to calculate and return the final score
    calculateScore() {
      this.score = (this.correctAnswers / this.totalQuestions) * 100;
      return this.score;
    },
  
    // Method to check if the user passed the quiz
    isPassed() {
      return this.score >= this.passingScore;
    },
  
    // Method to display quiz result
    displayResult(user) {
      console.log(`Quiz Result: ${this.title}`);
      console.log(`Total Questions: ${this.totalQuestions}`);
      console.log(`Correct Answers: ${this.correctAnswers}`);
      console.log(`Your Score: ${this.score}%`);
      console.log(this.isPassed() ? "You Passed!" : "You Failed!");
  
      // Adding points and rewards based on score
      if (this.isPassed()) {
        user.addRewards(50); // Award points to user for passing
        console.log("Congratulations! You earned 50 reward points.");
      }
    },
  };
  
  // Example of a question object for quizzes
  const exampleQuestion = {
    questionText: "Who was the first President of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctAnswer: "George Washington", // Correct answer
  };
  
  // Example usage:
  
  // Initialize a quiz
  const historyQuiz = Object.create(quiz);
  historyQuiz.initQuiz(
    1,
    "History of America",
    "Test your knowledge of American history.",
    [exampleQuestion], // Array of questions
    30, // Quiz duration in minutes
    70 // Passing score percentage
  );
  
  // Start the quiz
  historyQuiz.startQuiz();
  
  // Submit answers (for demonstration)
  historyQuiz.submitAnswer(0, "George Washington"); // User selects the correct answer
  historyQuiz.submitAnswer(0, "Thomas Jefferson"); // User selects an incorrect answer
  
  // Calculate final score and display result
  historyQuiz.calculateScore();
  historyQuiz.displayResult(user);
  
  console.log(historyQuiz); // Display quiz data after completion
  