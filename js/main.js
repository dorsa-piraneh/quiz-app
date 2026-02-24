/* ========================================================================================
                                     IMPORTS
======================================================================================== */
import { questions } from './data.js';

/* ========================================================================================
                                     DOM ELEMENTS
======================================================================================== */
const questionNumberElem = document.querySelector('.question-number');
const totalQuestionsElem = document.querySelector('.total-questions');
const questionTitle = document.querySelector('.question-title');
const optionsContainer = document.querySelector('.options-container');
const nextBtn = document.querySelector('.next-btn');
const submitBtn = document.querySelector('.submit-btn');
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
nextBtn.setAttribute('disabled', 'true');
submitBtn.setAttribute('disabled', 'true');

const totalQuestions = questions.length;
let currentQuestionNumber = 1;
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let score = null;

/* ========================================================================================
                                       FUNCTIONS
======================================================================================== */

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
    submitBtn.removeAttribute('disabled');
  }

  optionInputs.map((input) => input.setAttribute('disabled', true));
  nextBtn.removeAttribute('disabled');
  Array.from(document.querySelectorAll('.option-label')).forEach((label) => (label.style.cursor = 'not-allowed'));
};

const calculateScore = () => {
  score = Math.round((correctAnswersCount * 100) / totalQuestions);
};

const showResultModal = () => {
  resultModal.classList.add('show');
  scoreValue.textContent = score;
  totalValue.textContent = totalQuestions.toString().padStart(2, 0);
  correctValue.textContent = correctAnswersCount.toString().padStart(2, 0);
  wrongValue.textContent = wrongAnswersCount.toString().padStart(2, 0);
};

const hideResultModal = () => {
  resultModal.classList.remove('show');
};

/* ========================================================================================
                                      EVENT LISTENERS
======================================================================================== */
window.addEventListener('load', () => {
  renderQuestions();
  if (totalQuestions == 1) {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  }
});

nextBtn.addEventListener('click', () => {
  if (currentQuestionNumber < totalQuestions) {
    currentQuestionNumber = currentQuestionNumber + 1;
    renderQuestions();
  }

  if (currentQuestionNumber == totalQuestions) {
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  }
  nextBtn.setAttribute('disabled', 'true');
});

optionsContainer.addEventListener('change', (event) => {
  if (!event.target.classList.contains('option-input')) return;
  checkAnswer();
});

submitBtn.addEventListener('click', () => {
  calculateScore();
  showResultModal();
  resetBtn.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', hideResultModal);

playAgainBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentQuestionNumber = 1;
    correctAnswersCount = 0;
    wrongAnswersCount = 0;
    score = null;
    hideResultModal();
    renderQuestions();

    nextBtn.setAttribute('disabled', 'true');
    submitBtn.setAttribute('disabled', 'true');

    if (totalQuestions == 1) {
      nextBtn.classList.add('hidden');
      submitBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
      submitBtn.classList.add('hidden');
    }

    resetBtn.classList.add('hidden');
  });
});
