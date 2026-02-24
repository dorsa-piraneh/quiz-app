/* ========================================================================================
                                     IMPORTS
======================================================================================== */
import { questions } from './data.js';

/* ========================================================================================
                                     DOM ELEMENTS
======================================================================================== */
const loader = document.querySelector('.loader-wrapper')
const questionNumberElem = document.querySelector('.question-number');
const totalQuestionsElem = document.querySelector('.total-questions');
const questionTitle = document.querySelector('.question-title');
const optionsContainer = document.querySelector('.options-container');
const nextBtn = document.querySelector('.next-btn');
const resultBtn = document.querySelector('.result-btn');
const resetBtn = document.querySelector('.reset-btn');

const playAgainBtns = document.querySelectorAll('.play-again-btn');

const resultModal = document.querySelector('#resultModal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const scoreValue = document.querySelector('.score-value');
const totalValue = document.querySelector('.total-value');
const correctValue = document.querySelector('.correct-value');
const wrongValue = document.querySelector('.wrong-value');

/* ========================================================================================
                                     INITIAL STATE
======================================================================================== */
const totalQuestions = questions.length;

let currentQuestionNumber = 1;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let score = null;

/* ========================================================================================
                                       FUNCTIONS
======================================================================================== */

const enableButton = (btn) => {
  btn.removeAttribute('disabled');
};

const disableButton = (btn) => {
  btn.setAttribute('disabled', 'true');
};

const showButton = (btn) => {
  btn.classList.remove('hidden');
};

const hideButton = (btn) => {
  btn.classList.add('hidden');
};

const renderQuestions = () => {
  optionsContainer.innerHTML = '';
  questionNumberElem.textContent = currentQuestionNumber.toString().padStart(2, 0);
  totalQuestionsElem.textContent = totalQuestions.toString().padStart(2, 0);

  const currentQuestion = questions[currentQuestionNumber - 1];

  questionTitle.textContent = currentQuestion.title;
  currentQuestion.options.forEach((option) => {
    optionsContainer.insertAdjacentHTML(
      'beforeend',
      `
         <article class="quiz-option">
            <label class="option-label" >
              <input type="radio" name="option" class="option-input" data-answer="${option}"/>
              <span class="checkmark"></span>
              <span class="option-text">${option}</span>
            </label>
          </article>
      `,
    );
  });
};

const checkAnswer = () => {
  const selectedAnswer = event.target.dataset.answer;
  const correctAnswer = questions[currentQuestionNumber - 1].answer;
  const quizOption = event.target.closest('.quiz-option');
  const optionInputs = Array.from(document.querySelectorAll('.option-input'));

  if (selectedAnswer === correctAnswer) {
    quizOption.classList.add('correct');
    correctAnswersCount++;
  } else {
    quizOption.classList.add('wrong');
    wrongAnswersCount++;
    optionInputs.forEach((input) => {
      if (input.dataset.answer === correctAnswer) {
        input.closest('.quiz-option').classList.add('correct');
      }
    });
  }

  if (currentQuestionNumber === totalQuestions) {
    enableButton(resultBtn);
  }

  optionInputs.map((input) => input.setAttribute('disabled', true));
  enableButton(nextBtn);
  Array.from(document.querySelectorAll('.option-label')).forEach((label) => (label.style.cursor = 'not-allowed'));
};

const calculateScore = () => {
  score = Math.round((correctAnswersCount * 100) / totalQuestions);
};

const resetQuiz = () => {
  currentQuestionNumber = 1;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  score = null;
  hideResultModal();
  renderQuestions();
  disableButton(nextBtn);
  disableButton(resultBtn);
  if (totalQuestions === 1) {
    hideButton(nextBtn);
    showButton(resultBtn);
  } else {
    showButton(nextBtn);
    hideButton(resultBtn);
  }

  hideButton(resetBtn);
};

const showResultModal = () => {
  resultModal.classList.add('show');
  scoreValue.textContent = score;
  totalValue.textContent = totalQuestions.toString().padStart(2, 0);
  correctValue.textContent = correctAnswersCount === 0 ? '0' : correctAnswersCount.toString().padStart(2, 0);
  wrongValue.textContent = wrongAnswersCount === 0 ? '0' : wrongAnswersCount.toString().padStart(2, 0);
};

const hideResultModal = () => {
  resultModal.classList.remove('show');
};

/* ========================================================================================
                                      EVENT LISTENERS
======================================================================================== */
window.addEventListener('load', () => {
  loader.classList.add('hide')
  disableButton(nextBtn);
  disableButton(resultBtn);
  renderQuestions();
  if (totalQuestions === 1) {
    hideButton(nextBtn);
    showButton(resultBtn);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestionNumber < totalQuestions) {
    currentQuestionNumber = currentQuestionNumber + 1;
    renderQuestions();
  }

  if (currentQuestionNumber == totalQuestions) {
    showButton(resultBtn);
    hideButton(nextBtn);
  }
  disableButton(nextBtn);
});

optionsContainer.addEventListener('change', (event) => {
  if (!event.target.classList.contains('option-input')) return;
  checkAnswer();
});

resultBtn.addEventListener('click', () => {
  calculateScore();
  showResultModal();
  showButton(resetBtn);
});

closeModalBtn.addEventListener('click', hideResultModal);

playAgainBtns.forEach((btn) => {
  btn.addEventListener('click', resetQuiz);
});
