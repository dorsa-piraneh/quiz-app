/* ========================================================================================
                                     IMPORTS
======================================================================================== */
import { questions } from './data.js';

/* ========================================================================================
                                     DOM ELEMENTS
======================================================================================== */
const questionNumberElem = document.querySelector('.question-number');
const questionsCountElem = document.querySelector('.total-questions');
const questionTitle = document.querySelector('.question-title');
const optionsContainer = document.querySelector('.options-container');
const nextBtn = document.querySelector('.next-btn');
const submitBtn = document.querySelector('.submit-btn');

/* ========================================================================================
                                     INITIAL STATE
======================================================================================== */
nextBtn.setAttribute('disabled', 'true');

const questionsCount = questions.length;
let currentQuestionNumber = 1;
let score = null;

/* ========================================================================================
                                       FUNCTIONS
======================================================================================== */

const renderQuestions = () => {
  optionsContainer.innerHTML = '';
  questionNumberElem.textContent = currentQuestionNumber.toString().padStart(2, 0);
  questionsCountElem.textContent = questionsCount.toString().padStart(2, 0);

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

// const checkAnswer = () => {
//    console.log('jjj')
// }

/* ========================================================================================
                                      EVENT LISTENERS
======================================================================================== */
window.addEventListener('load', () => {
  renderQuestions();
});

nextBtn.addEventListener('click', () => {
  if (currentQuestionNumber < questionsCount) {
    currentQuestionNumber = currentQuestionNumber + 1;
    renderQuestions();
  }

  if (currentQuestionNumber == questionsCount) {
    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
  }
  nextBtn.setAttribute('disabled', 'true');
});

optionsContainer.addEventListener('change', (event) => {
  if (!event.target.classList.contains('option-input')) return;

  const selectedAnswer = event.target.dataset.answer;
  const correctAnswer = questions[currentQuestionNumber - 1].answer;
  const quizOption = event.target.closest('.quiz-option');
  const optionInputs = Array.from(document.querySelectorAll('.option-input'));

  if (selectedAnswer === correctAnswer) {
    quizOption.classList.add('correct');
    score++;
  } else {
    quizOption.classList.add('wrong');
    optionInputs.forEach((input) => {
      if (input.dataset.answer === correctAnswer) {
        input.closest('.quiz-option').classList.add('correct');
      }
    });
  }

  optionInputs.map((input) => input.setAttribute('disabled', true));
  nextBtn.removeAttribute('disabled');
  Array.from(document.querySelectorAll('.option-label')).forEach(label => label.style.cursor = 'not-allowed')
});

submitBtn.addEventListener('click' , () => {
   console.log('totalScore : ' , score)
})
