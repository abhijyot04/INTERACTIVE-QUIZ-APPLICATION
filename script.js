const questions = [
    { question: "Who won the first ICC Cricket World Cup?", options: ["India", "West Indies", "Australia", "England"], correctAnswer: 1 },
    { question: "Who has the most centuries in international cricket?", options: ["Virat Kohli", "Ricky Ponting", "Jacques Kallis", "Sachin Tendulkar"], correctAnswer: 3 },
    { question: "Which bowler has the most wickets in Test cricket?", options: ["Shane Warne", "Muttiah Muralitharan", "James Anderson", "Anil Kumble"], correctAnswer: 1 },
    { question: "Which cricketer is known as the 'God of Cricket'?", options: ["MS Dhoni", "Ricky Ponting", "Sachin Tendulkar", "Virat Kohli"], correctAnswer: 2 },
    { question: "Which country hosted the 2019 Cricket World Cup?", options: ["Australia", "India", "England", "South Africa"], correctAnswer: 2 },
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  const landingPage = document.getElementById("landing-page");
  const quizContainer = document.getElementById("quiz-container");
  const questionNumberElem = document.getElementById("question-number");
  const questionElem = document.getElementById("question");
  const optionsElem = document.getElementById("options");
  const nextBtn = document.getElementById("next-btn");
  
  document.getElementById("play-btn").addEventListener("click", () => {
    landingPage.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
  });
  
  function loadQuestion() {
    nextBtn.disabled = true;
    optionsElem.innerHTML = "";
    const currentQuestion = questions[currentQuestionIndex];
    questionNumberElem.textContent = `Question ${currentQuestionIndex + 1}`;
    questionElem.textContent = currentQuestion.question;
  
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => selectOption(index));
      optionsElem.appendChild(li);
    });
  }
  
  function selectOption(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const options = optionsElem.querySelectorAll("li");
    options.forEach((option, index) => {
      option.classList.add(index === currentQuestion.correctAnswer ? "correct" : "incorrect");
      option.style.pointerEvents = "none";
    });
    if (selectedIndex === currentQuestion.correctAnswer) score++;
    nextBtn.disabled = false;
  }
  
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      displayScorecard();
    }
  });
  
  function displayScorecard() {
    quizContainer.innerHTML = `
      <div class="scorecard">
        <h2>Quiz Completed!</h2>
        <p>Your Score: <span class="score">${score} / ${questions.length}</span></p>
        <button id="retry-btn" class="btn">Retry Quiz</button>
      </div>
    `;
  
    document.getElementById("retry-btn").addEventListener("click", () => location.reload());
  }
  
  