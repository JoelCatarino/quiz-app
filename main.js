const startBtn = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerBtnsElement = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("Started");

  startBtn.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerBtnsElement.firstChild) {
    answerBtnsElement.removeChild(answerBtnsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerBtnsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startBtn.innerHTML = "Restart";
    startBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "How offer should you shower a day?",
    answers: [
      { text: "5", correct: false },
      { text: "2", correct: false },
      { text: "0", correct: false },
      { text: "3-4 a week", correct: true },
    ],
  },
  {
    question: "How offer should you wash your teeth?",
    answers: [
      { text: "3", correct: true },
      { text: "0", correct: false },
      { text: "1", correct: false },
      { text: "idk", correct: false },
    ],
  },
  {
    question: "Who is the president of BR?",
    answers: [
      { text: "Florin Pop", correct: false },
      { text: "Donald Trump", correct: false },
      { text: "Jair Messias Bossonaro", correct: true },
      { text: "none of the alternatives", correct: false },
    ],
  },
  {
    question: "Coffee or tea?",
    answers: [
      { text: "tea", correct: false },
      { text: "coffee", correct: false },
      { text: "coffee and tea", correct: false },
      { text: "Brahhh", correct: true },
    ],
  },
];
